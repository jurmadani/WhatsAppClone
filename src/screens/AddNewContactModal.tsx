import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Divider } from "@ui-kitten/components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";

const AddNewContactModal = ({ navigation }: any) => {
  const navigationHook =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  const [country, setCountry] = useState("Romania");
  const [countryCode, setCountryCode] = useState("+40");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const scrollViewRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setOffsetY(offsetY);
  };
  useEffect(() => {
    navigation.setParams({ offsetY }); // Pass the offsetY value to route.params
    if (phoneNumber != "" && firstName != "" && lastName != "")
      navigation.setParams({
        contanctCanBeSaved: true,
        country,
        countryCode,
        firstName,
        lastName,
        phoneNumber,
      });
    else navigation.setParams({ contanctCanBeSaved: false });
  }, [offsetY, phoneNumber, firstName, lastName, country, countryCode]);
  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={24}
      style={styles.container}
    >
      <View style={styles.nameContainer}>
        {/* First name input */}
        <Divider />
        <TextInput
          placeholder="First name"
          style={styles.firstName}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Divider style={styles.divider1} />
        {/* Last name input */}
        <TextInput
          placeholder="Last name"
          style={styles.lastName}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Divider />
      </View>
      <View style={styles.phoneContainer}>
        {/* Country */}
        <TouchableOpacity
          onPress={() =>
            navigationHook.navigate("CountriesModal", {
              setCountry: setCountry,
              setCountryCode: setCountryCode,
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.text}>Country</Text>
            <Text style={styles.country}>{country}</Text>
            <AntDesign
              name="right"
              size={20}
              color={"#C9C9C9"}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <Divider />
        {/* Phone number */}
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.countryCode}>{countryCode}</Text>
          <TextInput
            placeholder="Phone number"
            style={styles.phoneNumber}
            keyboardType="numeric"
            maxLength={15}
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default AddNewContactModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    flex: 1,
  },
  nameContainer: {
    backgroundColor: "white",
    marginTop: 20,
  },
  firstName: {
    fontSize: 17,
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
  },
  lastName: {
    fontSize: 17,
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
  },
  divider1: {
    marginLeft: 20,
  },
  phoneContainer: {
    backgroundColor: "white",
    marginTop: 30,
  },
  text: {
    fontSize: 17,
    fontWeight: "600",
    left: 20,
    paddingTop: 13,
    paddingBottom: 13,
    width: 90,
  },
  country: {
    fontSize: 17,
    paddingTop: 13,
    paddingBottom: 13,
    flex: 1,
  },
  icon: {
    paddingTop: 13,
    paddingBottom: 13,
    right: 20,
  },
  countryCode: {
    paddingLeft: 20,
    paddingTop: 13,
    paddingBottom: 13,
    fontSize: 17,
  },
  phoneNumber: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
});
