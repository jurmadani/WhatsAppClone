import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ISaveEditedContactButton } from "../../types/ContactDetailsScreenComponentTypes/ContactDetailsScreenTypes";
import { useDispatch, useSelector } from "react-redux";
import { userSliceType } from "../../types/redux/sliceTypes";
import { firebase } from "../../../backend/firebase";
import { userSlice } from "../../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

const SaveEditedContactButton = ({
  contactCanBeEdited,
  phoneNumber,
  country,
  countryCode,
  firstName,
  lastName,
  contactUniqueId,
}: ISaveEditedContactButton) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const [loading, setLoading] = useState(false);
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const handleOnPress = async () => {
    setLoading(true);

    if (phoneNumber === user.phoneNumber && country === user.country) {
      Alert.alert("Can't add yourself as a contact");
    } else {
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
            ) &&
            documents[0].phoneNumber != phoneNumber
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
              //find the contact in firestore and update it's firstName and lastName
              let reduxContact = user.contacts.find(
                (contact) => contact.uniqueId === contactUniqueId
              );
              //rest of the contacts
              const restOfTheContacts = user.contacts.filter(
                (contact) => contact.uniqueId !== contactUniqueId
              );
              if (
                (reduxContact?.firstName != firstName ||
                  reduxContact.lastName != lastName) &&
                reduxContact != undefined
              ) {
                reduxContact.firstName = firstName;
                reduxContact.lastName = lastName;
                const newContactsArray = [...restOfTheContacts, reduxContact];
                //update firestore
                await firebase
                  .firestore()
                  .collection("Users")
                  .doc(user.uniqueId)
                  .update({
                    contacts: newContactsArray,
                  })
                  .then(() => {
                    //dispatch to redux new contacts array to update user global state
                    dispatch(
                      userSlice.actions.updateUserGlobalStateContactsArray({
                        contacts: newContactsArray,
                      })
                    );
                    //go back
                    navigation.goBack();
                  });
              }
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
  };

  return (
    <TouchableOpacity
      disabled={contactCanBeEdited ? false : true}
      onPress={async () =>
        handleOnPress().then(() => {
          setLoading(false);
        })
      }
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: contactCanBeEdited ? "#3396FD" : "#C3C3C3",
            },
          ]}
        >
          Save
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default SaveEditedContactButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "600",
  },
});
