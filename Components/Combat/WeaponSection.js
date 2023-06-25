import { View, StyleSheet, TextInput } from "react-native";
import Weapon from "./Weapon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WeaponSection = ({ abilityScores }) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState([]);
  const [weapons, setWeapons] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("weapons");

    if (jsonValue != null) {
      setWeapons(JSON.parse(jsonValue));
    }
  };

  const url = `https://www.dnd5eapi.co/api/equipment/${search
    .toLocaleLowerCase()
    .trimEnd()
    .replace(/ /g, "-")
    .replace(/'/g, "-")}/`;

  const confirm = () => {
    if (search === "") {
      return;
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));

    setSearch("");
    setIsSearching(false);
  };

  useEffect(() => {
    if (
      data.length === 0 ||
      data.error !== undefined ||
      data.equipment_category.index !== "weapon"
    ) {
      return;
    }

    let weapon_properties = data.properties;

    let hasFinesse = weapon_properties.find((e) => e.name === "Finesse")
      ? true
      : false;

    let arrayCopy = [...weapons];
    let newWeapon = {
      name: data.name,
      damage_dice: data.damage.damage_dice,
      weapon_range: data.weapon_range,
      equipment_category: data.equipment_category.index,
      finesse: hasFinesse,
    };
    arrayCopy.push(newWeapon);
    setWeapons(arrayCopy);
  }, [data]);

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
            abilityScores={abilityScores}
          />
        );
      })}
      {isSearching ? (
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
              onSubmitEditing={() => confirm()}
            ></TextInput>
          </View>
          <View style={styles.rightSearchContainer}>
            <Ionicons
              name="add-circle"
              style={styles.addIcon}
              size={40}
              color={"#A39E9E"}
              onPress={() => confirm()}
            ></Ionicons>
          </View>
        </View>
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
    marginBottom: 50,
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
