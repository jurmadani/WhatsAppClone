import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { userSliceType } from "../types/redux/sliceTypes";
import { windowWidth } from "../constants/Dimensions";
import { Divider } from "react-native-paper";
import OptionRenderItem from "../components/ChooseInfoScreenComponents/OptionRenderItem";

const ChooseInfoScreen = ({ navigation }: any) => {
  const user: userSliceType = useSelector(
    //@ts-ignore
    (state) => state.user.user
  );
  const [offsetY, setOffsetY] = useState(0);
  const scrollViewRef = useRef(null);
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };

  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
  }, [offsetY]);

  const options = [
    "Available",
    "Busy",
    "At school",
    "Watching a movie",
    "At work",
    "My battery is dying",
    "I can't talk right now",
    "In meeting",
    "At the gym",
    "Sleeping",
    "Only emergency ",
  ];
  return (
    <ScrollView
      style={styles.container}
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={24}
    >
      {/* Current info */}
      <Text style={styles.currentStatus}>CURRENT STATUS</Text>

      <View style={styles.currentStatusView}>
        <Divider />
        <Text style={styles.info}>{user.info}</Text>
        <Divider />
      </View>

      <Text style={styles.currentStatus}>PICK A OPTION</Text>
      <FlatList
        style={styles.flatList}
        data={options}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <OptionRenderItem
            item={item}
            index={index}
            currentStatus={user.info}
          />
        )}
      />
    </ScrollView>
  );
};

export default ChooseInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  currentStatus: {
    opacity: 0.4,
    paddingTop: 30,
    paddingLeft: 20,
  },
  currentStatusView: {
    backgroundColor: "white",
    marginTop: 10,
  },
  info: {
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 17,
  },
  flatList: {
    marginTop: 10,
  },
});
