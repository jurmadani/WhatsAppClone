import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";
import { ImageCacheType } from "../types/controllers/controllerTypes";

const ImageCache = ({
  uri,
  height,
  width,
  borderRadius,
  marginTop,
  margin,
  imageType,
}: ImageCacheType) => {
  const [source, setSource] = useState("");
  const user = useSelector(
    (state) =>
      //@ts-ignore
      state.user.user
  );

  const cacheImage = async () => {
    if (uri) {
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
    }
  };

  useEffect(() => {
    cacheImage();
  }, [uri]);

  return (
    <View>
      <Image
        //@ts-ignore
        source={source ? { uri: source } : null}
        style={{
          height: height,
          width: width,
          borderRadius: borderRadius,
          marginTop: marginTop,
          margin: margin,
        }}
      />
    </View>
  );
};

export default ImageCache;
