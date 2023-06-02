import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React from "react";

const CloseKeyboardButton = () => {
  return (
    <TouchableOpacity onPress={() => Keyboard.dismiss()}>
      <Text style={styles.text}>Cancel</Text>
    </TouchableOpacity>
  );
};

export default CloseKeyboardButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: "#3396FD",
  },
});
