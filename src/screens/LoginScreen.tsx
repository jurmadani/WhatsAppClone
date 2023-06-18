import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Divider } from "@ui-kitten/components";
import { windowWidth } from "../constants/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";
import Ionicons from "react-native-vector-icons/Ionicons";

const LoginScreen = () => {
  const [country, setCountry] = useState("Romania");
  const [countryCode, setCountryCode] = useState("+40");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  useEffect(() => {
    navigation.setParams({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      countryName: country,
    });
  }, [phoneNumber, countryCode, country]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        {/* Description */}
        <Text style={styles.description}>
          Please enter a phone number asociated with Whatsapp-Clone
        </Text>
        {/* Country selection */}
        <TouchableOpacity
          style={styles.countryNameView}
          onPress={() =>
            navigation.navigate("CountriesModal", {
              setCountry: setCountry,
              setCountryCode: setCountryCode,
            })
          }
        >
          <Text style={styles.countryName}>{country}</Text>
          <AntDesign
            name="right"
            color={"#3396FD"}
            style={styles.arrow}
            size={20}
          />
        </TouchableOpacity>
        {/* Phone number input */}
        <View style={styles.inputView}>
          <Text style={styles.countryCode}>{countryCode}</Text>
          <Divider style={styles.divider} />
          <TextInput
            keyboardType="numeric"
            style={styles.phoneInput}
            placeholder="your phone number"
            value={phoneNumber}
            maxLength={15}
            onChangeText={(number) => setPhoneNumber(number)}
          />
        </View>
        {/* Country picker */}
        <Divider style={styles.divider2} />
        {/* Consent */}
        <View style={styles.consentView}>
          <Ionicons name="lock-closed" size={15} color={"gray"} />
          <Text style={styles.consentText}>
            Messages & images sent{" "}
            <Text style={styles.specialText}>are not encrypted </Text>. By
            pressing done you accept the terms.
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  consentView: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
  },
  signinView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 35,
  },
  text: {
    textAlign: "center",
    opacity: 0.5,
  },
  text2: {
    color: "#3396FD",
    fontWeight: "600",
    fontSize: 16,
  },
  description: {
    textAlign: "center",
    alignSelf: "center",
    width: windowWidth - 50,
    marginTop: 20,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  phoneInput: {
    flex: 1,
    height: 40,
    fontSize: 20,
  },
  divider: {
    height: 25,
    width: 1,
    backgroundColor: "black",
    marginRight: 15,
    marginLeft: 15,
  },
  countryName: {
    color: "#3396FD",
    fontWeight: "600",
    fontSize: 19,
  },
  countryCode: {
    fontSize: 20,
    marginLeft: 20,
  },
  countryNameView: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingTop: 30,
  },
  arrow: {
    paddingLeft: 10,
    paddingTop: 3,
  },
  countryFlag: {
    paddingRight: 10,
    fontSize: 20,
  },
  consentText: {
    textAlign: "center",
    fontSize: 13,
    color: "gray",
    width: windowWidth - 80,
  },
  specialText: {
    color: "#3396FD",
  },
  divider2: {
    marginTop: 20,
  },
});
