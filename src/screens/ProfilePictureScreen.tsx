import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useRef, createRef } from "react";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import { userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import ImageCache from "../controllers/ImageCache";
import AnimatedImageCache from "../controllers/AnimatedImageCache";

const ProfilePictureScreen = () => {
  //redux user global satte
  const user: userSliceType = useSelector(
    (state) =>
      //@ts-ignore
      state.user.user
  );
  return (
    <View style={styles.container}>
      {/* Profile picture image */}
      <AnimatedImageCache
        uri={user.imageURL}
        height={windowHeight / 2}
        width={windowWidth}
        imageType="Animated user profile picture from profile picture screen"
      />
    </View>
  );
};

export default ProfilePictureScreen;

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
