import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Divider } from "@ui-kitten/components";
import { IContactActions } from "../../types/ContactDetailsScreenComponentTypes/ContactDetailsScreenTypes";

const ContactActions = ({ title, index }: IContactActions) => {
  return (
    <View>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
        {/* Icon */}
        <View style={styles.icon}>
          <AntDesign name="right" size={18} color={"#C9C9C9"} />
        </View>
      </View>
      {index < 2 && <Divider style={[styles.divider]} />}
    </View>
  );
};

export default ContactActions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
  },
  image: {
    height: 28,
    width: 28,
    borderRadius: 7,
  },
  title: {
    fontSize: 17,
    color: "red",
    marginLeft: 15,
  },
  divider: {
    backgroundColor: "#E4E4E4",
    marginLeft: 15,
  },
  icon: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
});
