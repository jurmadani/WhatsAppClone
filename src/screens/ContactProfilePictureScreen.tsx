import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { IContactProfilePictureScreen } from "../types/ContactDetailsScreenComponentTypes/ContactDetailsScreenTypes";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import AnimatedImageCache from "../controllers/AnimatedImageCache";

const ContactProfilePictureScreen = ({ route }: any) => {
  return (
    <View style={styles.container}>
      {/* Profile picture image */}
      <AnimatedImageCache
        uri={route?.params?.contactImageURL}
        height={windowHeight / 2}
        width={windowWidth}
        imageType="Animated contact profile picture from contact profile picture screen"
      />
    </View>
  );
};

export default ContactProfilePictureScreen;

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight / 2,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "whitesmoke",
  },
});
