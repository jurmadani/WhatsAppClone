import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SearchBar } from "@rneui/base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "@ui-kitten/components";
import UserProfileCard from "../components/SettingsScreenComponents/UserProfileCard";
import RenderItem from "../components/SettingsScreenComponents/RenderItem";
import {
  data1,
  data2,
  data3,
} from "../components/SettingsScreenComponents/ButtonData";
import { useSelector } from "react-redux";

const SettingsScreen = ({ navigation }: any) => {
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
        <Text style={styles.headerStyle}>Settings</Text>

        {/* Search bar */}
        <SearchBar
          //@ts-ignore
          platform={Platform.OS === "ios" ? "ios" : "android"}
          inputContainerStyle={[
            styles.inputContainerStyle,
            { height: Platform.OS === "ios" ? 10 : 40 },
          ]}
          containerStyle={styles.containerStyle}
          placeholder={"Search"}
          showCancel={false}
        />
        <Divider style={styles.divider} />
        {/* User profile card */}
        <UserProfileCard />
        {/* First list of buttons */}
        <FlatList
          scrollEnabled={false}
          data={data1}
          style={styles.list1}
          renderItem={({ item, index }) => (
            <RenderItem
              title={item.title}
              image={item.image}
              index={index}
              dataLenght={data1.length}
            />
          )}
        />
        {/* 2nd list of buttons */}
        <FlatList
          scrollEnabled={false}
          style={styles.list2}
          data={data2}
          renderItem={({ item, index }) => (
            <RenderItem
              title={item.title}
              image={item.image}
              index={index}
              dataLenght={data1.length}
            />
          )}
        />
        {/* 3rd list of buttons */}
        <FlatList
          scrollEnabled={false}
          style={styles.list3}
          data={data3}
          renderItem={({ item, index }) => (
            <RenderItem
              title={item.title}
              image={item.image}
              index={index}
              dataLenght={data1.length}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: "whitesmoke",
    flex: 1,
  },
  headerStyle: {
    fontWeight: "bold",
    fontSize: 35,
    paddingLeft: 20,
    paddingTop: 20,
  },
  inputContainerStyle: {
    backgroundColor: "#E4E4E4",
  },
  containerStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 13,
    backgroundColor: "whitesmoke",
  },
  divider: {
    marginTop: 15,
    backgroundColor: "#E4E4E4",
  },
  list1: {
    marginTop: 15,
  },
  list2: {
    marginTop: 35,
  },
  list3: {
    marginTop: 35,
    marginBottom: 100,
  },
});
