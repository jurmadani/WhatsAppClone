import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SaveButtonTypes } from "../../types/AddNewContactModalComponentsTypes/SaveButtonTypes";

const SaveButton = ({ contanctCanBeSaved }: SaveButtonTypes) => {
  return (
    <TouchableOpacity disabled={contanctCanBeSaved ? false : true}>
      <Text
        style={[
          styles.text,
          { color: contanctCanBeSaved ? "#3396FD" : "#C3C3C3" },
        ]}
      >
        Save
      </Text>
    </TouchableOpacity>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,

    fontWeight: "600",
  },
});
