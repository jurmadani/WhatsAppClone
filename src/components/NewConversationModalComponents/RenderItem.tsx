import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RenderItemTypes } from "../../types/NewConversationModalScreenTypes/RenderItemTypes";
import ImageCache from "../../controllers/ImageCache";
import { Divider } from "@ui-kitten/components";
import { windowWidth } from "../../constants/Dimensions";

const Contact = ({ item, index }: RenderItemTypes) => {
  return (
    <View>
      <View style={styles.container}>
        {/* Contact image */}
        <ImageCache
          uri={item.imageURL}
          borderRadius={99}
          height={45}
          width={45}
          imageType={
            item.firstName + " " + item.lastName + " contact profile picture"
          }
        />
        <View style={styles.textContainer}>
          {/* first name and last name how the user saved the contact */}
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          {/* contact info */}
          <Text style={styles.info}>{item.info}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingTop: 13,
    paddingBottom: 7,
  },
  textContainer: {
    paddingLeft: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
  },
  info: {
    opacity: 0.4,
    fontSize: 12,
  },
  divider: {
    width: windowWidth,
    marginLeft: 65,

  },
});
