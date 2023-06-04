import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useSelector } from "react-redux";

const Message = ({ item }: any) => {
  const [timestamp, setTimestamp] = useState("");
  const transformTimestamp = () => {
    if (
      item.createdAt.nanoseconds != undefined &&
      item.createdAt.seconds != undefined
    ) {
      const createdAt = item.createdAt && item.createdAt.toDate(); // Check if item.createdAt exists before calling toDate()
      const formattedTime = createdAt
        ? createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      return formattedTime;
    } else {
      const formattedTime = item.createdAt
        ? item.createdAt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      return formattedTime;
    }
  };

  useEffect(() => {
    const timestamp = transformTimestamp();
    setTimestamp(timestamp);
  }, []);

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
      <Text style={styles.time}>{timestamp}</Text>
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
});
