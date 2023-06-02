import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const EditButton = () => {
  return (
    <TouchableOpacity>
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
