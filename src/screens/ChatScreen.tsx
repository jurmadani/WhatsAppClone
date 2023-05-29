import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import React from "react";
import { messages } from "../../dummy-test-data/messages";
import Message from "../components/ChatScreenComponents/Message";

const ChatScreen = ({ route }: any) => {
  return (
    <ImageBackground
      source={require("../../assets/images/BG.png")}
      style={styles.container}
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message item={item} />}
      />
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
