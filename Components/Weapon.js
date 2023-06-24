import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Weapon = ({ weapon, setCustomModifier, index, onDelete }) => {
  const DATA = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
    level: 0,
    speed: 0,
    name: "Name",
    race: "Race",
    class: "class",
    background: "Background",
    alignment: "alignment",
    exp: 0,
    perceptionProficient: false,
  };

  const selectAbility = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];

  const [abilityScores, setAbilityScores] = useState(DATA);
  const [proficiencyBonus, setProficiencyBonus] = useState(0);
  const [modifier, setModifier] = useState(selectAbility);
  const [selectedModifier, setSelectedModifier] = useState("none");
  const [tapOpen, setTapOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("abilityScores");

    if (jsonValue != null) {
      setAbilityScores(JSON.parse(jsonValue));
    }
  };

  useEffect(() => {
    if (weapon.custom_modifier) {
      setModifierSelected(weapon.modifier);
      return;
    }

    if (weapon.weapon_range === "Melee") {
      if (weapon.finesse) {
        parseInt(abilityScores.dexterity) > parseInt(abilityScores.strength)
          ? setModifierSelected("dexterity")
          : setModifierSelected("strength");
      } else {
        setModifierSelected("strength");
      }
    } else {
      setModifierSelected("dexterity");
    }
  }, [abilityScores, selectedModifier]);

  const setModifierSelected = (name) => {
    setModifier(abilityScores[name]);
    setSelectedModifier(String(name).charAt(0).toUpperCase() + name.slice(1));
  };

  useEffect(() => {
    switch (true) {
      case abilityScores.level <= 4:
        setProficiencyBonus(2);
        break;
      case abilityScores.level >= 5 && abilityScores.level <= 8:
        setProficiencyBonus(3);
        break;
      case abilityScores.level >= 9 && abilityScores.level <= 12:
        setProficiencyBonus(4);
        break;
      case abilityScores.level >= 13 && abilityScores.level <= 16:
        setProficiencyBonus(5);
        break;
      case abilityScores.level >= 17:
        setProficiencyBonus(6);
        break;
    }
  }, [abilityScores]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setTapOpen(!tapOpen)}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Name</Text>
          <Text style={styles.title}>ATK bonus</Text>
          <Text style={styles.title}>Damage/Type</Text>
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.input}>{weapon.name}</Text>
          <Text style={styles.input}>
            +{Math.floor((modifier - 10) / 2 + proficiencyBonus)}
          </Text>
          <Text style={styles.input}>
            {weapon.damage_dice} {modifier >= 10 && "+"}{" "}
            {Math.floor((modifier - 10) / 2)}
          </Text>
        </View>
      </TouchableOpacity>
      {tapOpen && (
        <View>
          <View style={styles.modifier_container}>
            <Text style={styles.ability_modifier}>Ability Modifier: </Text>
            <SelectDropdown
              renderDropdownIcon={() => <Ionicons name="caret-down"></Ionicons>}
              buttonStyle={styles.drop_down}
              buttonTextStyle={styles.drop_down_text}
              dropdownStyle={styles.drop_down_open}
              data={selectAbility}
              defaultValue={selectedModifier}
              showsVerticalScrollIndicator={false}
              onSelect={(selectedItem) => {
                setCustomModifier({
                  index: index,
                  modifier: String(selectedItem).toLowerCase(),
                });
                setModifierSelected(selectedItem);
              }}
            />
          </View>
          <TouchableOpacity onPress={() => onDelete(index)}>
            <Ionicons
              name="trash-outline"
              size={20}
              style={styles.delete}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Weapon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 5,
    width: "80%",
    alignSelf: "center",
    padding: 5,
    elevation: 5,
    margin: 5,
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Serif-Bold",
    flex: 1,
    fontSize: 13,
  },
  inputSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontFamily: "Serif-Light",
    fontSize: 15,
    textAlign: "left",
    flex: 1,
  },
  ability_modifier: {
    fontFamily: "Serif-Light-Italic",
  },
  drop_down: {
    backgroundColor: Colors.button,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    height: "70%",
    elevation: 5,
  },
  drop_down_text: {
    fontFamily: "Serif-Light",
    paddingVertical: 0,
    fontSize: 14,
  },
  modifier_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  drop_down_open: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
  },
  delete: {
    textAlign: "right",
    paddingTop: 10,
  },
});
