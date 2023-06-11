import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const TakePhotoScreenForChat = ({ route }: any) => {
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const [receiver, setReceiver] = useState(null);
  const [type, setType] = useState(CameraType.back);
  //@ts-expect-error
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);
  const navigationHook =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const takePicture = async () => {
    if (cameraRef) {
      try {
        //@ts-ignore
        const options = { quality: 1, aspectRatio: "4:3" }; // Set aspect ratio to 4:3
        const data = await cameraRef?.current?.takePictureAsync(options);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const contact = user?.contacts.find(
      (contact) => contact.uniqueId === route?.params?.receiverUniqueId
    );
    if (route?.params?.image != undefined) {
      setImage(route?.params?.image);
    }
    //@ts-expect-error
    setReceiver(contact);
  }, []);

  const pickImageFromMediaLibrary = async () => {
    setImage(null);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      //@ts-expect-error
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          ref={cameraRef}
          type={type}
          flashMode={flash}
          style={styles.camera}
        >
          {/* Header buttons */}
          <View style={styles.headerButtonsView}>
            {/* Cancel */}
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => navigationHook.goBack()}
            >
              <Feather name="x" size={30} color={"white"} />
            </TouchableOpacity>
            {/* Flash */}
            <TouchableOpacity
              style={styles.flash}
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
              <Ionicons
                name={flash === 0 ? "flash" : "flash-off"}
                color={"white"}
                size={25}
              />
            </TouchableOpacity>
          </View>
          {/* Flash indicator */}
          {flash === 1 && (
            <View style={styles.flashView}>
              <Ionicons name={"flash"} color={"black"} size={15} />
            </View>
          )}
          {/* Footer buttons */}
          <View style={styles.footerButtonsView}>
            {/* Media button */}
            <TouchableOpacity onPress={() => pickImageFromMediaLibrary()}>
              <View style={styles.mediaView}>
                <Ionicons name="image" color={"white"} size={25} />
              </View>
            </TouchableOpacity>
            {/* Take photo button */}
            <TouchableOpacity onPress={() => takePicture()}>
              <View style={styles.takePhotoViewOuterLine}>
                <View style={styles.takePhotoViewInnerLine}></View>
              </View>
            </TouchableOpacity>
            {/* Flip camera button */}
            <TouchableOpacity
              onPress={() => {
                if (type === CameraType.back) setType(CameraType.front);
                else setType(CameraType.back);
              }}
            >
              <View style={styles.flipView}>
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  color={"white"}
                  size={28}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <ImageBackground source={{ uri: image }} style={styles.camera}>
          {/* Cancel */}
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => setImage(null)}
          >
            <Feather name="x" size={30} color={"white"} />
          </TouchableOpacity>
          {/* Footer view */}
          <View style={styles.footerButtonsView}>
            {/* Receiver name */}
            <View style={styles.receiverView}>
              <Text style={styles.receiver}>
                {receiver?.firstName} {receiver?.lastName}
              </Text>
            </View>
            {/* Send button */}
            <TouchableOpacity style={styles.sendView}>
              <MaterialIcons
                style={styles.send}
                name="send"
                color={"white"}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default TakePhotoScreenForChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  sendView: {
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 99,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  send: {
    padding: 7,
  },
  receiver: {
    padding: 10,
    color: "white",
    fontSize: 17,
  },
  receiverView: {
    backgroundColor: "#C7C7CC",
    borderRadius: 8,
    marginBottom: 10,
    marginLeft: 10,
  },
  flipView: {
    backgroundColor: "#2D2B2B",
    borderRadius: 99,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  takePhotoViewOuterLine: {
    borderColor: "white",
    borderWidth: 3,
    height: 75,
    width: 75,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  takePhotoViewInnerLine: {
    borderWidth: 1,
    borderRadius: 99,
    height: 66,
    width: 66,
    backgroundColor: "white",
  },
  footerButtonsView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 15,
  },
  mediaView: {
    backgroundColor: "#2D2B2B",
    borderRadius: 99,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15,
  },
  flashView: {
    alignSelf: "center",
    backgroundColor: "#FCDF14",
    height: 20,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  camera: {
    width: windowWidth,
    height: windowHeight - 160,
    marginTop: 50,
  },
  headerButtonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancel: {
    paddingLeft: 15,
    paddingTop: 15,
  },
  flash: {
    paddingRight: 15,
    paddingTop: 15,
  },
});
