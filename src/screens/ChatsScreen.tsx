import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import React, { useRef, useEffect, useState } from "react";
import { chats } from "../../dummy-test-data/chats";
import ChatListItem from "../components/ChatsScreenComponents/ChatListItem";
import { SearchBar } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "@ui-kitten/components";

const ChatsScreen = ({ navigation }: any) => {
  const scrollViewRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };

  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
  }, [offsetY]);

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
            inputContainerStyle={styles.inputContainerStyle}
            containerStyle={styles.containerStyle}
            placeholder={"Search"}
            showCancel={false}
          />
          {/* Filter icon */}
          <View style={styles.filterIcon}>
            <Ionicons name="filter" size={24} color={"#3396FD"} />
          </View>
        </View>

        <View style={styles.buttonsView}>
          {/* My contacts */}
          <Button title="My contacts" color={"#3396FD"} />
          {/* New chat */}
          <Button title="New group" color={"#3396FD"} />
        </View>
        <Divider />
        <FlatList
          data={chats}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => <ChatListItem item={item.item} />}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingBottom: 95,
          }}
        />
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
    height: 10,
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
});

export default ChatsScreen;
