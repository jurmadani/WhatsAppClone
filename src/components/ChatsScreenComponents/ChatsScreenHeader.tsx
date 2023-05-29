import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
//@ts-ignore
import Feather from "react-native-vector-icons/Feather";

export const NewConversationIcon = () => (
  <TouchableOpacity>
    <Feather name="edit" size={22} style={styles.newConversationIcon} />
  </TouchableOpacity>
);

export const EditButton = () => (
  <TouchableOpacity>
    <Text style={styles.editButton}>Edit</Text>
  </TouchableOpacity>
);

const ChatsScreenHeader = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      {/* Button */}
      <EditButton />
      {/* Header title */}
      <Text style={styles.headerTitle}>Chats</Text>
      {/* Button */}
      <NewConversationIcon />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "whitesmoke",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginRight: 15,
    marginLeft: 15,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 17,
  },
  newConversationIcon: {
    color: "#3396FD",
    marginRight: 20,
  },
  editButton: {
    fontSize: 19,
    color: "#3396FD",
    marginLeft: 15,
  },
});

export default ChatsScreenHeader;
