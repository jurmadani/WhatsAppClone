import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Message from "../components/ChatScreenComponents/Message";
import InputBox from "../components/ChatScreenComponents/InputBox";
import { IChatRooms, IMessage, userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import { firebase } from "../../backend/firebase";
import Entypo from "react-native-vector-icons/Entypo";

const ChatScreen = ({ route }: any) => {
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [usersDidChatBefore, setDidUsersChatBefore] = useState(true);
  const [messagesArray, setMessagesArray] = useState<IMessage[]>([]);
  const [chatRoom, setChatRoom] = useState<IChatRooms>();

  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      if (user?.chatRooms.length === 0) {
        setDidUsersChatBefore(false);
      } else {
        const userChatRoomsSnapshot = await firebase
          .firestore()
          .collection("ChatRooms")
          .where("users", "array-contains", user?.uniqueId)
          .get();

        const otherUserChatRoomsSnapshot = await firebase
          .firestore()
          .collection("ChatRooms")
          .where("users", "array-contains", route?.params?.uniqueId)
          .get();

        const userChatRooms = userChatRoomsSnapshot.docs.map((doc) =>
          doc.data()
        );
        const otherUserChatRooms = otherUserChatRoomsSnapshot.docs.map((doc) =>
          doc.data()
        );

        const commonChatRoom = userChatRooms.find((chatRoom) =>
          otherUserChatRooms.some(
            (otherChatRoom) => chatRoom.chatRoomId === otherChatRoom.chatRoomId
          )
        );

        if (commonChatRoom) {
          setDidUsersChatBefore(true);
          setChatRoom(commonChatRoom as IChatRooms); // Cast the type to IChatRooms

          // Fetch messages for the common chat room
          const chatRoomMessagesSnapshot = await firebase
            .firestore()
            .collection("ChatRooms")
            .doc(commonChatRoom.chatRoomId)
            .get();

          const chatRoomData = chatRoomMessagesSnapshot.data();
          setMessagesArray(chatRoomData?.messages);
        } else {
          setDidUsersChatBefore(false);
        }
      }
    };

    try {
      fetchMessages().then(() => {
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [user?.chatRooms, user?.uniqueId, route?.params?.uniqueId]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
      style={{ flex: 1, backgroundColor: "whitesmoke" }}
    >
      <ImageBackground
        source={require("../../assets/images/BG.png")}
        style={styles.container}
      >
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : usersDidChatBefore === false ? (
          <View style={styles.noChatsView}>
            <View style={styles.noChatsContainer}>
              <Entypo name="lock" size={15} style={styles.icon} />
              <Text style={styles.noChatsText}>
                Messages you send to this chat and calls are not secured with
                end-to-end encryption.
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={messagesArray.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA; // Sort in descending order (newest to oldest)
            })}
            renderItem={({ item }) => <Message item={item} />}
            style={styles.list}
            inverted
          />
        )}

        <InputBox
          usersDidChatBefore={usersDidChatBefore}
          otherUserUniqueId={route?.params?.uniqueId}
          setDidUsersChatBefore={setDidUsersChatBefore}
          chatRoom={chatRoom}
          messagesArray={messagesArray}
          setMessagesArray={setMessagesArray}
        />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 35,
    backgroundColor: "whitesmoke",
  },
  list: {
    padding: 8,
  },
  noChatsView: {
    flex: 1,
    alignItems: "center",
  },
  noChatsContainer: {
    backgroundColor: "#FFF5C4",
    marginRight: 60,
    marginLeft: 60,
    marginTop: 30,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  noChatsText: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.8,
  },
  icon: {
    paddingRight: 5,
  },
  loading: {
    flex: 1,
  },
});
