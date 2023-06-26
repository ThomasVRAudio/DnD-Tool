import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import WeaponSection from "./WeaponSection";
import StatSection from "./StatSection";

import { useState, useEffect } from "react";
import ArmorSection from "./ArmorSection";
import { AbilityScoreData } from "../AbilityScoreData";
import HitPointSection from "./HitPointSection";

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
        <HitPointSection />
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
  sectionTitle: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 30,
    color: "#0000006C",
    textAlign: "right",
    width: "90%",
    paddingBottom: 10,
  },
});
