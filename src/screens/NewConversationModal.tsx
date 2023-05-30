import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Button from "../components/NewConversationModalComponents/Button";
import { Divider } from "@ui-kitten/components";

const NewConversationModal = () => {
  return (
    <View style={styles.container}>
      {/* new group button */}
      <Button iconName="people" buttonName="New group" />
      {/* new contact button */}
      <Button iconName="person-add" buttonName="New contact" />
      {/* Title */}
      <Text style={styles.title}>Whatsapp contacts</Text>
      <Divider style={styles.divider} />
      <Text
        style={{
          top: 100,
          alignSelf: "center",
          fontSize: 20,
          fontWeight: "bold",
          opacity: 0.5,
        }}
      >
        No contacts
      </Text>
    </View>
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
});
