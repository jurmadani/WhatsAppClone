import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SearchBar } from "@rneui/base";
import { Divider } from "@ui-kitten/components";
import { initialStateToastNotificationSlice, userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import YouContactCard from "../components/ContactsScreenComponents/YouContactCard";
import { ContactArrayItem } from "../types/NewConversationModalScreenTypes/ContactsArrayType";
import { firebase } from "../../backend/firebase";
import Contact from "../components/ContactsScreenComponents/Contact";
import ToastNotification from "../controllers/ToastNotification";
import { useToast } from "react-native-toast-notifications";
import { useRoute } from "@react-navigation/native";

const ContactsScreen = ({ navigation }: any) => {
  const isFirstRender = useRef(true);
  const toast = useToast();
  const route = useRoute();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [contactsArray, setContactsArray] = useState<ContactArrayItem[]>([]);
  const scrollViewRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };
  const toastNotification: initialStateToastNotificationSlice = useSelector(
    (state: any) => state.toastNotification
  );

  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
  }, [offsetY]);

  useEffect(() => {
    // Skip execution on component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (
      toastNotification.displayNotification === true &&
      route.name !== "ChatScreen" &&
      route.name === "Chats"
    ) {
      toast.show(toastNotification.message, {
        type: toastNotification.type,
        placement: toastNotification.placement,
        duration: 2500,
      });
    }
  }, [toastNotification.displayNotification]);

  useEffect(() => {
    setContactsArray([]);
    setLoading(true);

    const fetchContacts = async () => {
      try {
        const contactsData = [];

        for (const contact of user?.contacts) {
          const snapshot = await firebase
            .firestore()
            .collection("Users")
            .where("uniqueId", "==", contact.uniqueId)
            .get();

          const documents = snapshot.docs.map((doc) => doc.data());

          if (documents.length !== 0) {
            const chatRoomsThatUserCurrentlyLoggedInIsIn = await firebase
              .firestore()
              .collection("ChatRooms")
              .where("users", "array-contains", user?.uniqueId)
              .get();
            const chatRoomsDocuments =
              chatRoomsThatUserCurrentlyLoggedInIsIn.docs.map((doc) =>
                doc.data()
              );

            let found = false;
            chatRoomsDocuments.map((document) => {
              if (document.users.includes(contact.uniqueId)) {
                const newContactObject = {
                  firstName: contact.firstName,
                  lastName: contact.lastName,
                  uniqueId: contact.uniqueId,
                  imageURL: documents[0].imageURL,
                  info: documents[0].info,
                  chatRoomId: document.chatRoomId,
                };
                contactsData.push(newContactObject);
                found = true;
              }
            });
            if (!found) {
              const newContactObject = {
                firstName: contact.firstName,
                lastName: contact.lastName,
                uniqueId: contact.uniqueId,
                imageURL: documents[0].imageURL,
                info: documents[0].info,
                chatRoomId: "",
              };
              contactsData.push(newContactObject);
            }
          }
        }
        const sortedContactsArray = contactsData.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );

        setContactsArray(sortedContactsArray);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchContacts().then(() => console.log("Done fetching contacts"));
  }, [user?.contacts]);

  return (
    <ScrollView
      style={styles.screenContainer}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={24}
    >
      {/* Header title */}
      <Text style={styles.headerStyle}>Contacts</Text>
      <SearchBar
        //@ts-ignore
        platform={Platform.OS === "ios" ? "ios" : "android"}
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
        inputContainerStyle={[
          styles.inputContainerStyle,
          {
            height: Platform.OS === "ios" ? 10 : 40,
          },
        ]}
        containerStyle={styles.containerStyle}
        placeholder={"Search"}
        showCancel={false}
      />

      {searchInput === "" && (
        <View>
          {/* Your contact card */}
          <Text style={styles.text}>You</Text>
          <Divider style={styles.divider} />
          <YouContactCard
            fullName={user.fullName}
            imageURL={user.imageURL}
            info={user.info}
          />
        </View>
      )}

      {/* Other contacts */}
      <Text style={styles.text}>Whatsapp contacts</Text>
      <Divider style={styles.divider} />
      {user.contacts.length === 0 ? (
        <Text style={styles.noContancts}>No contacts</Text>
      ) : loading ? (
        <View>
          <ActivityIndicator style={styles.noContancts} />
          <Text style={styles.loading}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={contactsArray}
          scrollEnabled={false}
          //@ts-ignore
          renderItem={({ index, item }) => {
            if (searchInput === "") {
              let letterChanged = false;
              if (index >= 1)
                if (
                  item.lastName[0].toLowerCase() !=
                  contactsArray[index - 1].lastName[0].toLowerCase()
                )
                  letterChanged = true;

              return (
                <Contact
                  index={index}
                  item={item}
                  didLetterChange={letterChanged}
                />
              );
            } else if (
              item.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
              item.firstName.toLowerCase().includes(searchInput.toLowerCase())
            ) {
              let letterChanged = false;
              if (index >= 1)
                if (
                  item.lastName[0].toLowerCase() !=
                  contactsArray[index - 1].lastName[0].toLowerCase()
                )
                  letterChanged = true;

              return (
                <Contact
                  index={index}
                  item={item}
                  didLetterChange={letterChanged}
                />
              );
            }
          }}
        />
      )}
    </ScrollView>
  );
};

export default ContactsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  headerStyle: {
    fontWeight: "bold",
    fontSize: 35,
    paddingLeft: 20,
    paddingTop: 20,
  },
  text: {
    paddingLeft: 20,
    paddingTop: 20,
    opacity: 0.4,
    fontSize: 16,
    fontWeight: "600",
  },
  inputContainerStyle: {
    backgroundColor: "whitesmoke",
  },
  containerStyle: {
    paddingLeft: 10,
    marginTop: 10,
    paddingRight: 10,
  },
  divider: {
    marginLeft: 20,
    top: 5,
  },
  noContancts: {
    top: 100,
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.5,
  },
  loading: {
    top: 105,
    alignSelf: "center",
  },
});
