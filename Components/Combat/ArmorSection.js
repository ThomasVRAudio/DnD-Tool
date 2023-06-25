import { View, StyleSheet, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Armor from "./Armor";

const ArmorSection = ({ abilityScores, setArmorClass }) => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState([]);
  const [armor, setArmor] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("armor");

    if (jsonValue != null) {
      setArmor(JSON.parse(jsonValue));
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
      data.equipment_category.index !== "armor"
    ) {
      return;
    }

    let arrayCopy = [...armor];
    let newArmor = {
      name: data.name,
      equipment_category: data.equipment_category.index,
      armor_category: data.armor_category,
      armor_class_base: data.armor_class.base,
      armor_class_dex_bonus: data.armor_class.dex_bonus,
      max_bonus: data.max_bonus,
    };
    arrayCopy.push(newArmor);
    setArmor(arrayCopy);
  }, [data]);

  useEffect(() => {
    AsyncStorage.setItem("armor", JSON.stringify(armor));

    let AC = 0;
    let wearsArmor = false;

    if (armor.length === 0) {
      AC += 10;
    }

    armor.map((e) => {
      AC += e.armor_class_base;

      if (e.armor_class_dex_bonus) {
        let max_bonus = e.max_bonus ? e.max_bonus : Number.POSITIVE_INFINITY;
        let dex_bonus = Math.floor((abilityScores.dexterity - 10) / 2);
        AC += dex_bonus > max_bonus ? max_bonus : dex_bonus;
      }

      if (
        e.armor_category === "Heavy" ||
        e.armor_category === "Medium" ||
        e.armor_category === "Light"
      ) {
        wearsArmor = true;
      }
    });

    if (wearsArmor === false) {
      AC += 10;
    }
    setArmorClass(AC);
  }, [armor]);

  const onPressDelete = (index) => {
    let newArmorList = [...armor];
    newArmorList.splice(index, 1);

    setArmor(newArmorList);
  };

  return (
    <>
      {armor.map((armor, index) => {
        return (
          <Armor
            key={index}
            armor={armor}
            index={index}
            onDelete={onPressDelete}
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
              placeholder="Chain mail"
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

export default ArmorSection;

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
