import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { chatScreenStyles } from "../../styles/ChatsScreenStyles/styles";
//@ts-ignore
import Feather from "react-native-vector-icons/Feather";

const NewConversationIcon = () => (
  <TouchableOpacity>
    <Feather
      name="edit"
      size={24}
      style={chatScreenStyles.newConversationIcon}
    />
  </TouchableOpacity>
);

const EditButton = () => (
  <TouchableOpacity>
    <Text style={chatScreenStyles.editButton}>Edit</Text>
  </TouchableOpacity>
);

const ChatsScreenHeader = () => {
  return (
    <SafeAreaView style={chatScreenStyles.headerContainer}>
      {/* Button */}
      <EditButton />
      {/* Header title */}
      <Text style={chatScreenStyles.headerTitle}>Chats</Text>
      {/* Button */}
      <NewConversationIcon />
    </SafeAreaView>
  );
};

export default ChatsScreenHeader;
