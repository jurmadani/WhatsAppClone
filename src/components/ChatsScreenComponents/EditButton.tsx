import { StyleSheet, Text, TouchableOpacity,Alert } from "react-native";
import React from "react";

const EditButton = () => {
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          "Feature unavailable",
          "Feel free to implement this functionality"
        )
      }
    >
      <Text style={styles.editButton}>Edit</Text>
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  editButton: {
    fontSize: 19,
    color: "#3396FD",
    marginLeft: 15,
  },
});
