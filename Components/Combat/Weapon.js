import { View, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import { useEffect, useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { calculateProficiencyBonus } from "../../constants/Functions";

const Weapon = ({
  weapon,
  setCustomModifier,
  index,
  onDelete,
  characterData,
}) => {
  const selectAbility = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];

  const [proficiencyBonus, setProficiencyBonus] = useState(0);
  const [modifier, setModifier] = useState(selectAbility);
  const [selectedModifier, setSelectedModifier] = useState("none");
  const [tapOpen, setTapOpen] = useState(false);

  useEffect(() => {
    if (weapon.custom_modifier) {
      setModifierSelected(weapon.modifier);
      return;
    }

    if (weapon.weapon_range === "Melee") {
      if (weapon.finesse) {
        parseInt(characterData.ability_scores.dexterity) >
        parseInt(characterData.ability_scores.strength)
          ? setModifierSelected("dexterity")
          : setModifierSelected("strength");
      } else {
        setModifierSelected("strength");
      }
    } else {
      setModifierSelected("dexterity");
    }
  }, [characterData, selectedModifier]);

  const setModifierSelected = (name) => {
    setModifier(characterData.ability_scores[name]);
    setSelectedModifier(String(name).charAt(0).toUpperCase() + name.slice(1));
  };

  useEffect(() => {
    setProficiencyBonus(
      calculateProficiencyBonus(characterData.character_info.level)
    );
  }, [characterData]);

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
          <View style={styles.delete}>
            <TouchableOpacity onPress={() => onDelete(index)}>
              <Ionicons
                name="trash-outline"
                size={20}
              ></Ionicons>
            </TouchableOpacity>
          </View>
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
    backgroundColor: Colors.buttonTwo,
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
    alignItems: "flex-end",
    paddingTop: 10,
  },
});
