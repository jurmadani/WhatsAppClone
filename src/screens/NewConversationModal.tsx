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

const NewConversationModal = () => {
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const [loading, setLoading] = useState(true);
  console.log(loading);
  const [contactsArray, setContactsArray] = useState<ContactArrayItem[]>([]);
  useEffect(() => {
    setContactsArray([]);
    setLoading(true);
    try {
      //loop through users contacts list and get the contacts imageURL and info based on uniqueID
      user?.contacts.forEach(async (contact) => {
        const snapshot = await firebase
          .firestore()
          .collection("Users")
          .where("uniqueId", "==", contact.uniqueId)
          .get();
        const documents = snapshot.docs.map((doc) => doc.data());
        if (documents.length != 0) {
          //spread the contacts user redux info and add the imageURL to it
          const newContactObject = {
            firstName: contact.firstName,
            lastName: contact.lastName,
            uniqueId: contact.uniqueId,
            imageURL: documents[0].imageURL,
            info: documents[0].info,
          };
          setContactsArray((prevContacts) => [
            ...prevContacts,
            newContactObject,
          ]);
        }
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [user?.contacts]);

  return (
    <ScrollView style={styles.container}>
      {/* new group button */}
      <Button iconName="people" buttonName="New group" />
      {/* new contact button */}
      <Button iconName="person-add" buttonName="New contact" />
      {/* Title */}
      <Text style={styles.title}>Whatsapp contacts</Text>
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
          renderItem={({ index, item }) => (
            <Contact index={index} item={item} />
          )}
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
