import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

const NewConversationIcon = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("NewConversationModal")}
    >
      <Feather name="edit" size={22} style={styles.newConversationIcon} />
    </TouchableOpacity>
  );
};

export default NewConversationIcon;

const styles = StyleSheet.create({
  newConversationIcon: {
    color: "#3396FD",
    marginRight: 20,
  },
});
