import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const OkButton = () => {
  return (
    <TouchableOpacity>
      <Text style={styles.text}>OK</Text>
    </TouchableOpacity>
  );
};

export default OkButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    color: "#3396FD",
    fontWeight: "500",
  },
});
