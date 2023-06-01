import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { windowWidth } from "../constants/Dimensions";
import { CountryPicker } from "react-native-country-codes-picker";
import { Divider } from "@ui-kitten/components";
import AntDesign from "react-native-vector-icons/AntDesign";
import { firebase } from "../../backend/firebase";

const SignupScreen = ({ route, navigation }: any) => {
  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+32");
  const [countryName, setCountryName] = useState("Belgium");
  const [countryFlag, setCountryFlag] = useState("🇧🇪");
  useEffect(() => {
    navigation.setParams({
      phoneNumber: phoneNumber,
      countryCode: countryCode,
      countryName: countryName,
    });
  }, [phoneNumber, countryCode, countryName]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        {/* Description */}
        <Text style={styles.description}>
          Please confirm your country code and enter your phone number
        </Text>

        {/* Country selection */}
        <TouchableOpacity
          onPress={() => setShow(true)}
          style={styles.countryNameView}
        >
          <Text style={styles.countryFlag}>{countryFlag}</Text>
          <Text style={styles.countryName}>{countryName}</Text>
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
        <CountryPicker
          lang="en"
          show={show}
          pickerButtonOnPress={(item) => {
            setCountryCode(item.dial_code);
            setShow(false);
            setCountryName(item.name.en);
            setCountryFlag(item.flag);
          }}
          // when picker button press you will get the country object with dial code
        />
        <Divider style={styles.divider2} />
        {/* Consent */}
        <Text style={styles.consentText}>
          You must be{" "}
          <Text style={styles.specialText}>at least 16 years old</Text> to
          register. Learn how WhatsApp works with the{" "}
          <Text style={styles.specialText}>Facebook Companies</Text>.
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    marginTop: 20,
  },
  specialText: {
    color: "#3396FD",
  },
  divider2: {
    marginTop: 20,
  },
});
