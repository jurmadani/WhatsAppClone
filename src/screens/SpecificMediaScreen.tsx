import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import AnimatedImageCache from "../controllers/AnimatedImageCache";

const SpecificMediaScreen = ({ route }: any) => {
  return (
    <View style={styles.container}>
      <AnimatedImageCache
        uri={route?.params?.image}
        height={windowHeight}
        width={windowWidth}
        imageType="specific media image"
      />
    </View>
  );
};

export default SpecificMediaScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
