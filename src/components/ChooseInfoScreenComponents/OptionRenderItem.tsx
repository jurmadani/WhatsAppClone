import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { OptionRenderItemType } from "../../types/ChooseInfoScreenComponentsTypes/OptionRenderItemTypes";
import { Divider } from "@ui-kitten/components";
import Ionicons from "react-native-vector-icons/Ionicons";

const OptionRenderItem = ({
  item,
  index,
  currentStatus,
}: OptionRenderItemType) => {
  return (
    <TouchableOpacity>
      <Divider style={styles.divider} />
      <View style={styles.container}>
        <Text style={styles.item}>{item}</Text>
        {currentStatus === item && (
          <Ionicons
            name="checkmark"
            size={27}
            style={styles.icon}
            color="#3396FD"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default OptionRenderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  item: {
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 17,
  },
  divider: {
    marginLeft: 20,
    backgroundColor: "lightgray",
  },
  icon: {
    paddingRight: 10,
  },
});
