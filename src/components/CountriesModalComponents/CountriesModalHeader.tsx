import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { SearchBar } from "@rneui/base";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigatorTypes } from "../../types/navigation/StackNavigatorTypes";
import { useNavigation } from "@react-navigation/native";
import { HeaderTypes } from "../../types/CountriesModalComponentsTypes/HeaderTypes";

const CountriesModalHeader = ({ searchInput, setSearchInput }: HeaderTypes) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackNavigatorTypes>>();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* header title */}
        <Text style={styles.headerTitle}>Country</Text>
        {/* right accessory */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <SearchBar
        platform="ios"
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.searchContainer}
        value={searchInput}
        onChangeText={(text) => setSearchInput(text)}
      />
    </View>
  );
};

export default CountriesModalHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative", // Add relative positioning to the headerContainer
    paddingTop: 13,
    paddingBottom: 13,
  },
  headerTitle: {
    flex: 1, // Take up remaining space
    textAlign: "center", // Align text to center horizontally
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    position: "absolute", // Position the cancelButton absolutely
    right: 10, // Adjust the right position as needed
    top: 13,
    paddingRight: 3,
  },
  text: {
    fontSize: 17,
    color: "#3396FD",
  },
  searchContainer: {
    backgroundColor: "whitesmoke",
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  inputContainer: {
    height: 25,
    backgroundColor: "#E4E4E4",
  },
});
