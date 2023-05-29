import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { windowHeight, windowWidth } from "../constants/Dimensions";

const NotImplementedYetScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={require("../../assets/images/capibara.jpg")}
        style={{ height: 300, width: 300 }}
      />
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>
        Not implemented yet
      </Text>
    </View>
  );
};

export default NotImplementedYetScreen;
