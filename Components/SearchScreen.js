import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import SpellData from "./Data/spellData";
import SearchItem from "./Combat/SearchItem";
import { Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [item, setItem] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const url = `https://www.dnd5eapi.co/api/spells/`;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (!data.results || !search) return;

    let term = search
      .toLocaleLowerCase()
      .trimEnd()
      .replace(/ /g, "-")
      .replace(/'/g, "-");

    let result = SpellData.filter(({ index }) =>
      String(index).startsWith(term)
    );

    if (result.length === 0) {
      result = data.results.filter(({ index }) =>
        String(index).startsWith(term)
      );
    }
    let list = [];

    if (!result) return;

    for (let index = 0; index < result.length; index++) {
      if (index === 3) break;

      const element = result[index];
      list.push(element);
    }

    setSearchList(list);
  }, [search]);

  const confirm = (name) => {
    setSearchList([]);
    Keyboard.dismiss();

    if (search === "") {
      return;
    }

    const localResult = SpellData.find(({ index }) => index === name);
    if (localResult) {
      setItem(localResult);
      setSearch("");
      return;
    }

    let itemUrl =
      url +
      String(
        name.toLocaleLowerCase().trimEnd().replace(/ /g, "-").replace(/'/g, "-")
      );

    fetch(itemUrl)
      .then((resp) => resp.json())
      .then((json) => setItem(json))
      .catch((error) => console.error(error));

    setSearch("");
  };

  return (
    <LinearGradient colors={Colors.basicBackground} style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Acid Arrow"
            onChangeText={updateSearch}
            value={search}
            onSubmitEditing={() => confirm(search)}
          ></TextInput>
          <Ionicons
            name="search"
            style={styles.searchIcon}
            size={20}
            onPress={() => confirm(search)}
          ></Ionicons>
        </View>
        {searchList.map((item, index) => {
          return <SearchItem item={item} key={index} select={confirm} />;
        })}

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.level}>
            {item.desc && "Level " + item.level + " " + item.school.name}
          </Text>

          <View style={styles.components}>
            <Text style={styles.componentsTitle}>
              {item.desc && "Casting Time: "}
            </Text>
            <Text style={styles.components}>{item.casting_time}</Text>
          </View>
          <View style={styles.components}>
            <Text style={styles.componentsTitle}>{item.desc && "Range: "}</Text>
            <Text style={styles.components}>{item.range}</Text>
          </View>
          <View style={styles.components}>
            <Text style={styles.componentsTitle}>
              {item.desc && "Components: "}
            </Text>
            <Text style={styles.components}>{item.components}</Text>
          </View>
          <View style={styles.components}>
            <Text style={styles.componentsTitle}>
              {item.desc && "Duration: "}
            </Text>
            <Text style={styles.components}>{item.duration}</Text>
          </View>
          <Text style={styles.description}>
            {item.desc !== undefined &&
              String(item.desc).replace(/\./g, ".\n\n")}
          </Text>
          <Text style={styles.mediumTitle}>
            {item.higher_level !== undefined &&
              item.higher_level.length !== 0 &&
              "Higher Level: "}
          </Text>
          <Text style={styles.description}>{item.higher_level}</Text>
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
    padding: 12,
    paddingTop: 20,
  },
  title: {
    paddingTop: 20,
    fontSize: 60,
    justifyContent: "center",
    fontFamily: "DND-Title",
    color: Colors.contrastText
  },
  description: {
    textAlign: "justify",
    paddingTop: 20,
    fontSize: 15,
    fontFamily: "Serif-Light-Italic",
    fontWeight: 600,
    color: Colors.contrastText
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
  mediumTitle: {
    fontSize: 40,
    fontFamily: "DND-Title",
    color: Colors.contrastText
  },
  components: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: "Serif-Light",
    fontSize: 15,
    paddingBottom: 2,
    color: Colors.contrastText
  },
  componentsTitle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: "Serif-Bold",
    fontSize: 15,
    paddingBottom: 2,
    color: Colors.contrastText
  },
  level: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 18,
    color: Colors.contrastTextGrayed
  },
});
