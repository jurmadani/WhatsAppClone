import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { messages } from "../../dummy-test-data/messages";
import Message from "../components/ChatScreenComponents/Message";
import InputBox from "../components/ChatScreenComponents/InputBox";

const ChatScreen = ({ route }: any) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={{flex:1,}}
    >
      <ImageBackground
        source={require("../../assets/images/BG.png")}
        style={styles.container}
      >
        <FlatList
          data={messages}
          renderItem={({ item }) => <Message item={item} />}
          inverted
          style={styles.list}
        />
        <InputBox />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  list: {
    padding: 8,
  },
});
