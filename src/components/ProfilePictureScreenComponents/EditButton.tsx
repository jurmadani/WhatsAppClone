import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import React, { useState } from "react";
import { EditButtonType } from "../../types/ProfilePictureScreenTypes/EditButtonType";

const EditButton = () => {
  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Delete Picture", "Choose a photo", "Take a photo"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        }
      }
    );
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>Edit</Text>
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    color: "#3396FD",
    fontWeight: "500",
  },
});
