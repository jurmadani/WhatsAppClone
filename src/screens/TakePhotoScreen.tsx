import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";

const TakePhotoScreen = ({ navigation }: any) => {
  const navigationHook =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const [type, setType] = useState(CameraType.back);
  //@ts-expect-error
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  //component mounts
  useEffect(() => {
    navigation.setParams({ flash, setFlash });
  }, [flash]);
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} flashMode={flash}>
        {flash === 1 && (
          <View style={styles.flashView}>
            <Ionicons name={"flash"} color={"black"} size={15} />
          </View>
        )}
      </Camera>
      <View style={styles.actionView}>
        {/* Cancel button text */}
        <TouchableOpacity onPress={() => navigationHook.goBack()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        {/* Take photo  */}
        <TouchableOpacity>
          <View style={styles.takePhotoViewOuterLine}>
            <View style={styles.takePhotoViewInnerLine}></View>
          </View>
        </TouchableOpacity>

        {/* Flip camera */}
        <TouchableOpacity
          onPress={() => {
            if (type === CameraType.back) setType(CameraType.front);
            else setType(CameraType.back);
          }}
        >
          <View style={styles.flipCameraView}>
            <MaterialCommunityIcons
              name="camera-flip-outline"
              color={"white"}
              size={32}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TakePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  flashView: {
    alignSelf: "center",
    backgroundColor: "#FCDF14",
    height: 20,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    marginTop: 15,
  },
  flipCameraView: {
    backgroundColor: "#2D2B2B",
    left: 80,
    borderRadius: 99,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    width: windowWidth,
    height: windowHeight / 1.65,
  },
  cancelText: {
    color: "white",
    borderColor: "white",
    right: 80,
    fontSize: 19,
  },
  actionView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoViewOuterLine: {
    borderColor: "white",
    borderWidth: 6,
    height: 72,
    width: 72,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoViewInnerLine: {
    borderWidth: 1,
    borderRadius: 99,
    height: 57,
    width: 57,
    backgroundColor: "white",
  },
});
