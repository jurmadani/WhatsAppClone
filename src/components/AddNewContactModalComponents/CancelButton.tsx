import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

const CancelButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.text}>Cancel</Text>
    </TouchableOpacity>
  );
};

export default CancelButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: "#3396FD",
  },
});
