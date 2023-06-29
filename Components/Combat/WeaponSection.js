import { View, StyleSheet, TextInput } from "react-native";
import Weapon from "./Weapon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchItem from "./SearchItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native";
import { Keyboard } from "react-native";

const WeaponSection = ({ characterData }) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState([]);
  const [weapons, setWeapons] = useState([]);

  const [item, setItem] = useState([]);
  const [searchList, setSearchList] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    getData();
  }, []);

  const url = `https://www.dnd5eapi.co/api/equipment/`;

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("weapons");

    if (jsonValue != null) {
      setWeapons(JSON.parse(jsonValue));
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

    let result = data.results.filter(({ index }) =>
      String(index).startsWith(term)
    );

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
    setIsSearching(false);
    setSearchList([]);

    if (search === "") {
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
    if (
      item.length === 0 ||
      item.error !== undefined ||
      item.equipment_category.index !== "weapon"
    ) {
      return;
    }

    let weapon_properties = item.properties;

    let hasFinesse = weapon_properties.find((e) => e.name === "Finesse")
      ? true
      : false;

    let arrayCopy = [...weapons];
    let newWeapon = {
      name: item.name,
      damage_dice: item.damage.damage_dice,
      weapon_range: item.weapon_range,
      equipment_category: item.equipment_category.index,
      finesse: hasFinesse,
    };
    arrayCopy.push(newWeapon);
    setWeapons(arrayCopy);
    setSearchList([]);
  }, [item]);

  useEffect(() => {
    AsyncStorage.setItem("weapons", JSON.stringify(weapons));
  }, [weapons]);

  const setCustomModifier = ({ index, modifier }) => {
    let arrayCopy = [...weapons];
    arrayCopy[index].modifier = modifier;
    arrayCopy[index].custom_modifier = true;
    setWeapons(arrayCopy);
  };

  const onPressDelete = (index) => {
    let newWeaponsList = [...weapons];
    newWeaponsList.splice(index, 1);

    setWeapons(newWeaponsList);
  };

  return (
    <>
      {weapons.map((weapon, index) => {
        return (
          <Weapon
            key={index}
            weapon={weapon}
            setCustomModifier={setCustomModifier}
            index={index}
            onDelete={onPressDelete}
            characterData={characterData}
          />
        );
      })}
      {isSearching ? (
        <>
          <View style={styles.searchContainer}>
            <View style={styles.leftSearchContainer}>
              <Ionicons
                name="search"
                style={styles.searchIcon}
                size={20}
                color={"#A39E9E"}
              ></Ionicons>
              <TextInput
                style={styles.input}
                placeholder="Dagger"
                placeholderTextColor={"#FFFFFF80"}
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
                  color={"#A39E9E"}
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <View style={searchList.length === 0 && { padding: 50 }}></View>
          {searchList.map((item, index) => {
            return <SearchItem item={item} key={index} select={confirm} />;
          })}
        </>
      ) : (
        <View>
          <Ionicons
            name="add-circle"
            style={styles.addIcon}
            size={40}
            color={"#00000093"}
            width="90%"
            onPress={() => setIsSearching(true)}
          ></Ionicons>
        </View>
      )}
    </>
  );
};

export default WeaponSection;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    borderRadius: 35,
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
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
});
