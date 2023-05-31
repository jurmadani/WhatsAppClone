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

const UserProfileCard = () => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        {/* Avatar */}
        <Avatar
          source={require("../../../assets/images/capibara.jpg")}
          style={{ height: 65, width: 65 }}
        />
        <View style={styles.usernameView}>
          {/* Username */}
          <Text style={styles.username}>Capibara</Text>
          {/* Status */}
          <Text style={styles.status}>Busy</Text>
        </View>
        {/* Icon */}
        <Ionicons
          name="qr-code-outline"
          size={25}
          color="#3396FD"
          style={styles.icon}
        />
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
  icon: {
    marginLeft: windowWidth - 210,
  },
  divider: {
    backgroundColor: "#E4E4E4",
    marginLeft: 85,
  },
  list:{
    marginTop:20,
  }
});
