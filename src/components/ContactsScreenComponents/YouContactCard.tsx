import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { YouContactCardTypes } from "../../types/ContactsScreenComponentTypes/YouContactCardType";
import { windowWidth } from "../../constants/Dimensions";
import ImageCache from "../../controllers/ImageCache";
import { userSliceType } from "../../types/redux/sliceTypes";
import { useSelector } from "react-redux";
import { Divider } from "@ui-kitten/components";

const YouContactCard = ({ fullName, imageURL, info }: YouContactCardTypes) => {
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  return (
    <View>
      <View style={styles.container}>
        {/* Contact image */}
        <ImageCache
          uri={imageURL}
          borderRadius={99}
          height={45}
          width={45}
          imageType="User image in YouContactCard component from Contacts screen "
        />
        <View style={styles.textContainer}>
          {/* first name and last name how the user saved the contact */}
          <Text style={styles.name}>{fullName}</Text>
          {/* contact info */}
          <Text style={styles.info}>{info}</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  );
};

export default YouContactCard;

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
