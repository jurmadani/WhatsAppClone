import {
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { windowHeight, windowWidth } from "../constants/Dimensions";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../types/navigation/StackNavigatorTypes";

const OnboardingScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <SafeAreaView style={styles.container}>
      {/* Image */}
      <Image
        source={require("../../assets/images/pattern-illustration.png")}
        style={styles.image}
      />
      {/* Title */}
      <Text style={styles.title}>Welcome to WhatsApp-Clone</Text>
      {/* Description */}
      <Text style={styles.description}>
        Read our <Text style={styles.link}>Privacy Policy.</Text> Tap "Agree &
        Continue" to accept the{" "}
        <Text style={styles.link}>Terms of Service</Text>
      </Text>
      {/* Button */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.buttonText}>Agree & Continue</Text>
      </TouchableOpacity>
      {/* Footer logo */}
      <Image
        source={require("../../assets/icons/Fake-meta.png")}
        style={styles.footerImage}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: "center",
    marginTop: 35,
  },
  title: {
    fontWeight: "bold",
    fontSize: 23,
    textAlign: "center",
    marginTop: 40,
  },
  description: {
    marginTop: 15,
    fontSize: 12.5,
    textAlign: "center",
    width: windowWidth - 50,
    alignSelf: "center",
  },
  link: {
    color: "#3396FD",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#3396FD",
    alignSelf: "center",
    marginTop: 45,
  },
  footerImage: {
    height: 50,
    width: 88,
    alignSelf: "center",
    top: windowHeight / 4.2,
  },
});
