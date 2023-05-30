import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import { Divider } from "@ui-kitten/components";
import { windowWidth } from "../../constants/Dimensions";
import dayjs from "dayjs";

const ChatListItem = ({ item }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", {
          item: item,
        })
      }
    >
      <View style={styles.container}>
        {/* User avatar */}
        <Image source={{ uri: item.user.image }} style={styles.avatar} />
        <View style={styles.userInfo}>
          {/* User username */}
          <Text style={styles.username}>{item.user.name}</Text>
          {/* Message */}
          <Text style={styles.lastMessage}>{item.lastMessage.text}</Text>
        </View>

        {/* Timestamp */}
        <Text style={styles.timestamp}>{dayjs(item.lastMessage.createdAt).format("DD.MM.YYYY")}</Text>
      </View>
      <Divider style={styles.divider} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },

  avatar: {
    height: 60,
    width: 60,
    borderRadius: 99,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  userInfo: {
    paddingLeft: 15,
    paddingTop: 5,
  },
  lastMessage: {
    opacity: 0.4,
    width: windowWidth - 130,
    paddingTop:3,
  },
  divider: {
    marginLeft: 80,
  },
  timestamp:{
    right:38,
    opacity:0.4,
    fontSize:15,
  }
});

export default ChatListItem;
