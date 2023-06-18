import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { chats } from "../../dummy-test-data/chats";
import ChatListItem from "../components/ChatsScreenComponents/ChatListItem";
import { SearchBar } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "@ui-kitten/components";
import {
  IChatRooms,
  IMessage,
  initialStateToastNotificationSlice,
  timestamp,
  userSliceType,
} from "../types/redux/sliceTypes";
import { useDispatch, useSelector } from "react-redux";
import { firebase } from "../../backend/firebase";
import ToastNotification from "../controllers/ToastNotification";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import { useToast } from "react-native-toast-notifications";
import { useRoute } from "@react-navigation/native";
import { toastNotificationSlice } from "../redux/toastNotificationSlice";

export interface IChatRoomsExtended extends IChatRooms {
  lastMessageTimestamp: string;
  lastMessageCreatedAt: string;
  lastMessageSenderUniqueId: string;
  mediaArray: {
    image: string;
    createdAt: timestamp;
    senderUniqueId: string;
  }[];
  unreadMessages: number;
}

export interface IMessageExtended extends IMessage {
  image?: string;
  read: boolean;
}
export interface IMediaArray {
  image: string;
  createdAt: timestamp;
  senderUniqueId: string;
}

const ChatsScreen = ({ navigation }: any) => {
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const toast = useToast();
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigationHook =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const [chatRoomsArray, setChatRoomsArray] = useState<IChatRoomsExtended[]>(
    []
  );
  const [filtered, setFiltered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const user: userSliceType = useSelector((state: any) => state.user.user);
  const toastNotification: initialStateToastNotificationSlice = useSelector(
    (state: any) => state.toastNotification
  );
  const scrollViewRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };

  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
  }, [offsetY]);

  useEffect(() => {
    // Skip execution on component mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (
      toastNotification.displayNotification &&
      isFocused &&
      route.name === "Chats"
    ) {
      toast.show(toastNotification.message, {
        type: toastNotification.type,
        placement: toastNotification.placement,
        duration: 2500,
      });
    }
  }, [toastNotification.displayNotification, route.name]);

  useEffect(() => {
    setLoading(true);
    setChatRoomsArray([]);

    const fetchChatRooms = async () => {
      try {
        const chatRoomIds = user?.chatRooms || [];
        const promises = chatRoomIds.map(async (chatRoomId) => {
          const chatRoomRef = firebase
            .firestore()
            .collection("ChatRooms")
            .doc(chatRoomId);

          const chatRoomSnapshot = await chatRoomRef.get();
          if (chatRoomSnapshot.exists) {
            //unread messages
            var unreadMessages: number = 0;
            const chatRoomData = chatRoomSnapshot.data();
            if (chatRoomData) {
              chatRoomData.messages.forEach((message: IMessageExtended) => {
                if (
                  message.read === false &&
                  message.senderUniqueId !== user?.uniqueId
                )
                  unreadMessages = unreadMessages + 1;
              });
              const lastMessageIndex = chatRoomData.messages.length - 1;
              const lastMessage = chatRoomData.messages[lastMessageIndex];
              const lastMessageSenderUniqueId = lastMessage.senderUniqueId;
              const lastMessageCreatedAt = lastMessage.createdAt.toDate();
              const currentDate = new Date();
              const timeDifference =
                currentDate.getTime() - lastMessageCreatedAt.getTime();

              const mediaData: IMediaArray[] = [];
              //get all media from firestore in the current chatroom(media = images
              chatRoomData.messages.forEach((message: IMessageExtended) => {
                if (message.image !== undefined && message.text === "") {
                  mediaData.push({
                    image: message?.image,
                    createdAt: message?.createdAt,
                    senderUniqueId: message.senderUniqueId,
                  });
                }
              });
              //   setMediaArray(mediaData);
              let formattedTime;
              if (timeDifference < 86400000) {
                // Less than 24 hours
                formattedTime = lastMessageCreatedAt.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              } else if (timeDifference < 172800000) {
                // Less than 48 hours (2 days)
                formattedTime = "Yesterday";
              } else if (timeDifference < 604800000) {
                // Less than 7 days (1 week)
                formattedTime = lastMessageCreatedAt.toLocaleDateString([], {
                  weekday: "long",
                });
              } else {
                // Older than a week
                formattedTime = lastMessageCreatedAt.toLocaleDateString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                });
              }
              // Remove the date part from formattedTime if it contains a comma
              if (formattedTime.includes(",")) {
                formattedTime = formattedTime.split(",")[0].trim();
              }
              // Add a listener to the chat room document to listen for changes
              chatRoomRef.onSnapshot(async (snapshot) => {
                var unreadMessages: number = 0;
                const mediaData: IMediaArray[] = [];
                const updatedChatRoomData = snapshot.data();
                if (updatedChatRoomData) {
                  //get unread messages from that chatroom
                  updatedChatRoomData.messages.forEach(
                    (message: IMessageExtended) => {
                      if (
                        message.read === false &&
                        message.senderUniqueId !== user?.uniqueId
                      )
                        unreadMessages = unreadMessages + 1;
                    }
                  );
                  const updatedLastMessageIndex =
                    updatedChatRoomData.messages.length - 1;
                  const updatedLastMessage =
                    updatedChatRoomData.messages[updatedLastMessageIndex];
                  const updatedLastMessageSenderUniqueId =
                    updatedChatRoomData.messages[updatedLastMessageIndex]
                      .senderUniqueId;
                  const updatedLastMessageCreatedAt =
                    updatedLastMessage.createdAt.toDate();

                  const currentDate = new Date();
                  const updatedTimeDifference =
                    currentDate.getTime() -
                    updatedLastMessageCreatedAt.getTime();

                  //get all media from firestore in the current chatroom(media = images
                  updatedChatRoomData.messages.forEach(
                    (message: IMessageExtended) => {
                      if (message.image !== undefined && message.text === "") {
                        mediaData.push({
                          image: message?.image,
                          createdAt: message?.createdAt,
                          senderUniqueId: message.senderUniqueId,
                        });
                      }
                    }
                  );

                  let updatedFormattedTime: string;

                  if (updatedTimeDifference < 86400000) {
                    // Less than 24 hours
                    updatedFormattedTime =
                      updatedLastMessageCreatedAt.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                  } else if (updatedTimeDifference < 172800000) {
                    // Less than 48 hours (2 days)
                    updatedFormattedTime = "Yesterday";
                  } else if (updatedTimeDifference < 604800000) {
                    // Less than 7 days (1 week)
                    updatedFormattedTime =
                      updatedLastMessageCreatedAt.toLocaleDateString([], {
                        weekday: "long",
                      });
                  } else {
                    // Older than a week
                    updatedFormattedTime =
                      updatedLastMessageCreatedAt.toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      });
                  }
                  if (updatedFormattedTime.includes(",")) {
                    updatedFormattedTime = updatedFormattedTime
                      .split(",")[0]
                      .trim();
                  }
                  // Update the chat room data in the state with the updated last message and formatted time
                  setChatRoomsArray((prevChatRooms) => {
                    const updatedChatRooms = [...prevChatRooms];
                    const chatRoomIndex = updatedChatRooms.findIndex(
                      (room) => room.chatRoomId === chatRoomData.chatRoomId
                    );
                    if (chatRoomIndex !== -1) {
                      updatedChatRooms[chatRoomIndex] = {
                        ...updatedChatRooms[chatRoomIndex],
                        messages: updatedChatRoomData.messages,
                        lastMessage: updatedChatRoomData.lastMessage,
                        lastMessageCreatedAt:
                          updatedLastMessageCreatedAt.getTime(),
                        lastMessageTimestamp: updatedFormattedTime,
                        lastMessageSenderUniqueId:
                          updatedLastMessageSenderUniqueId,
                        mediaArray: mediaData,
                        unreadMessages: unreadMessages,
                      };
                    }
                    return updatedChatRooms;
                  });

                  //toast notification
                  if (updatedLastMessageSenderUniqueId !== user?.uniqueId) {
                    const task = await firebase
                      .firestore()
                      .collection("Users")
                      .where("uniqueId", "==", updatedLastMessageSenderUniqueId)
                      .get();

                    const contact = user?.contacts.find(
                      (c) => c.uniqueId === updatedLastMessageSenderUniqueId
                    );

                    //dispatch toast notification:
                    dispatch(
                      toastNotificationSlice.actions.showToast({
                        message:
                          updatedLastMessage.text === ""
                            ? contact !== undefined
                              ? contact.firstName + " send a photo"
                              : task.docs[0].data().fullName + " send a photo"
                            : updatedLastMessage.text,
                        type: "normal",
                        placement: "top",
                        duration: 2500,
                        contactFirstName:
                          contact !== undefined
                            ? contact.firstName
                            : task.docs[0].data().fullName,
                        contactLastName:
                          contact !== undefined ? contact.lastName : "",
                        contactImageURL: task.docs[0].data().imageURL,
                        contactUniqueId:
                          contact !== undefined
                            ? contact.uniqueId
                            : task.docs[0].data().uniqueId,
                        chatRoomId:
                          chatRoomData.chatRoomId !== undefined
                            ? chatRoomData.chatRoomId
                            : "",
                      })
                    );
                    setTimeout(() => {
                      dispatch(toastNotificationSlice.actions.hideToast());
                    }, 2500);
                    //
                  }
                }
              });

              return {
                chatRoomId: chatRoomData.chatRoomId,
                messages: chatRoomData.messages,
                users: chatRoomData.users,
                lastMessage: chatRoomData.lastMessage,
                lastMessageCreatedAt: lastMessageCreatedAt.getTime(),
                lastMessageTimestamp: formattedTime,
                lastMessageSenderUniqueId: lastMessageSenderUniqueId,
                mediaArray: mediaData,
                unreadMessages: unreadMessages,
              };
            }
          }
          return null;
        });

        const chatRoomsData = await Promise.all(promises);
        const filteredChatRoomsData = chatRoomsData.filter(
          (chatRoom) => chatRoom !== null
        );
        //@ts-ignore
        setChatRoomsArray(filteredChatRoomsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchChatRooms().then(() => {
      console.log("Fetching chat rooms done");
    });
  }, [user?.chatRooms, user?.contacts]);

  return (
    <ScrollView
      style={styles.screenContainer}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={24}
    >
      <View style={styles.screenContainer}>
        {/* Header title */}

        <Text style={styles.headerStyle}>Chats</Text>
        <View style={styles.SearchBarView}>
          {/* Search bar */}
          <SearchBar
            //@ts-ignore
            platform={Platform.OS === "ios" ? "ios" : "android"}
            value={searchInput}
            onChangeText={(text) => setSearchInput(text)}
            inputContainerStyle={[
              styles.inputContainerStyle,
              {
                height: Platform.OS === "ios" ? 10 : 40,
              },
            ]}
            containerStyle={styles.containerStyle}
            placeholder={"Search"}
            showCancel={false}
          />

          {/* Filter icon */}
          <TouchableOpacity
            onPress={() => setFiltered((prevFiltered) => !prevFiltered)}
          >
            <View
              style={
                filtered ? styles.filterIconPressed : styles.filterIconUnpressed
              }
            >
              <Ionicons
                name="filter"
                size={20}
                color={filtered ? "white" : "#3396FD"}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.buttonsView,
            { padding: Platform.OS === "ios" ? 0 : 15 },
          ]}
        >
          {/* My contacts */}
          <Button
            title="My contacts"
            color={"#3396FD"}
            //@ts-expect-error
            onPress={() => navigationHook.navigate("Contacts")}
          />
          {/* New chat */}
          <Button title="New group" color={"#3396FD"} />
        </View>

        <Divider />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : chatRoomsArray.length === 0 ? (
          <View style={styles.noChatRooms}>
            <Image
              source={require("../../assets/images/Illustration_mobile_whatsapp.png")}
              style={styles.image}
            />
            <Text style={styles.title}>No conversations</Text>
            <Text style={styles.text}>Add a contact and start chatting</Text>
          </View>
        ) : (
          <FlatList
            data={chatRoomsArray.sort(
              (chatRoomA, chatRoomB) =>
                new Date(chatRoomB.lastMessageCreatedAt).getTime() -
                new Date(chatRoomA.lastMessageCreatedAt).getTime()
            )}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              if (!filtered) {
                return <ChatListItem item={item} searchInput={searchInput} />;
              } else if (filtered && item.unreadMessages > 0) {
                return <ChatListItem item={item} searchInput={searchInput} />;
              }
            }}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingBottom: 95,
            }}
          />
        )}
        {filtered &&
          chatRoomsArray.filter((item) => item.unreadMessages > 0).length ===
            0 && (
            <View style={styles.unreadConversationView}>
              <Text style={styles.text2}>No unread conversation</Text>
              <TouchableOpacity
                onPress={() => setFiltered((prevFiltered) => !prevFiltered)}
              >
                <Text style={styles.text3}>Disable filter</Text>
              </TouchableOpacity>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  unreadConversationView: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  text2: {
    fontSize: 20,
    opacity: 0.4,
  },
  text3: {
    marginTop: 10,
    color: "#3396FD",
    fontSize: 16,
  },
  SearchBarView: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIconUnpressed: {
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 99,
    height: 33,
    width: 33,
    alignContent: "center",
  },
  filterIconPressed: {
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 99,
    height: 33,
    width: 33,
    alignContent: "center",
    backgroundColor: "#3396FD",
  },
  headerStyle: {
    fontWeight: "bold",
    fontSize: 35,
    paddingLeft: 20,
    paddingTop: 20,
  },
  inputContainerStyle: {
    backgroundColor: "whitesmoke",
  },
  containerStyle: {
    paddingLeft: 10,
    marginTop: 10,
    width: "90%",
  },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingRight: 5,
    paddingLeft: 5,
  },
  loading: {
    marginTop: 50,
  },
  noChatRooms: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  image: {
    height: 130,
    width: 186,
  },
  title: {
    fontSize: 30,
    paddingTop: 25,
  },
  text: {
    paddingTop: 10,
    fontSize: 15,
    opacity: 0.4,
  },
});

export default ChatsScreen;
