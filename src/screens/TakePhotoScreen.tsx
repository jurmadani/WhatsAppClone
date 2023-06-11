import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from "expo-camera";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import ChangingPictureModal from "../components/ProfilePictureScreenComponents/ChangingPictureModal";
import { firebase } from "../../backend/firebase";
import { userSliceType } from "../types/redux/sliceTypes";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../redux/userSlice";

const TakePhotoScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const navigationHook =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const [type, setType] = useState(CameraType.back);
  const cameraRef = useRef(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [image, setImage] = useState(null);
  //@ts-expect-error
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  //component mounts
  useEffect(() => {
    navigation.setParams({ flash, setFlash, image });
  }, [flash, image]);

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

  const usePhoto = async () => {
    setModalLoading(true);
    //update backend
    //upload picture to firebase storage

    //@ts-ignore
    const response = await fetch(image);
    const blob = await response.blob();

    var uploadTask = firebase.storage().ref().child(user.uniqueId).put(blob);

    //upload the picture to firebase
    await uploadTask;

    //getDownloadURL
    const urlRef = firebase.storage().ref().child(user.uniqueId);

    //get download url
    const url = (await urlRef.getDownloadURL()).toString();

    //update firestore
    await firebase.firestore().collection("Users").doc(user.uniqueId).update({
      imageURL: url,
    });
    //update redux global state
    dispatch(
      userSlice.actions.updateUserGlobalStateImageURL({ imageURL: url })
    );
    setModalLoading(false);
    console.log(
      "User profile picture added to firebase storage & updated firestore"
    );
    //navigate back
    navigation.navigate("EditProfile");
  };

  return (
    <View style={styles.container}>
      {modalLoading && <ChangingPictureModal modalLoading={modalLoading} />}
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          {flash === 1 && (
            <View style={styles.flashView}>
              <Ionicons name={"flash"} color={"black"} size={15} />
            </View>
          )}
        </Camera>
      ) : (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      {!image ? (
        <View style={styles.actionView}>
          {/* Cancel button text */}
          <TouchableOpacity onPress={() => navigationHook.goBack()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          {/* Take photo  */}
          <TouchableOpacity onPress={() => takePicture()}>
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
      ) : (
        <View style={styles.actionTakenPictureButtonsView}>
          {/* Repeat */}
          <TouchableOpacity onPress={() => setImage(null)}>
            <Text style={styles.repeat}>Repeat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => usePhoto()}>
            {/* Use photo */}
            <Text style={styles.usePhoto}>Use photo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default TakePhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  actionTakenPictureButtonsView: {
    backgroundColor: "#252525",
    flexDirection: "row",
    flex: 1,
    marginTop: windowHeight /4,
    justifyContent: "space-between",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  repeat: {
    color: "white",
    paddingLeft: 25,
    fontSize: 22,
    paddingTop: 15,
  },
  usePhoto: {
    color: "white",
    paddingRight: 25,
    fontSize: 22,
    paddingTop: 15,
  },
  image: {
    width: windowWidth,
    height: windowHeight / 2,
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
    height: windowHeight / 2,
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
