import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const InputBox = () => {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <AntDesign name="plus" size={27} color={"#007AFF"} />
      {/* Text input */}
      <TextInput placeholder="type your message..." style={styles.input} />
      {/* Icon */}
      <MaterialIcons
        style={styles.send}
        name="send"
        color={"white"}
        size={18}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "whitesmoke",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 50,
    paddingHorizontal: 10,
    borderColor: "lightgray",
    borderWidth: 0.8,
    marginHorizontal: 10,
    fontSize: 15,
  },
  send: {
    backgroundColor: "#007AFF",
    padding: 7,
    borderRadius: 17,
    overflow: "hidden",
    alignSelf: "center",
  },
});
