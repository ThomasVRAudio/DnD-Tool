import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import WeaponSection from "./WeaponSection";
import StatSection from "./StatSection";

import { useState, useEffect } from "react";
import ArmorSection from "./ArmorSection";
import { AbilityScoreData } from "../AbilityScoreData";

export default function CombatScreen({ abilityScoreData }) {
  const [abilityScores, setAbilityScores] = useState(AbilityScoreData);
  const [armorClass, setArmorClass] = useState();

  useEffect(() => {
    getData();
  }, [, abilityScoreData]);

  const getData = async () => {
    setAbilityScores(abilityScoreData);
  };

  return (
    <LinearGradient colors={Colors.basicBackground} style={styles.container}>
      <ScrollView>
        <StatSection abilityScores={abilityScores} armorClass={armorClass} />
        <View style={styles.healthContainer}>
          <View style={styles.currentHPContainer}>
            <View style={styles.hpTop}>
              <Text style={styles.hpMaxTitle}>Hit Point Maximum: </Text>
              <Text style={styles.hpMax}>30</Text>
            </View>
            <View style={styles.healthCounterContainer}>
              <Text style={styles.buttonLeft}>-</Text>
              <Text style={styles.healthCounter}>27</Text>
              <Text style={styles.buttonRight}>+</Text>
            </View>
            <View>
              <Text style={styles.healthTitle}>Current Hit Points</Text>
            </View>
          </View>
          <View style={styles.temporaryHPContainer}>
            <View style={styles.healthCounterContainer}>
              <Text style={styles.buttonLeft}>-</Text>
              <Text style={styles.healthCounter}>0</Text>
              <Text style={styles.buttonRight}>+</Text>
            </View>
            <View>
              <Text style={styles.healthTitle}>Temporary Hit Points</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Weapons</Text>
        <WeaponSection abilityScores={abilityScores} />
        <Text style={styles.sectionTitle}>Armor</Text>
        <ArmorSection
          abilityScores={abilityScores}
          setArmorClass={setArmorClass}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  equipmentContainer: {},
  buttonLeft: {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    backgroundColor: Colors.button,
    fontSize: 20,
    borderWidth: 1,
    elevation: 5,
  },
  buttonRight: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.button,
    fontSize: 20,
    borderWidth: 1,
    elevation: 5,
  },
  healthContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  currentHPContainer: {
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    elevation: 5,
    padding: 10,
    flex: 1.5,
    justifyContent: "space-between",
    width: "80%",
  },
  temporaryHPContainer: {
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    elevation: 5,
    padding: 10,
    marginTop: 10,
    flex: 1,
    width: "80%",
  },
  healthCounterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
  },
  hpMax: {
    fontFamily: "Serif-Light",
    color: "#0000008E",
  },
  hpMaxTitle: {
    fontFamily: "Serif-Bold",
    color: "#0000008E",
  },
  hpTop: {
    flexDirection: "row",
    fontFamily: "Serif-Light",
  },
  healthTitle: {
    fontFamily: "Serif-Bold",
    textAlign: "center",
  },
  healthCounter: {
    fontFamily: "Serif-Light",
    fontSize: 30,
  },
  sectionTitle: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 30,
    color: "#0000006C",
    textAlign: "right",
    width: "90%",
    paddingBottom: 10,
  },
});
