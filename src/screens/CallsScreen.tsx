import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { SearchBar } from "@rneui/base";
import { Divider } from "@ui-kitten/components";

const CallsScreen = ({ navigation }: any) => {
  const [searchInput, setSearchInput] = useState("");
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
      {/* Header title */}
      <Text style={styles.headerStyle}>Calls</Text>
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
      <Divider style={styles.divider} />
      <View style={styles.view}>
        <Text style={[styles.text]}>
          This feature is not implemented yet. Feel free to be{" "}
          <Text style={styles.text2}>creative</Text> and add new features to
          this project
        </Text>
        <Image
          source={require("../../assets/images/illustration.png")}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

export default CallsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    marginTop: 100,
    color: "gray",
  },
  text2: {
    color: "#3396FD",
    fontWeight: "600",
  },
  image: {
    height: 220,
    width: 301,
    alignSelf: "center",
    marginTop:50,
  },
  divider: {
    marginTop: 10,
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
    paddingRight: 10,
  },
});
