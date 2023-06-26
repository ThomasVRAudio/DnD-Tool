import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import WeaponSection from "./WeaponSection";
import StatSection from "./StatSection";

import { useState, useEffect } from "react";
import ArmorSection from "./ArmorSection";
import CharacterData from "../CharacterData";
import HitPointSection from "./HitPointSection";

export default function CombatScreen({ characterData }) {
  const [data, setData] = useState(CharacterData);
  const [armorClass, setArmorClass] = useState();

  useEffect(() => {
    getData();
  }, [, characterData]);

  const getData = async () => {
    setData(characterData);
  };

  return (
    <LinearGradient colors={Colors.basicBackground} style={styles.container}>
      <ScrollView>
        <StatSection characterData={characterData} armorClass={armorClass} />
        <HitPointSection />
        <Text style={styles.sectionTitle}>Weapons</Text>
        <WeaponSection characterData={characterData} />
        <Text style={styles.sectionTitle}>Armor</Text>
        <ArmorSection
          characterData={characterData}
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
