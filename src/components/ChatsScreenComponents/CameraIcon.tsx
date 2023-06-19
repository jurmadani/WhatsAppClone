import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const CameraIcon = () => {
  return (
    /* camera icon */
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          "Feature unavailable",
          "Feel free to implement this functionality"
        )
      }
    >
      <Ionicons
        //@ts-ignore
        name={"camera-outline"}
        size={29}
        color={"#3396FD"}
        style={{ marginRight: 25 }}
      />
    </TouchableOpacity>
  );
};

export default CameraIcon;

const styles = StyleSheet.create({});
