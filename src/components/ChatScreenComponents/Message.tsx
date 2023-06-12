import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import { MessageType } from "../../types/ChatScreenComponentTypes/MessageType";
import { windowHeight, windowWidth } from "../../constants/Dimensions";
import ImageCache from "../../controllers/ImageCache";

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
          padding: item?.image !== undefined ? 0 : 10,
        },
      ]}
    >
      {/* Messages */}
      {item?.image !== undefined ? (
        <ImageCache
          uri={item.image}
          height={windowHeight / 3.5}
          width={windowWidth - 150}
          marginTop={5}
          borderRadius={10}
          imageType="image sent as message"
        />
      ) : (
        <Text style={styles.message}>{item.text}</Text>
      )}
      {item?.image !== undefined ? (
        //Timestamp and tick status
        <View style={styles.timestampViewForImage}>
          <Text style={styles.imageTime}>
            {new Date(item.createdAt.toDate()).toLocaleTimeString().slice(0, 5)}
          </Text>
          {isMyMessage() && (
            <Image
              source={require("../../../assets/icons/doubleTick.png")}
              style={styles.icon}
            />
          )}
        </View>
      ) : (
        //Timestamp and tick status

        <View style={styles.timestampView}>
          <Text style={styles.time}>
            {new Date(item.createdAt.toDate()).toLocaleTimeString().slice(0, 5)}
          </Text>
          {isMyMessage() && (
            <Image
              source={require("../../../assets/icons/doubleTick.png")}
              style={styles.icon}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    margin: 5,
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
  timestampViewForImage: {
    flexDirection: "row",
    alignSelf: "flex-end",
    top: 5 + windowHeight / 3.8,
    paddingRight: 10,
    paddingBottom: 5,
    position: "absolute",
  },
  imageTime: {
    alignSelf: "flex-end",
    fontSize: 13,
    color: "white",
    fontWeight: "500",
  },
  image: {
    height: windowHeight / 3.5,
    width: windowWidth - 150,
    marginBottom: 5,
  },
  message: {
    margin: 2,
    fontSize: 15,
  },
  time: {
    alignSelf: "flex-end",
    opacity: 0.3,
    fontSize: 13,
    fontWeight: "500",
  },
  timestampView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  icon: {
    height: 16,
    width: 16,
    marginLeft: 3,
    tintColor: "#3396FD",
  },
});
