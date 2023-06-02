import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { windowHeight, windowWidth } from "../constants/Dimensions";

const ProfilePictureScreen = () => {
  return (
    <View style={styles.container}>
      {/* Profile picture image */}
      <Image
        source={require("../../assets/images/capibara.jpg")}
        style={styles.image}
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
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'whitesmoke'
  }
});
