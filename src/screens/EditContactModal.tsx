import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Divider } from "@ui-kitten/components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import { useDispatch, useSelector } from "react-redux";
import { userSliceType } from "../types/redux/sliceTypes";
import { firebase } from "../../backend/firebase";
import { userSlice } from "../redux/userSlice";
import DeletingContactModal from "../components/EditContactModalComponents/DeletingContactModal";

const EditContactModal = ({ navigation, route }: any) => {
  const [modalLoading, setModalLoading] = useState(false);
  const dispatch = useDispatch();
  const navigationHook =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const [firstName, setFirstName] = useState(route?.params?.contact?.firstName);
  const [lastName, setLastName] = useState(route?.params?.contact?.lastName);
  const [country, setCountry] = useState(route?.params?.contact?.country);
  const [countryCode, setCountryCode] = useState(
    route?.params?.contact?.countryCode
  );
  const [phoneNumber, setPhoneNumber] = useState(
    route?.params?.contact?.phoneNumber
  );
  const scrollViewRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };

  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
    if (
      phoneNumber != route?.params?.contact?.phoneNumber ||
      country != route?.params?.contact?.country ||
      countryCode != route?.params?.contact?.countryCode ||
      firstName != route?.params?.contact?.firstName ||
      lastName != route?.params?.contact?.lastName
    ) {
      navigation.setParams({
        contactCanBeEdited: true,
        phoneNumber,
        country,
        countryCode,
        firstName,
        lastName,
        contactUniqueId: route?.params?.contact?.otherUserUniqueId,
      });
    } else navigation.setParams({ contactCanBeEdited: false });
  }, [offsetY, firstName, lastName, phoneNumber, country, countryCode]);

  useEffect(() => {
    const newContactInformation = user?.contacts?.filter(
      (contact) =>
        contact.uniqueId === route?.params?.contact?.otherUserUniqueId
    );
    if (newContactInformation != undefined) {
      setFirstName(newContactInformation[0]?.firstName);
      setLastName(newContactInformation[0]?.lastName);
    }
  }, [user?.contacts]);

  const handleDeleteContact = async () => {
    const alertTitle =
      "Are you sure you want to delete " + firstName + " " + lastName;

    // Set loading state to true before displaying the alert

    Alert.alert(alertTitle, "", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          setModalLoading(true);

  

          // Update from Firestore
          const newContactsArray = user.contacts.filter(
            (object) =>
              object.uniqueId !== route?.params?.contact.otherUserUniqueId
          );

          try {
            // Update user contacts array
            await firebase
              .firestore()
              .collection("Users")
              .doc(user.uniqueId)
              .update({
                contacts: newContactsArray,
              });

            // Delete chatroom with the contact
            const querySnapshot = await firebase
              .firestore()
              .collection("ChatRooms")
              .where("users", "==", [
                user.uniqueId,
                route?.params?.contact?.otherUserUniqueId,
              ])
              .get();

            const deletePromises = querySnapshot.docs.map((doc) => {
              doc.ref.delete();
            });
            await Promise.all(deletePromises);

            // Update Redux after all deletions are complete
            const newChatRoomsArray = user?.chatRooms.filter((id) =>
              querySnapshot.docs.every((doc) => doc.id !== id)
            );
            //update firestore user chatRooms array for user logged in  & other contact
            await firebase
              .firestore()
              .collection("Users")
              .doc(user?.uniqueId)
              .update({
                chatRooms: newChatRoomsArray,
              })
              .then(async () => {
                //get users chatRooms
                const snapshot = await firebase
                  .firestore()
                  .collection("Users")
                  .doc(route?.params?.contact?.otherUserUniqueId)
                  .get();
                const currentOtherUserChatRoomsArray: string[] =
                  snapshot?.data()?.chatRooms;

                const otherUserNewChatRoomsAray =
                  currentOtherUserChatRoomsArray.filter((id) =>
                    querySnapshot.docs.every((doc) => doc.id !== id)
                  );

                //update chatRooms array for the other user as well
                await firebase
                  .firestore()
                  .collection("Users")
                  .doc(route?.params?.contact?.otherUserUniqueId)
                  .update({
                    chatRooms: otherUserNewChatRoomsAray,
                  });
                // Update Redux
                console.log(newChatRoomsArray)
                dispatch(
                  userSlice.actions.updateUserGlobalStateChatRoomsArray({
                    chatRoomObject: newChatRoomsArray,
                  })
                );
                dispatch(
                  userSlice.actions.updateUserGlobalStateContactsArray({
                    contacts: newContactsArray,
                  })
                );
              });

            // Navigate to chatscreen
          } catch (error) {
            console.log(error);
          } finally {
            console.log(firstName + " " + lastName + " contact was deleted");
            setModalLoading(false);
            navigationHook.navigate("BottomTabNav");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView
      style={styles.screenContainer}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={24}
    >
      {/* Modal loading */}
      {modalLoading && <DeletingContactModal modalLoading={modalLoading} />}
      {/* First name input */}
      <View style={styles.firstNameInputView}>
        <Divider style={styles.divider} />
        <TextInput
          placeholder="First name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.textInput}
        />
        <Divider style={styles.divider2} />
      </View>
      {/* Last name input */}
      <View style={styles.lastNameInputView}>
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.textInput}
        />
        <Divider style={styles.divider} />
      </View>
      <View style={styles.phoneContainer}>
        {/* Country */}
        <TouchableOpacity
          onPress={() =>
            navigationHook.navigate("CountriesModal", {
              setCountry: setCountry,
              setCountryCode: setCountryCode,
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Country</Text>
            <Text style={styles.country}>{country}</Text>
            <AntDesign
              name="right"
              size={20}
              color={"#C9C9C9"}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <Divider />
        {/* Phone number */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.countryCode}>{countryCode}</Text>
          <TextInput
            placeholder="Phone number"
            style={styles.phoneNumber}
            keyboardType="numeric"
            maxLength={15}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
      </View>
      {/* Delete contact button */}
      <View style={styles.deleteContactView}>
        <TouchableOpacity onPress={async () => await handleDeleteContact()}>
          <Divider style={styles.divider} />
          <Text style={styles.deleteText}>Delete contact</Text>
          <Divider style={styles.divider} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditContactModal;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "whitesmoke",
    flex: 1,
  },
  deleteContactView: {
    marginTop: 30,
    backgroundColor: "white",
  },
  deleteText: {
    color: "red",
    marginLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 18,
  },
  firstNameInputView: {
    marginTop: 35,
    backgroundColor: "white",
  },
  lastNameInputView: {
    backgroundColor: "white",
  },
  divider: { backgroundColor: "#E4E4E4" },
  divider2: { backgroundColor: "#E4E4E4", marginLeft: 15 },
  textInput: {
    fontSize: 23,
    paddingLeft: 15,
    paddingTop: 9,
    paddingBottom: 9,
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    left: 20,
    paddingTop: 13,
    paddingBottom: 13,
    width: 90,
  },
  country: {
    fontSize: 17,
    paddingTop: 13,
    paddingBottom: 13,
    flex: 1,
  },
  icon: {
    paddingTop: 13,
    paddingBottom: 13,
    right: 20,
  },
  countryCode: {
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 17,
  },
  phoneNumber: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  phoneContainer: {
    backgroundColor: "white",
    marginTop: 30,
  },
});
