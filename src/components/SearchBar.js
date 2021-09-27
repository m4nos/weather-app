import React, { useRef, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button } from "react-native";

const SearchBar = (props) => {
  const [text, setText] = useState("");
  const textInputRef = useRef();

  const pressSearchHandler = (text) => {
    props.onPressSearchButton(text);
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="e.g. New York"
        onChangeText={(text) => setText(text)}
      />
      <Button title="Search" onPress={() => pressSearchHandler(text)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SearchBar;
