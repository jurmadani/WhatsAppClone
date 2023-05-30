import { StyleSheet, Text, View } from "react-native";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Message = ({ item }: any) => {
  const isMyMessage = () => {
    return item.user.id === "u1";
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
      <Text style={styles.time}>{dayjs(item.createdAt).format("HH:MM")}</Text>
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
  },
  message: {
    margin: 2,
  },
  time: {
    alignSelf: "flex-end",
    opacity: 0.3,
    fontSize:13,
  },
});
