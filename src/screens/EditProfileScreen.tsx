import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { windowWidth } from "../constants/Dimensions";
import { Avatar } from "@ui-kitten/components";
import { Divider } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import ImageCache from "../controllers/ImageCache";
import { userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";

const EditProfileScreen = ({ navigation }: any) => {
  const stackNavigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const scrollViewRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };

  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
  }, [offsetY]);
  //redux user global satte
  const user: userSliceType = useSelector(
    (state) =>
      //@ts-ignore
      state.user.user
  );
  return (
    <ScrollView
      style={styles.container}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={24}
    >
      {/* User picture + Full name */}
      <View style={styles.pictureContainer}>
        <View style={styles.pictureView}>
          {/* Avatar */}
          <ImageCache
            uri={user.imageURL}
            height={65}
            width={65}
            borderRadius={99}
            imageType="User profile picture from edit profile screen"
          />
          {/* Description */}
          <Text style={styles.description}>
            Enter your name and, optionally, add a profile picture
          </Text>
        </View>
        {/* Edit button */}
        <TouchableOpacity
          onPress={() => stackNavigation.navigate("ProfilePicture")}
        >
          <Text style={styles.editButtonTitle}>Edit</Text>
        </TouchableOpacity>
        {/* Divider */}
        <Divider style={styles.divider1} />
        {/* Full name input */}
        <TextInput placeholder="Full name" style={styles.fullNameInput} />
        {/* Divider */}
        <Divider style={styles.divider2} />
      </View>
      {/* Divider: end of the picture-container*/}
      <Divider />
      {/* View title */}
      <Text style={styles.phoneNumberContainerTitle}>PHONE NUMBER</Text>
      {/* Phone number view */}
      <View style={styles.phoneNumberContainer}>
        <Divider />
        {/* Phone number */}
        <Text style={styles.phoneNumber}>+40 787 589 667</Text>
        <Divider />
      </View>

      {/* Info View title */}
      <Text style={styles.infoContainerTitle}>INFO</Text>
      {/* Info view */}
      <TouchableOpacity>
        <View style={styles.infoContainer}>
          <Divider />
          {/* Info */}
          <View style={styles.infoAndIconView}>
            <Text style={styles.info}>Busy</Text>
            <AntDesign
              name="right"
              size={18}
              color={"#C9C9C9"}
              style={styles.icon}
            />
          </View>
          <Divider />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  pictureContainer: {
    width: windowWidth,
    height: 200,
    backgroundColor: "white",
  },
  pictureView: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 20,
  },
  avatar: {
    height: 65,
    width: 65,
  },
  editButtonTitle: {
    color: "#3396FD",
    fontSize: 18,
    paddingTop: 9,
    paddingLeft: 36.5,
  },
  description: {
    opacity: 0.4,
    width: windowWidth - 100,
    paddingLeft: 15,
  },
  divider1: {
    marginTop: 15,
    marginLeft: 20,
  },
  divider2: {
    marginLeft: 20,
  },
  fullNameInput: {
    height: 40,
    marginLeft: 20,
    fontSize: 17,
  },
  phoneNumberContainer: {
    backgroundColor: "white",
  },
  phoneNumber: {
    paddingLeft: 20,
    fontSize: 18,
    paddingTop: 13,
    paddingBottom: 13,
  },
  phoneNumberContainerTitle: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    opacity: 0.4,
  },
  infoContainer: {
    backgroundColor: "white",
  },
  info: {
    paddingLeft: 20,
    fontSize: 18,
    paddingTop: 13,
    paddingBottom: 13,
  },
  infoContainerTitle: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    opacity: 0.4,
  },
  infoAndIconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    paddingRight: 15,
  },
});
