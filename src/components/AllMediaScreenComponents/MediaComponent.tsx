import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { timestamp } from "../../types/redux/sliceTypes";
import ImageCache from "../../controllers/ImageCache";
import { windowWidth } from "../../constants/Dimensions";

interface IMediaComponent {
  senderUniqueId: string;
  createdAt: timestamp;
  image: string;
}

const MediaComponent = ({
  senderUniqueId,
  image,
  createdAt,
}: IMediaComponent) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <ImageCache
          uri={image}
          height={windowWidth / 4}
          width={windowWidth / 4}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MediaComponent;

const styles = StyleSheet.create({
  container: {
    padding: 1,
  },
});
