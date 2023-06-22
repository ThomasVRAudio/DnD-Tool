import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const url = `https://www.dnd5eapi.co/api/spells/${search
    .toLocaleLowerCase()
    .replace(/ /g, "-")}/`;

  const confirm = () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  return (
    <LinearGradient
      colors={Colors.parchmentGradient}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Acid Arrow"
            onChangeText={updateSearch}
            value={search}
            onSubmitEditing={confirm}
          ></TextInput>
          <Ionicons
            name="search"
            style={styles.searchIcon}
            size={20}
            onPress={confirm}
          ></Ionicons>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.description}>
            {data.desc !== undefined &&
              String(data.desc).replace(/\./g, ".\n\n")}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    AlignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  title: {
    paddingTop: 20,
    fontSize: 60,
    justifyContent: "center",
    fontFamily: "DND-Title",
  },
  description: {
    textAlign: "justify",
    paddingTop: 20,
    fontSize: 18,
    fontFamily: "Serif-Light-Italic",
    fontWeight: 600,
    color: Colors.text,
  },
  input: {
    fontSize: 20,
    flex: 9,
    borderColor: "white",
    backgroundColor: "white",
  },
  textInputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  searchIcon: { flex: 1 },
  test: {
    fontSize: 40,
    fontFamily: "DND-Title",
  },
});
