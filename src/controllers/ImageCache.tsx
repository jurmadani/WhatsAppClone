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
  const ImgFunc = async (path: string) => {
    const image = await FileSystem.getInfoAsync(path);
    if (image.exists) {
      setSource(image.uri);
      console.log(imageType + " read from cache");
    } else {
      const newImage = await FileSystem.downloadAsync(uri, path);
      setSource(newImage.uri);
      console.log(imageType + " file didn't existed downloaded to cache");
    }
  };

  useEffect(() => {
    if (uri != undefined) {
      var sh = require("shorthash");
      const name = sh.unique(uri);
      const path = `${FileSystem.cacheDirectory}${name}`;
      ImgFunc(path);
    }
  }, []);
  return (
    <View>
      <Image
        //@ts-ignore
        source={{ uri: source === "" ? null : source }}
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
