import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const HeaderLeftAccessory = () => {
  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.editButton}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLeftAccessory;

const styles = StyleSheet.create({
  editButton: {
    fontSize: 19,
    color: "#3396FD",
    marginLeft: 15,
  },
});
