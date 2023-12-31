import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Button from "../components/NewConversationModalComponents/Button";
import { Divider } from "@ui-kitten/components";
import { userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import Contact from "../components/NewConversationModalComponents/RenderItem";
import { firebase } from "../../backend/firebase";
import { ContactArrayItem } from "../types/NewConversationModalScreenTypes/ContactsArrayType";

const NewConversationModal = ({ route }: any) => {
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const [loading, setLoading] = useState(true);
  const [contactsArray, setContactsArray] = useState<ContactArrayItem[]>([]);
  useEffect(() => {
    setContactsArray([]);
    setLoading(true);

    const fetchContacts = async () => {
      try {
        const contactsData = [];
        //loop through users contacts list and get the contacts imageURL and info based on uniqueID
        for (const contact of user?.contacts) {
          const snapshot = await firebase
            .firestore()
            .collection("Users")
            .where("uniqueId", "==", contact.uniqueId)
            .get();
          const documents = snapshot.docs.map((doc) => doc.data());
          if (documents.length != 0) {
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
            //spread the contacts user redux info and add the imageURL to it
          }
        }
        setContactsArray(contactsData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts().then(() =>
      console.log("Done fetching contacts in new conversation modal screen")
    );
    setLoading(false);
  }, [user?.contacts]);

  return (
    <ScrollView style={styles.container}>
      {route?.params?.searchInput === "" && (
        <View>
          {/* new group button */}
          <Button iconName="people" buttonName="New group" />
          {/* new contact button */}
          <Button iconName="person-add" buttonName="New contact" />
          {/* Title */}
          <Text style={styles.title}>Whatsapp contacts</Text>
          <Divider style={styles.divider} />
        </View>
      )}

      {user.contacts.length === 0 ? (
        <Text style={styles.noContancts}>No contacts</Text>
      ) : loading ? (
        <View>
          <ActivityIndicator style={styles.noContancts} />
          <Text style={styles.loading}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={contactsArray.sort((a, b) =>
            a.lastName.localeCompare(b.lastName)
          )}
          scrollEnabled={false}
          //@ts-ignore
          renderItem={({ index, item }) => {
            if (route?.params?.searchInput === "")
              return <Contact index={index} item={item} />;
            else if (
              item.lastName
                .toLowerCase()
                .includes(route?.params?.searchInput.toLowerCase()) ||
              item.firstName
                .toLowerCase()
                .includes(route?.params?.searchInput.toLowerCase())
            )
              return <Contact index={index} item={item} />;
          }}
        />
      )}
    </ScrollView>
  );
};

export default NewConversationModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    paddingLeft: 20,
    opacity: 0.4,
    fontWeight: "600",
    fontSize: 16,
    paddingTop: 20,
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
