import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import { IMediaArray } from "../../screens/ChatsScreen";

interface IMediaArrayButtonExtended extends IMediaArray {
  mediaArray: IMediaArray[];
}

const MediaButton = ({ mediaArray }: IMediaArrayButtonExtended) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("AllMedia", {
          mediaArray,
        })
      }
    >
      <View style={styles.container}>
        {/* Icon */}
        <Image
          source={require("../../../assets/icons/MediaIcon.png")}
          style={styles.image}
        />
        {/* Title */}
        <Text style={styles.title}>Media, links, documents</Text>
        {/* Icon */}
        <View style={styles.icon}>
          <Text style={styles.mediaSize}>{mediaArray.length}</Text>
          <AntDesign name="right" size={18} color={"#C9C9C9"} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MediaButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 28,
    width: 28,
    borderRadius: 7,
  },
  title: {
    fontSize: 16,
    paddingLeft: 10,
  },
  icon: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  mediaSize: {
    opacity: 0.4,
    fontSize: 17,
    paddingRight: 5,
  },
});
