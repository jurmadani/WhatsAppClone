import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { countries } from "../json/countries";
import RenderItem from "../components/CountriesModalComponents/RenderItem";

const CountriesModal = ({ navigation, route }: any) => {
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    navigation.setParams({ searchInput, setSearchInput });
  }, [searchInput]);
  return (
    <View style={styles.container}>
      <FlatList
        data={countries}
        //@ts-expect-error
        renderItem={({ item, index }) => {
          if (searchInput === "")
            return (
              <RenderItem
                searchInput={searchInput}
                item={item}
                index={index}
                setCountry={route?.params?.setCountry}
                setCountryCode={route?.params?.setCountryCode}
              />
            );
          else if (
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.name.toLowerCase().includes(searchInput.toLowerCase())
          )
            return (
              <RenderItem
                searchInput={searchInput}
                item={item}
                index={index}
                setCountry={route?.params?.setCountry}
                setCountryCode={route?.params?.setCountryCode}
              />
            );
        }}
      />
    </View>
  );
};

export default CountriesModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
