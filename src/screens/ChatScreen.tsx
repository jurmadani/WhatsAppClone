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
import dayjs from "dayjs";

const ChatScreen = ({ route }: any) => {
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const [chatRoomId, setChatRoomId] = useState(route?.params?.chatRoomId);
  const [loading, setLoading] = useState(false);
  const [usersDidChatBefore, setDidUsersChatBefore] = useState(false);
  const [messagesArray, setMessagesArray] = useState<IMessage[]>([]);
  const [chatRoom, setChatRoom] = useState<IChatRooms>();
  const fetchMessages = async () => {
    if (chatRoomId != "")
      try {
        const chatRoomRef = await firebase
          .firestore()
          .collection("ChatRooms")
          .doc(chatRoomId)
          .get();

        const chatRoomDocument = chatRoomRef?.data();

        if (chatRoomDocument) {
          setMessagesArray(chatRoomDocument.messages);
          //@ts-expect-error
          setChatRoom(chatRoomDocument);

          const unsubscribe = firebase
            .firestore()
            .collection("ChatRooms")
            .doc(chatRoomId)
            .onSnapshot((snapshot) => {
              const updatedChatRoomData = snapshot.data();
              if (updatedChatRoomData) {
                setMessagesArray(updatedChatRoomData.messages);
                //@ts-ignore
                setChatRoom(updatedChatRoomData);
              }
            });

          return () => {
            unsubscribe();
          };
        }
      } catch (error) {
        console.log("Error fetching messages:", error);
      } finally {
        setLoading(false);
        setDidUsersChatBefore(true);
      }
    else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchMessages().then(() => {
      console.log(
        "Fetched messages done for chat-room between " +
          user.fullName +
          " and " +
          route?.params.firstName +
          " " +
          route?.params?.lastName
      );
    });
  }, [user?.chatRooms, chatRoomId]);

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
            inverted
            data={messagesArray.sort((a, b) => {
              const createdAtA = a.createdAt;
              const createdAtB = b.createdAt;
              if (createdAtA.seconds === createdAtB.seconds) {
                return createdAtB.nanoseconds - createdAtA.nanoseconds;
              } else {
                return createdAtB.seconds - createdAtA.seconds;
              }
            })} // Reverse the array to display messages in descending order
            renderItem={({ item, index }) => {
              const previousItem = index > 0 ? messagesArray[index - 1] : null;
              const isSameTimestamp =
                previousItem &&
                dayjs(item.createdAt.toDate()).isSame(
                  dayjs(previousItem.createdAt.toDate()),
                  "day"
                );
              return (
                <>
                  <Message item={item} index={index} />
                  {!isSameTimestamp && (
                    <View style={styles.timestampContainer}>
                      <Text style={styles.timestampText}>
                        {dayjs(item.createdAt.toDate())
                          .format("dddd, D MMMM")
                          .toLowerCase()}
                      </Text>
                    </View>
                  )}
                </>
              );
            }}
            style={styles.list}
          />
        )}

        <InputBox
          usersDidChatBefore={usersDidChatBefore}
          otherUserUniqueId={route?.params?.otherUserUniqueId}
          setDidUsersChatBefore={setDidUsersChatBefore}
          setChatRoomId={setChatRoomId}
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
  timestampText: {
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.5,
  },
  timestampContainer: {
    alignSelf: "center",
    backgroundColor: "#FEFFE3",
    padding: 6,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 7,
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
