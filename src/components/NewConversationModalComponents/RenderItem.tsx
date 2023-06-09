import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { RenderItemTypes } from "../../types/NewConversationModalScreenTypes/RenderItemTypes";
import ImageCache from "../../controllers/ImageCache";
import { Divider } from "@ui-kitten/components";
import { windowWidth } from "../../constants/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

const Contact = ({ item, index }: RenderItemTypes) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
        navigation.navigate("ChatScreen", {
          firstName: item.firstName,
          lastName: item.lastName,
          imageURL: item.imageURL,
          otherUserUniqueId: item.uniqueId,
          chatRoomId: item.chatRoomId,
        });
      }}
    >
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
            <Text style={styles.firstName}>
              {item.firstName} <Text style={styles.name}>{item.lastName}</Text>
            </Text>
            {/* contact info */}
            <Text style={styles.info}>{item.info}</Text>
          </View>
        </View>
        <Divider style={styles.divider} />
      </View>
    </TouchableOpacity>
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
  firstName: {
    fontSize: 17,
  },
});
