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
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { chats } from "../../dummy-test-data/chats";
import ChatListItem from "../components/ChatsScreenComponents/ChatListItem";
import { SearchBar } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "@ui-kitten/components";
import { IChatRooms, userSliceType } from "../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import { firebase } from "../../backend/firebase";

const ChatsScreen = ({ navigation }: any) => {
  const [chatRoomsArray, setChatRoomsArray] = useState<IChatRooms[]>([]);
  const [loading, setLoading] = useState(false);
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
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
    setLoading(true);
    setChatRoomsArray([]);
    const fetchChatRooms = async () => {
      try {
        const chatRoomsData: IChatRooms[] = [];

        for (const chatRoom of user?.chatRooms) {
          const snapshot = await firebase
            .firestore()
            .collection("ChatRooms")
            .where("chatRoomId", "==", chatRoom.chatRoomId)
            .get();

          const documents = snapshot.docs.map((doc) => doc.data());

          if (documents.length !== 0) {
            const newChatRoomObject = {
              chatRoomId: documents[0].chatRoomId,
              messages: documents[0].messages,
              users: documents[0].users,
              lastMessage: documents[0].lastMessage,
            };

            chatRoomsData.push(newChatRoomObject);
          }
        }

        const sortedChatRoomsArray = chatRoomsData.sort(function (a, b) {
          return (
            new Date(a.lastMessage.createdAt).getTime() -
            new Date(b.lastMessage.createdAt).getTime()
          );
        });

        setChatRoomsArray(sortedChatRoomsArray);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchChatRooms().then(() => console.log("Fetching chat rooms completed"));
  }, []);
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
          <View style={styles.filterIcon}>
            <Ionicons name="filter" size={24} color={"#3396FD"} />
          </View>
        </View>

        <View
          style={[
            styles.buttonsView,
            { padding: Platform.OS === "ios" ? 0 : 15 },
          ]}
        >
          {/* My contacts */}
          <Button title="My contacts" color={"#3396FD"} />
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
            data={chats}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => <ChatListItem item={item.item} />}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingBottom: 95,
            }}
          />
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
  SearchBarView: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIcon: {
    marginTop: 10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 99,
    height: 33,
    width: 33,
    alignContent: "center",
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
