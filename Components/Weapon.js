import { View, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const Weapon = ({ weapon }) => {
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

  const [abilityScores, setAbilityScores] = useState(DATA);
  const [proficiencyBonus, setProficiencyBonus] = useState(0);

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
      <View style={styles.titleSection}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.title}>ATK bonus</Text>
        <Text style={styles.title}>Damage/Type</Text>
      </View>
      <View style={styles.inputSection}>
        <Text style={styles.input}>{weapon.name}</Text>
        <Text style={styles.input}>
          +{(abilityScores.dexterity - 10) / 2 + proficiencyBonus}
        </Text>
        <Text style={styles.input}>
          {weapon.damage_dice} + {(abilityScores.dexterity - 10) / 2}
        </Text>
      </View>
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
});
