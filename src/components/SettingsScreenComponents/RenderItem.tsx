import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Divider } from "@ui-kitten/components";
import AntDesign from "react-native-vector-icons/AntDesign";

const RenderItem = ({ title, image, dataLenght, index }: IListItem) => {
  return (
    <View>
      <View style={styles.container}>
        {/* Icon */}
        <Image source={image} style={styles.image} />
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
        {/* Icon */}
        <View style={styles.icon}>
          <AntDesign name="right" size={18} color={"#C9C9C9"} />
        </View>
      </View>
      <Divider style={[styles.divider]} />
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 10,
    backgroundColor: "white",
    paddingBottom: 10,
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
  divider: {
    backgroundColor: "#E4E4E4",
  },
  icon: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 15,
  },
});
