import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { Avatar, Divider, ListItem } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { windowWidth } from "../../constants/Dimensions";
import { List } from "@ui-kitten/components";
import { data1, data2 } from "./ButtonData";
import RenderItem from "./RenderItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import { useSelector } from "react-redux";
import ImageCache from "../../controllers/ImageCache";
import { userSliceType } from "../../types/redux/sliceTypes";

const UserProfileCard = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  //redux user global satte
  const user: userSliceType = useSelector(
    (state) =>
      //@ts-ignore
      state.user.user
  );
  return (
    <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
      <View style={styles.container}>
        {/* Avatar */}
        <ImageCache
          uri={user.imageURL}
          borderRadius={99}
          height={65}
          width={65}
          imageType="User profile picture from settings screen"
        />
        <View style={styles.usernameView}>
          {/* Username */}
          <Text style={styles.username}>{user.fullName}</Text>
          {/* Status */}
          <Text style={styles.status}>{user.info}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  usernameView: {
    paddingLeft: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
  },
  status: {
    fontSize: 17,
    opacity: 0.4,
    paddingTop: 2,
  },
  divider: {
    backgroundColor: "#E4E4E4",
    marginLeft: 85,
  },
});
