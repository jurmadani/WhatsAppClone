import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";
import { ImageCacheType } from "../types/controllers/controllerTypes";
import { Skeleton } from "@rneui/base";
import { windowWidth } from "../constants/Dimensions";

const ImageCache = ({
  uri,
  height,
  width,
  borderRadius,
  marginTop,
  margin,
  imageType,
}: ImageCacheType) => {
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [source, setSource] = useState("");
  const user = useSelector(
    (state) =>
      //@ts-ignore
      state.user.user
  );

  const cacheImage = async () => {
    if (uri) {
      if (imageType === "image sent as message") setSkeletonLoading(true);
      const sh = require("shorthash");
      const name = sh.unique(uri);
      const path = `${FileSystem.cacheDirectory}${name}`;
      const image = await FileSystem.getInfoAsync(path);
      if (image.exists) {
        setSource(image.uri);
        console.log(imageType + " read from cache");
      } else {
        const newImage = await FileSystem.downloadAsync(uri, path);
        setSource(newImage.uri);
        console.log(imageType + " file didn't exist, downloaded to cache");
      }
      setSkeletonLoading(false);
    }
  };

  useEffect(() => {
    cacheImage();
  }, [uri]);
  const styles = StyleSheet.create({
    skeleton: {
      height: height,
      width: width,
      marginTop: marginTop,
      borderRadius: borderRadius,
      marginBottom: imageType === "image sent as message" ? 5 : 0,
      marginLeft: imageType === "image sent as message" ? 5 : 0,
      marginRight: imageType === "image sent as message" ? 5 : 0,
    },
    activityIndicator: {
      position: "absolute",
      alignSelf: "center",
      top: height !== undefined ? height / 2 : 0,
    },
    image: {
      height: height,
      width: width,
      borderRadius: borderRadius,
      marginTop: marginTop,
      margin: margin,
      marginBottom: imageType === "image sent as message" ? 5 : 0,
      marginLeft: imageType === "image sent as message" ? 5 : 0,
      marginRight: imageType === "image sent as message" ? 5 : 0,
    },
  });

  return (
    <View>
      {skeletonLoading && imageType === "image sent as message" ? (
        <View>
          <Skeleton animation="pulse" style={styles.skeleton} />
          <ActivityIndicator color={"black"} style={styles.activityIndicator} />
        </View>
      ) : (
        <Image
          //@ts-ignore
          source={source ? { uri: source } : null}
          style={styles.image}
        />
      )}
    </View>
  );
};

export default ImageCache;
