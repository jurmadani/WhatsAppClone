import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import { MessageType } from "../../types/ChatScreenComponentTypes/MessageType";

const Message = ({ item, index }: MessageType) => {
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const isMyMessage = () => {
    return item.senderUniqueId === user.uniqueId;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? "#DCF7C5" : "white",
          alignSelf: isMyMessage() ? "flex-end" : "flex-start",
        },
      ]}
    >
      {/* Messages */}
      <Text style={styles.message}>{item.text}</Text>
      {/* Timestamp and tick status */}
      <View style={styles.timestampView}>
        <Text style={styles.time}>
          {new Date(item.createdAt.toDate()).toLocaleTimeString().slice(0, 5)}
        </Text>
        {isMyMessage() &&  (
          <Image
            source={require("../../../assets/icons/doubleTick.png")}
            style={styles.icon}
          />
        )}
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",

    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  message: {
    margin: 2,
    fontSize: 15,
  },
  time: {
    alignSelf: "flex-end",
    opacity: 0.3,
    fontSize: 13,
  },
  timestampView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 16,
    width: 16,
    marginLeft: 3,
    tintColor: "#3396FD",
  },
});
