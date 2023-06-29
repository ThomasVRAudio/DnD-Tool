import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import Spell from "./Spell";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpellData from "../Data/spellData";

const SpellSlotsScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("spells");

    if (jsonValue != null) {
      setSpells(JSON.parse(jsonValue));
    }
  };

  const updateSearch = (search) => {
    setSearch(search);
  };

  const url = `https://www.dnd5eapi.co/api/spells/${search
    .toLocaleLowerCase()
    .trimEnd()
    .replace(/ /g, "-")
    .replace(/'/g, "-")}/`;

  const confirm = () => {
    if (search === "") {
      return;
    }

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
      setSearch("");
      return;
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));

    setSearch("");
  };

  useEffect(() => {
    if (data.length !== 0 && data.error === undefined) {
      let descText = "";

      data.desc.forEach((element) => {
        descText += element;
      });

      let newSpell = {
        name: data.name,
        desc: descText.replace(/\./g, ".\n\n"),
        level: data.level,
        components: data.components,
        range: data.range,
        higher_level: data.higher_level,
        duration: data.duration,
        casting_time: data.casting_time,
      };
      let spellArray = [...spells];
      spellArray.push(newSpell);

      spellArray
        .sort((a, b) => (a.level === "Trait" ? -1 : a.level < b.level ? -1 : 1))
        .sort();

      setSpells(spellArray);
    }
  }, [data]);

  const onPressDelete = (index) => {
    let newSpellsList = [...spells];
    newSpellsList.splice(index, 1);

    setSpells(newSpellsList);
  };

  useEffect(() => {
    AsyncStorage.setItem("spells", JSON.stringify(spells));
  }, [spells]);

  return (
    <LinearGradient colors={Colors.parchmentGradient} style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          style={styles.spellsContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.containerTitle}>Traits</Text>
          {spells.map((x, index) => {
            if (x.level === "Trait") {
              return (
                <Spell
                  data={spells[index]}
                  key={index}
                  index={index}
                  onPressDelete={onPressDelete}
                />
              );
            }
          })}
          <Text style={styles.containerTitle}>Cantrips</Text>
          {spells.map((x, index) => {
            if (x.level === 0) {
              return (
                <Spell
                  data={spells[index]}
                  key={index}
                  index={index}
                  onPressDelete={onPressDelete}
                />
              );
            }
          })}
          <Text style={styles.containerTitle}>Levels</Text>
          {spells.map((x, index) => {
            if (x.level >= 1) {
              return (
                <Spell
                  data={spells[index]}
                  key={index}
                  index={index}
                  onPressDelete={onPressDelete}
                />
              );
            }
          })}
        </ScrollView>
        <View style={styles.searchContainer}>
          <View style={styles.leftSearchContainer}>
            <Ionicons
              name="search"
              style={styles.searchIcon}
              size={20}
              color={"#A39E9E"}
              onPress={confirm}
            ></Ionicons>
            <TextInput
              style={styles.input}
              placeholder="Acid Arrow"
              placeholderTextColor={"#FFFFFF80"}
              onChangeText={updateSearch}
              value={search}
              onSubmitEditing={confirm}
            ></TextInput>
          </View>
          <View style={styles.rightSearchContainer}>
            <Ionicons
              name="add-circle"
              style={styles.addIcon}
              size={40}
              color={"#A39E9E"}
              onPress={confirm}
            ></Ionicons>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SpellSlotsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    AlignItems: "center",
    padding: 10,
    paddingTop: 20,
  },
  createNewButton: {
    textAlign: "right",
  },
  searchContainer: {
    flexDirection: "row",
    borderRadius: 35,
    width: "95%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#2C2929",
    padding: 5,
    marginTop: 10,
  },
  leftSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSearchContainer: {
    flex: 1,
  },
  searchIcon: {},
  addIcon: {
    textAlign: "right",
  },
  input: {
    color: "#ffffff",
    fontSize: 20,
    paddingLeft: 10,
    paddingHorizontal: 90,
  },
  spellsContainer: { flex: 8 },
  containerTitle: {
    fontFamily: "Serif-Light-Italic",
    color: "#00000091",
    fontSize: 18,
    width: "95%",
    textAlign: "right",
    paddingTop: 10,
  },
});
