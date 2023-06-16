import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageCache from "../controllers/ImageCache";
import { windowHeight, windowWidth } from "../constants/Dimensions";

const SpecificMediaScreen = ({ route }: any) => {
  return (
    <View style={styles.container}>
      <ImageCache
        uri={route?.params?.image}
        height={windowHeight / 2}
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
