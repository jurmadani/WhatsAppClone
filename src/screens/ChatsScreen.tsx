import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { chats } from "../../dummy-test-data/chats";
import ChatListItem from "../components/ChatsScreenComponents/ChatListItem";

const ChatsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <FlatList
        data={chats}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => <ChatListItem item={item.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default ChatsScreen;
