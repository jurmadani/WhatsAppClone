import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { timestamp } from "../../types/redux/sliceTypes";
import ImageCache from "../../controllers/ImageCache";
import { windowWidth } from "../../constants/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

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
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SpecificMedia", {
          senderUniqueId,
          createdAt,
          image
        })
      }
    >
      <View style={styles.container}>
        <ImageCache
          uri={image}
          height={windowWidth / 4}
          width={windowWidth / 4}
          imageType="media image"
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
