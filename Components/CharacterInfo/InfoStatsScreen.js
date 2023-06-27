import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AbilityScore from "./AbilityScore";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CharacterInfo from "./CharacterInfo";
import Ionicons from "@expo/vector-icons/Ionicons";

const InfoStatsScreen = ({
  characterData,
  setCharacterData,
  refresh,
  setRefresh,
}) => {
  const MODIFIERS = {
    spellcastingAbilityModifier: 0,
    spellSaveDC: 0,
    proficiencyBonus: 0,
    spellAttack: 0,
  };

  const [modifiers, setModifiers] = useState(MODIFIERS);
  const [refreshModifiers, setRefreshModifiers] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setCharacterData(characterData);
  };

  useEffect(() => {
    AsyncStorage.setItem("characterData", JSON.stringify(characterData));
    setCharacterData(characterData);
    setAllModifiers();
  }, [refresh]);

  const setAllModifiers = () => {
    let newModifiers = modifiers;

    switch (true) {
      case characterData.character_info.level <= 4:
        newModifiers.proficiencyBonus = 2;
        break;
      case characterData.character_info.level >= 5 &&
        characterData.character_info.level <= 8:
        newModifiers.proficiencyBonus = 3;
        break;
      case characterData.character_info.level >= 9 &&
        characterData.character_info.level <= 12:
        newModifiers.proficiencyBonus = 4;
        break;
      case characterData.character_info.level >= 13 &&
        characterData.character_info.level <= 16:
        newModifiers.proficiencyBonus = 5;
        break;
      case characterData.character_info.level >= 17:
        newModifiers.proficiencyBonus = 6;
        break;
    }

    newModifiers.spellcastingAbilityModifier = Math.floor(
      (characterData.ability_scores.wisdom - 10) / 2 +
        newModifiers.proficiencyBonus
    );

    newModifiers.spellAttack =
      newModifiers.spellcastingAbilityModifier + newModifiers.proficiencyBonus;

    newModifiers.spellSaveDC = Math.floor(8 + newModifiers.spellAttack);

    setModifiers(newModifiers);
    setRefreshModifiers(!refreshModifiers);
  };

  const onEditData = ({ prop, section, value }) => {
    let dataCopy = characterData;
    dataCopy[section][prop] = value;
    setCharacterData(dataCopy);
    setRefresh(!refresh);
  };

  return (
    <LinearGradient style={styles.container} colors={Colors.basicBackground}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.scroll}>
          <CharacterInfo data={characterData} confirm={onEditData} />
          <View style={styles.rowContainer}>
            <AbilityScore
              ability={"Strength"}
              value={characterData.ability_scores.strength}
              confirm={onEditData}
            />
            <AbilityScore
              ability={"Dexterity"}
              value={characterData.ability_scores.dexterity}
              confirm={onEditData}
            />
          </View>
          <View style={styles.rowContainer}>
            <AbilityScore
              ability={"Constitution"}
              value={characterData.ability_scores.constitution}
              confirm={onEditData}
            />
            <AbilityScore
              ability={"Intelligence"}
              value={characterData.ability_scores.intelligence}
              confirm={onEditData}
            />
          </View>
          <View style={styles.rowContainer}>
            <AbilityScore
              ability={"Wisdom"}
              value={characterData.ability_scores.wisdom}
              confirm={onEditData}
            />
            <AbilityScore
              ability={"Charisma"}
              value={characterData.ability_scores.charisma}
              confirm={onEditData}
            />
          </View>
          <View style={styles.passiveContainerWithCheck}>
            <View style={styles.passiveContainerWithCheckTopPart}>
              <Text style={styles.passiveTitle}>
                Passive Wisdom (perception):{" "}
              </Text>
              <Text style={styles.passiveScore}>
                {Math.floor(
                  10 +
                    (characterData.ability_scores.wisdom - 10) / 2 +
                    (characterData.skills.perception &&
                      modifiers.proficiencyBonus)
                )}
              </Text>
            </View>
            <View style={styles.checkProficiency}>
              <Text style={styles.proficient}>Proficient: </Text>
              <Ionicons
                name={
                  characterData.skills.perception
                    ? "checkmark-circle"
                    : "md-close-circle"
                }
                size={18}
                color={"#000000AD"}
                onPress={() =>
                  onEditData({
                    prop: "perception",
                    section: "skills",
                    value: !characterData.skills.perception,
                  })
                }
              />
            </View>
          </View>
          <View style={styles.passiveContainer}>
            <Text style={styles.passiveTitle}>Proficiency Bonus: </Text>
            <Text style={styles.passiveScore}>
              +{modifiers.proficiencyBonus}
            </Text>
          </View>
          <View style={styles.passiveContainer}>
            <Text style={styles.passiveTitle}>Spell Attack: </Text>
            <Text style={styles.passiveScore}>+{modifiers.spellAttack}</Text>
          </View>
          <View style={styles.passiveContainer}>
            <Text style={styles.passiveTitle}>Spell Save DC: </Text>
            <Text style={styles.passiveScore}>{modifiers.spellSaveDC}</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default InfoStatsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  scroll: {
    alignItems: "center",
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
  passiveContainerWithCheck: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
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
  passiveContainerWithCheckTopPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  proficient: {
    fontFamily: "Serif-Light-Italic",
  },
  checkProficiency: {
    flexDirection: "row",
    alignContent: "center",
  },
});
