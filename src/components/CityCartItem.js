import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { APIkey } from "../../APIkey";

const CityCartItem = (props) => {
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState("");
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState("");
  const [humidity, setHumidity] = useState("");
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${props.cityId}&appid=${APIkey}`
    )
      .then((result) => result.json())
      .then((data) => {
        setWeather(data.weather[0].main);
        setTemp(data.main.temp.toFixed() - 273);
        setIcon(data.weather[0].icon);
        setWind(data.wind.speed.toFixed());
        setHumidity(data.main.humidity.toFixed());
        setTimestamp(data.dt);
      });
  }, []);

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Details", {
          id: props.cityId,
          cityName: props.cityName,
          cityCountry: props.cityCountry,
          weather,
          temp,
          icon,
          wind,
          humidity,
          timestamp
        })
      }
    >
      <View style={styles.item}>
        <Image
          style={styles.icon}
          source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        />
        <Text style={styles.cityName}>
          {props.cityName}, {props.cityCountry}
          {"\n"}
          <Text style={styles.weather}>{weather}</Text>
        </Text>

        <Text style={styles.temp}>{temp}°C</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    width: 100,
    height: 100,
  },
  cityName: {
    paddingTop: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  weather: {
    fontSize: 16,
    color: "#808080",
  },
  temp: {
    padding: 8,
    marginLeft: "auto",
    fontSize: 25,
  },
});

export default CityCartItem;
