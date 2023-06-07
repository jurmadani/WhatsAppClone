import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import { Divider } from "@ui-kitten/components";
import { windowWidth } from "../../constants/Dimensions";
import dayjs from "dayjs";
import {
  IChatRooms,
  IContacts,
  userSliceType,
} from "../../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import { firebase } from "../../../backend/firebase";
import ImageCache from "../../controllers/ImageCache";
import { IChatRoomsExtended } from "../../screens/ChatsScreen";
type ChatListItem = {
  item: IChatRoomsExtended;
};

const ChatListItem = ({ item }: ChatListItem) => {
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const [otherUser, setOtherUser] = useState<userSliceType>();
  const [otherUserAsContactInfo, setOtherUserAsContact] = useState<IContacts>();
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  useEffect(() => {
    const fetchChatRoomData = async () => {
      //got the other user unique id that we will use to get his image
      const otherUserUniqueId = item.users.find(
        (userId) => userId !== user?.uniqueId
      );
      const contactInformation = user?.contacts.find(
        (contact) => contact.uniqueId === otherUserUniqueId
      );
      if (contactInformation != undefined)
        setOtherUserAsContact(contactInformation);

      //get his image url and info
      const snapshot = await firebase
        .firestore()
        .collection("Users")
        .where("uniqueId", "==", otherUserUniqueId)
        .get();
      const otherUserDocument = snapshot.docs.map((doc) => doc.data());
      if (otherUserDocument.length !== 0) {
        setOtherUser(otherUserDocument[0] as userSliceType);
      }
    };
    fetchChatRoomData();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ChatScreen", {
          firstName:
            otherUserAsContactInfo !== undefined
              ? otherUserAsContactInfo?.firstName
              : otherUser?.fullName,
          lastName:
            otherUserAsContactInfo !== undefined
              ? otherUserAsContactInfo?.lastName
              : "",
          otherUserUniqueId: otherUserAsContactInfo?.uniqueId,
          imageURL: otherUser?.imageURL,
          chatRoomId: item?.chatRoomId,
        });
      }}
    >
      <View style={styles.container}>
        {/* User avatar */}
        <ImageCache
          //@ts-ignore
          uri={otherUser?.imageURL}
          height={60}
          width={60}
          borderRadius={99}
          imageType={
            otherUser?.fullName +
            " image from chat list item inside the chats screen"
          }
        />
        <View style={styles.userInfo}>
          {/* User username */}
          {otherUserAsContactInfo != undefined && (
            <Text style={styles.username}>
              {otherUserAsContactInfo?.firstName}{" "}
              {otherUserAsContactInfo?.lastName}
            </Text>
          )}
          {otherUserAsContactInfo === undefined && (
            <Text style={styles.username}>{otherUser?.fullName}</Text>
          )}

          {/* Message */}
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>

        {/* Timestamp */}
        <Text style={styles.timestamp}>{item.lastMessageTimestamp}</Text>
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

  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  userInfo: {
    paddingLeft: 15,
    paddingTop: 5,
  },
  lastMessage: {
    color:'grey',
    width: windowWidth - 130,
    paddingTop: 3,
  },
  divider: {
    marginLeft: 80,
  },
  timestamp: {
    right: 5,
    opacity: 0.4,
    fontSize: 15,
  },
});

export default ChatListItem;
