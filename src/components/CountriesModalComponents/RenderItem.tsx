import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { RenderItemTypes } from "../../types/CountriesModalComponentsTypes/RenderItemType";
import { Divider } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";

const RenderItem = ({
  searchInput,
  item,
  index,
  setCountry,
  setCountryCode,
}: RenderItemTypes) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  if (searchInput === "") {
    return (
      <TouchableOpacity
        onPress={() => {
          //setez tara
          setCountry(item.name);
          setCountryCode(item.dialling_code);
          //go back
          navigation.goBack();
        }}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.country}>{item.name}</Text>
            <Text style={styles.diallingCode}>{item.dialling_code}</Text>
          </View>
          <Divider />
        </View>
      </TouchableOpacity>
    );
  } else {
    const lowercasedInput = searchInput.toLowerCase();
    const lowercasedName = item.name.toLowerCase();
    if (lowercasedName.includes(lowercasedInput)) {
      return (
        <TouchableOpacity
          onPress={() => {
            //setez tara
            setCountry(item.name);
            setCountryCode(item.dialling_code);
            //go back
            navigation.goBack();
          }}
        >
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.country}>{item.name}</Text>
              <Text style={styles.diallingCode}>{item.dialling_code}</Text>
            </View>
            <Divider />
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View></View>;
    }
  }
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "space-around",
  },
  country: {
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 17,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  diallingCode: {
    paddingRight: 20,
    fontSize: 16,
    opacity: 0.4,
  },
});
