import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import { IHeaderLeftAccessory } from "../../types/ContactDetailsScreenComponentTypes/ContactDetailsScreenTypes";

const HeaderLeftAccessory = ({ contact }: IHeaderLeftAccessory) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("EditContactModal", {
            contact,
          })
        }
      >
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeftAccessory;

const styles = StyleSheet.create({
  editButton: {
    fontSize: 19,
    color: "#3396FD",
    marginLeft: 15,
  },
});
