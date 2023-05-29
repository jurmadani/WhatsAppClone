import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

const ChatListItem = ({ item }: any) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ChatScreen")}>
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
      </View>
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
  },
  userInfo: {
    paddingLeft: 10,
    paddingTop: 5,
  },
  lastMessage: {
    opacity: 0.4,
  },
});

export default ChatListItem;
