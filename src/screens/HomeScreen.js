import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  StatusBar,
  Button,
} from "react-native";

import CityCartItem from "../components/CityCartItem";

let dummyData = [
  {
    cityId: "264371",
    cityName: "Athens",
    cityCountry: "GR",
  },
  {
    cityId: "3553478",
    cityName: "Havana",
    cityCountry: "CU",
  },
  {
    cityId: "5368381",
    cityName: "Los Angeles",
    cityCountry: "US",
  },
  {
    cityId: "1850147",
    cityName: "Tokyo",
    cityCountry: "JP",
  },
];

const HomeScreen = ({ route, navigation }) => {
  if (route.params) {
    if (
      route.params.addItem &&
      dummyData.find((el) => el.cityId === route.params.cityId)
    )
      alert("City already exists");
    if (
      route.params.addItem &&
      !dummyData.find((el) => el.cityId === route.params.cityId)
    )
      dummyData.push(route.params);
    if (route.params.deleteItem)
      dummyData = dummyData.filter((el) => el.cityId !== route.params.cityId);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Weather Forecast",
      headerRight: () => (
        <Button onPress={() => navigation.navigate("Search")} title="Search" />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyData}
        renderItem={(itemData) => (
          <CityCartItem
            cityId={itemData.item.cityId}
            cityName={itemData.item.cityName}
            cityCountry={itemData.item.cityCountry}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.cityId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  title: {
    fontSize: 90,
  },
});

export default HomeScreen;
