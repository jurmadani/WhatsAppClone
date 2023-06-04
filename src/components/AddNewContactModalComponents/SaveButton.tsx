import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SaveButtonTypes } from "../../types/AddNewContactModalComponentsTypes/SaveButtonTypes";
import { firebase } from "../../../backend/firebase";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

const SaveButton = ({
  contanctCanBeSaved,
  firstName,
  lastName,
  country,
  countryCode,
  phoneNumber,
}: SaveButtonTypes) => {
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleOnPress = async () => {
    if (
      firstName != undefined &&
      lastName != undefined &&
      country != undefined &&
      countryCode != undefined &&
      phoneNumber != undefined
    ) {
      //check if user wants to add himself
      if (phoneNumber === user.phoneNumber && country === user.country) {
        Alert.alert("Can't add yourself as a contact");
      } else {
        //search if the contact that you want to add is using whatsapp(query db for phonenumber, because it unique)
        setLoading(true);
        try {
          const snapshot = await firebase
            .firestore()
            .collection("Users")
            .where("phoneNumber", "==", phoneNumber)
            .where("countryCode", "==", countryCode)
            .get();
          const documents = snapshot.docs.map((doc) => doc.data());
          if (documents.length === 0) {
            Alert.alert(
              "The contact you are trying to add it's not using Whatsapp"
            );
          } else if (documents.length === 1) {
            //check if you already have this contact
            const uniqueIdArrayPulledFromUserContactsArray = user.contacts.map(
              (object) => object.uniqueId
            );
            if (
              uniqueIdArrayPulledFromUserContactsArray.includes(
                documents[0].uniqueId
              )
            ) {
              Alert.alert(
                "You already " +
                  countryCode +
                  phoneNumber +
                  " in your contacts list"
              );
            } else {
              //update firestore
              //query for the user information in firestore that the user want's to add as a contact
              try {
                await firebase
                  .firestore()
                  .collection("Users")
                  .doc(user.uniqueId)
                  .update({
                    contacts: [
                      ...user.contacts,
                      {
                        uniqueId: documents[0].uniqueId,
                        lastName: lastName,
                        firstName: firstName,
                      },
                    ],
                  })
                  .then(() => {
                    console.log("User contacts array updated in firestore");
                    //update redux
                    dispatch(
                      userSlice.actions.updateUserGlobalStateContactsArray({
                        contacts: [
                          ...user.contacts,
                          {
                            uniqueId: documents[0].uniqueId,
                            lastName: lastName,
                            firstName: firstName,
                          },
                        ],
                      })
                    );
                    //alert the user that contact was added successfully
                    Alert.alert("Contact added with success", "", [
                      {
                        text: "Ok",
                        onPress: () => navigation.goBack(),
                      },
                    ]);
                  });
              } catch (error) {
                console.log(error);
              }
            }
          } else {
            console.log(
              "Found multiple users with " + phoneNumber + " in firestore"
            );
          }
        } catch (error) {
          console.log("Error searching for phone number:", error);
        }
      }
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      disabled={contanctCanBeSaved ? false : true}
      onPress={async () => await handleOnPress()}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            styles.text,
            { color: contanctCanBeSaved ? "#3396FD" : "#C3C3C3" },
          ]}
        >
          Save
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,

    fontWeight: "600",
  },
});
