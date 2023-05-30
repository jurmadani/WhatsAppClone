import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const EditButton = () => {
  return (
    <TouchableOpacity>
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
