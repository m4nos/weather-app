import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";

import { APIkey } from "../../APIkey";

const DetailsScreen = ({ route, navigation }) => {
  const {
    id,
    cityName,
    cityCountry,
    weather,
    temp,
    icon,
    wind,
    humidity,
    timestamp,
  } = route.params;
  console.log(timestamp);
  const date = new Date(timestamp);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Weather Forecast",
      headerRight: () => (
        <Button
          onPress={() =>
            navigation.navigate("Home", {
              cityId: id,
              cityName,
              cityCountry,
              deleteItem: true,
            })
          }
          title="Delete"
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast/daily?id=${id}&cnt=4&appid=${APIkey}`
    )
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        // if (data.cod === 401)
        //   alert("This API key does not allow 5 day forecast!");
      });
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.cityNameStyles}>
        {cityName}, {cityCountry}
        {"\n"}
        <Text style={styles.date}>
          {date.getHours()}:{date.getMinutes()}, {weather}
        </Text>
      </Text>
      <Text style={styles.temp}>
        {temp} °C
        <Image
          style={styles.icon}
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        />
      </Text>
      <Text>
        wind: {wind} km/h , humidity: {humidity}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
  },
  cityNameStyles: {
    color: "black",
    fontSize: 40,
    padding: 10,
  },
  date: {
    color: "gray",
    fontSize: 20,
  },
  temp: {
    fontSize: 40,
    padding: 10
  },
  icon: {
    width: 100,
    height: 100,
    marginLeft: 0
  },
});

export default DetailsScreen;