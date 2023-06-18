import { StyleSheet, Text, View, Image, Platform } from "react-native";
import React from "react";
import { SearchBar } from "@rneui/base";
import { Divider } from "@ui-kitten/components";

const NewGroupModal = () => {
  return (
    <View style={styles.view}>
      <Text style={[styles.text]}>
        This feature is not implemented yet. Feel free to be{" "}
        <Text style={styles.text2}>creative</Text> and add new features to this
        project
      </Text>
      <Image
        source={require("../../assets/images/illustration.png")}
        style={styles.image}
      />
    </View>
  );
};

export default NewGroupModal;

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
    marginTop: 50,
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
