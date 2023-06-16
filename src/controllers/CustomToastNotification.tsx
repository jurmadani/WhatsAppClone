import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { windowWidth } from "../constants/Dimensions";
import {
  ICustomToastNotification,
  initialStateToastNotificationSlice,
} from "../types/redux/sliceTypes";
import ImageCache from "./ImageCache";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import { toastNotificationSlice } from "../redux/toastNotificationSlice";
const CustomToastNotification = ({ toast }: ICustomToastNotification) => {
  const toastNotificationReduxState: initialStateToastNotificationSlice =
    useSelector((state: any) => state.toastNotification);
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatScreen", {
          firstName: toastNotificationReduxState.contactFirstName,
          lastName: toastNotificationReduxState.contactLastName,
          otherUserUniqueId: toastNotificationReduxState.contactUniqueId,
          imageURL: toastNotificationReduxState.contactImageURL,
          chatRoomId: toastNotificationReduxState.chatRoomId,
        });
      }}
    >
      <View style={styles.container}>
        {/* contact image */}
        <ImageCache
          uri={toastNotificationReduxState.contactImageURL}
          height={50}
          width={50}
          borderRadius={99}
          imageType="contact image from toast notification"
        />

        <View>
          {/* Contact name */}
          <Text style={styles.contactName}>
            {toastNotificationReduxState.contactFirstName}{" "}
            {toastNotificationReduxState.contactLastName}
          </Text>
          {/* Message */}
          <Text style={styles.message}>
            {toastNotificationReduxState.message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomToastNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    height: 80,
    width: windowWidth - 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    marginBottom: 5,
  },
  message: {
    color: "white",
    paddingLeft: 10,
    paddingTop: 2,
  },
  contactName: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    paddingLeft: 10,
  },
});
