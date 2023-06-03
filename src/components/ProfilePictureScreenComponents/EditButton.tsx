import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActionSheetIOS,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";
import { EditButtonType } from "../../types/ProfilePictureScreenTypes/EditButtonType";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import ChangingPictureModal from "./ChangingPictureModal";
import { firebase } from "../../../backend/firebase";
import { userSliceType } from "../../types/redux/sliceTypes";

const EditButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const dispatch = useDispatch();
  const [modalLoading, setModalLoading] = useState(false);
  const AddNewProfilePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setModalLoading(true);
      //setImage(result.assets[0].uri);
      //update backend
      //upload picture to firebase storage

      //@ts-ignore
      const response = await fetch(result.assets[0].uri);
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
      console.log('User profile picture added to firebase storage & updated firestore')
      //navigate back
      navigation.goBack();
    }
  };

  const onPress = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Delete Picture", "Choose a photo", "Take a photo"],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
        } else if (buttonIndex === 2) {
          await AddNewProfilePhoto();
        }
      }
    );
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>Edit</Text>
      {modalLoading && <ChangingPictureModal modalLoading={modalLoading} />}
    </TouchableOpacity>
  );
};

export default EditButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    color: "#3396FD",
    fontWeight: "500",
  },
});
