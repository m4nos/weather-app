import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import SearchBar from "../components/SearchBar";

import { APIkey } from "../../APIkey";

const SearchScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${APIkey}`
      )
        .then((result) => result.json())
        .then((data) => {
          if (data.cod === '404') {
            alert('City not found')
            return navigation.navigate("Home")
          }
          const cityId = data.id.toString();
          const cityName = data.name;
          const cityCountry = data.sys.country;
          navigation.navigate("Home", {
            cityId,
            cityName,
            cityCountry,
            addItem: true,
          });
        });
    } catch (err) {
      alert(err);
    }
  }, [searchTerm]);

  return (
    <View>
      <SearchBar onPressSearchButton={setSearchTerm} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
