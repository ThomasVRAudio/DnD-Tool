import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import Spell from "./Spell";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SpellData from "../Data/spellData";
import SearchItem from "../Combat/SearchItem";
import { TouchableOpacity } from "react-native-gesture-handler";

const SpellSlotsScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [spells, setSpells] = useState([]);

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
    const jsonValue = await AsyncStorage.getItem("spells");

    if (jsonValue != null) {
      setSpells(JSON.parse(jsonValue));
    }

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

  useEffect(() => {
    if (item.length !== 0 && item.error === undefined) {
      let descText = "";

      item.desc.forEach((element) => {
        descText += element;
      });

      let newSpell = {
        name: item.name,
        desc: descText.replace(/\./g, ".\n\n"),
        level: item.level,
        components: item.components,
        range: item.range,
        higher_level: item.higher_level,
        duration: item.duration,
        casting_time: item.casting_time,
      };
      let spellArray = [...spells];
      spellArray.push(newSpell);

      spellArray
        .sort((a, b) => (a.level === "Trait" ? -1 : a.level < b.level ? -1 : 1))
        .sort();

      setSpells(spellArray);
      setSearchList([]);
    }
  }, [item]);

  const onPressDelete = (index) => {
    let newSpellsList = [...spells];
    newSpellsList.splice(index, 1);

    setSpells(newSpellsList);
  };

  useEffect(() => {
    AsyncStorage.setItem("spells", JSON.stringify(spells));
  }, [spells]);

  return (
    <LinearGradient colors={Colors.basicBackground} style={styles.container}>
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
              onPress={confirm}
            ></Ionicons>
            <TextInput
              style={styles.input}
              placeholder="Acid Arrow"
              onChangeText={updateSearch}
              value={search}
              onSubmitEditing={() => confirm(search)}
            ></TextInput>
          </View>
          <View style={styles.rightSearchContainer}>
            <TouchableOpacity onPress={() => confirm(search)}>
              <Ionicons
                name="add-circle"
                style={styles.addIcon}
                size={40}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
        {searchList.map((item, index) => {
          return <SearchItem item={item} key={index} select={confirm} />;
        })}
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
    padding: 5,
    marginTop: 10,
    borderColor: "white",
    backgroundColor: "white",
    elevation: 5
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

    fontSize: 20,
    paddingLeft: 10,
    paddingHorizontal: 90,
  },
  spellsContainer: { flex: 8 },
  containerTitle: {
    fontFamily: "Serif-Light-Italic",
    color: Colors.text,
    fontSize: 18,
    width: "95%",
    textAlign: "right",
    paddingTop: 10,
  },
});
