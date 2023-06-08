import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { IStatusCard } from "../../types/ContactDetailsScreenComponentTypes/ContactDetailsScreenTypes";

const StatusCard = ({ info }: IStatusCard) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

export default StatusCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginRight: 20,
    marginLeft: 20,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    paddingLeft: 10,
  },
  info: {
    paddingLeft: 10,
    opacity: 0.4,
    paddingTop: 3,
  },
});
