import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ButtonInterface } from "../../types/NewConversationModalScreenTypes/ButtonType";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "@ui-kitten/components";
import { windowWidth } from "../../constants/Dimensions";

const Button = ({ iconName, buttonName }: ButtonInterface) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.iconView}>
          <Ionicons name={iconName} size={23} color={"#3396FD"} />
        </View>
        <View>
          <Text style={styles.buttonName}>{buttonName}</Text>
          <Divider style={styles.divider} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 19,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  iconView: {
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    overflow: "hidden",
    alignSelf: "center",
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonName: {
    paddingLeft: 12,
    color: "#3396FD",
    fontSize: 17,
    fontWeight: "500",
  },
  divider: {
    width: windowWidth - 100,
    top: 10,
    left: 12,
  },
});
