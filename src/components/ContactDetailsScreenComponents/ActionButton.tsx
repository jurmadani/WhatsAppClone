import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { IActionButton } from "../../types/ContactDetailsScreenComponentTypes/ContactDetailsScreenTypes";
import Ionicons from "react-native-vector-icons/Ionicons";

const ActionButton = ({ title, icon }: IActionButton) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        {/* Icon */}
        <Ionicons name={icon} color="#3396FD" size={25} />
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 32,
    paddingLeft: 32,
    borderRadius: 10,
  },
  title: {
    color: "#3396FD",
    fontSize: 11,
    paddingTop: 3,
  },
});
