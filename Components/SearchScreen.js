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
import SpellData from "./SpellData";

const SearchScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const url = `https://www.dnd5eapi.co/api/spells/${search
    .toLocaleLowerCase()
    .trimEnd()
    .replace(/ /g, "-")
    .replace(/'/g, "-")}/`;

  const confirm = () => {
    let localData = SpellData.filter((obj) => {
      return (
        obj.index ===
        search
          .toLocaleLowerCase()
          .trimEnd()
          .replace(/ /g, "-")
          .replace(/'/g, "-")
      );
    });
    if (localData.length !== 0) {
      setData(localData[0]);
      return;
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  };

  return (
    <LinearGradient colors={Colors.parchmentGradient} style={styles.container}>
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
          <Text style={styles.level}>
            {data.desc && "Level " + data.level + " " + data.school.name}
          </Text>

          <View style={styles.components}>
            <Text style={styles.componentsTitle}>
              {data.desc && "Casting Time: "}
            </Text>
            <Text style={styles.components}>{data.casting_time}</Text>
          </View>
          <View style={styles.components}>
            <Text style={styles.componentsTitle}>{data.desc && "Range: "}</Text>
            <Text style={styles.components}>{data.range}</Text>
          </View>
          <View style={styles.components}>
            <Text style={styles.componentsTitle}>
              {data.desc && "Components: "}
            </Text>
            <Text style={styles.components}>{data.components}</Text>
          </View>
          <View style={styles.components}>
            <Text style={styles.componentsTitle}>
              {data.desc && "Duration: "}
            </Text>
            <Text style={styles.components}>{data.duration}</Text>
          </View>
          <Text style={styles.description}>
            {data.desc !== undefined &&
              String(data.desc).replace(/\./g, ".\n\n")}
          </Text>
          <Text style={styles.mediumTitle}>
            {data.higher_level !== undefined &&
              data.higher_level.length !== 0 &&
              "Higher Level: "}
          </Text>
          <Text style={styles.description}>{data.higher_level}</Text>
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
    fontSize: 15,
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
  mediumTitle: {
    fontSize: 40,
    fontFamily: "DND-Title",
  },
  components: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: "Serif-Light",
    fontSize: 15,
    paddingBottom: 2,
  },
  componentsTitle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily: "Serif-Bold",
    fontSize: 15,
    paddingBottom: 2,
  },
  level: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 18,
    color: "#03030373",
  },
});
