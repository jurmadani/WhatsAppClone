import { View, Text, Image, Animated } from "react-native";
import React, { useState, useEffect, useRef, createRef } from "react";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";
import { ImageCacheType } from "../types/controllers/controllerTypes";
import {
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { userSliceType } from "../types/redux/sliceTypes";

const AnimatedImageCache = ({
  uri,
  height,
  width,
  borderRadius,
  marginTop,
  margin,
  imageType,
}: ImageCacheType) => {
  const [panEnabled, setPanEnabled] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const user: userSliceType = useSelector(
    (state) =>
      //@ts-ignore
      state.user.user
  );
  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }: any) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };
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

  useEffect(() => {
    if (uri != undefined) {
      var sh = require("shorthash");
      const name = sh.unique(uri);
      const path = `${FileSystem.cacheDirectory}${name}`;
      ImgFunc(path);
    }
  }, [user.imageURL]);
  return (
    <View>
      <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View>
          <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
            <Animated.Image
              //@ts-ignore
              source={{ uri: source === "" ? null : source }}
              style={{
                height: height,
                width: width,
                borderRadius: borderRadius,
                marginTop: marginTop,
                margin: margin,
                transform: [{ scale }, { translateX }, { translateY }],
              }}
              resizeMode="contain"
            />
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default AnimatedImageCache;
