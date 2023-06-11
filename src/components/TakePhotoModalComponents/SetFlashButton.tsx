import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ISetFlashButton } from "../../types/TakePhotoModalComponentTypes/SetFlashButtonType";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Camera } from "expo-camera";

const SetFlashButton = ({ flash, setFlash }: ISetFlashButton) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setFlash(
          //@ts-expect-error
          flash === Camera.Constants.FlashMode.off
            ? //@ts-ignore
              Camera.Constants.FlashMode.on
            : //@ts-ignore
              Camera.Constants.FlashMode.off
        );
      }}
    >
      <View>
        <Ionicons
          name={flash === 0 ? "flash" : "flash-off"}
          color={"white"}
          size={23}
        />
      </View>
    </TouchableOpacity>
  );
};

export default SetFlashButton;

const styles = StyleSheet.create({});
