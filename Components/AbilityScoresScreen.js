import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AbilityScore from "./AbilityScore";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AbilityScoresScreen = () => {
  const DATA = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };

  const MODIFIERS = {
    spellcastingAbilityModifier: 0,
    spellSaveDC: 0,
    proficiencyBonus: 0,
    spellAttack: 0,
    level: 0,
  };

  const [data, setData] = useState(DATA);
  const [modifiers, setModifiers] = useState(MODIFIERS);
  const [refresh, setRefresh] = useState(false);
  const [refreshModifiers, setRefreshModifiers] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("abilityScores");
    if (jsonValue != null) {
      setData(JSON.parse(jsonValue));
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("abilityScores", JSON.stringify(data));
    setAllModifiers();
  }, [refresh]);

  const setAllModifiers = () => {
    let newModifiers = modifiers;
    newModifiers.proficiencyBonus = 2;

    newModifiers.spellcastingAbilityModifier = Math.floor(
      (data.wisdom - 10) / 2 + newModifiers.proficiencyBonus
    );

    newModifiers.spellSaveDC = Math.floor(
      8 +
        newModifiers.spellcastingAbilityModifier +
        newModifiers.proficiencyBonus
    );

    newModifiers.spellAttack =
      newModifiers.spellcastingAbilityModifier + newModifiers.proficiencyBonus;

    setModifiers(newModifiers);
    setRefreshModifiers(!refreshModifiers);
  };

  const onEditData = ({ prop, value }) => {
    let dataCopy = data;
    dataCopy[prop] = value;
    setData(dataCopy);
    setRefresh(!refresh);
  };

  let proficientInPerception = true;

  return (
    <LinearGradient style={styles.container} colors={Colors.basicBackground}>
      <View style={styles.rowContainer}>
        <AbilityScore
          ability={"Strength"}
          value={data.strength}
          confirm={onEditData}
        />
        <AbilityScore
          ability={"Dexterity"}
          value={data.dexterity}
          confirm={onEditData}
        />
      </View>
      <View style={styles.rowContainer}>
        <AbilityScore
          ability={"Constitution"}
          value={data.constitution}
          confirm={onEditData}
        />
        <AbilityScore
          ability={"Intelligence"}
          value={data.intelligence}
          confirm={onEditData}
        />
      </View>
      <View style={styles.rowContainer}>
        <AbilityScore
          ability={"Wisdom"}
          value={data.wisdom}
          confirm={onEditData}
        />
        <AbilityScore
          ability={"Charisma"}
          value={data.charisma}
          confirm={onEditData}
        />
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Passive Wisdom (perception): </Text>
        <Text style={styles.passiveScore}>
          {Math.floor(
            10 + (data.wisdom - 10) / 2 + (proficientInPerception && 2)
          )}
        </Text>
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Proficiency Bonus: </Text>
        <Text style={styles.passiveScore}>+{modifiers.proficiencyBonus}</Text>
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Spell Attack: </Text>
        <Text style={styles.passiveScore}>+{modifiers.spellAttack}</Text>
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Spell Save DC: </Text>
        <Text style={styles.passiveScore}>{modifiers.spellSaveDC}</Text>
      </View>
    </LinearGradient>
  );
};

export default AbilityScoresScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
  },
  passiveContainer: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    alignItems: "center",
    margin: 3,
    width: "75%",
  },
  passiveTitle: {
    fontFamily: "Serif-Bold",
  },
  passiveScore: {
    fontFamily: "Serif-Light",
    fontSize: 15,
  },
});
