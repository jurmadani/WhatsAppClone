import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { OkButtonType } from "../../types/EditProfileScreenComponentsTypes/OkButtonTypes";
import { firebase } from "../../../backend/firebase";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../../redux/userSlice";

const OkButton = ({ fullName }: OkButtonType) => {
  const [loading, setLoading] = useState(false);
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const dispatch = useDispatch();
  const handleOnPress = async () => {
    setLoading(true);
    //update firestore
    try {
      await firebase
        .firestore()
        .collection("Users")
        .doc(user?.uniqueId)
        .update({
          fullName: fullName,
        });
    } catch (error) {
      console.log(error);
    } finally {
      //update redux
      dispatch(
        userSlice.actions.updateUserGlobalStateFullName({ fullName: fullName })
      );
      Keyboard.dismiss();
      console.log('User full name updated in firestore')
    }
    setLoading(false);
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        await handleOnPress();
      }}
    >
      {loading ? <ActivityIndicator /> : <Text style={styles.text}>OK</Text>}
    </TouchableOpacity>
  );
};

export default OkButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    color: "#3396FD",
    fontWeight: "500",
  },
});
