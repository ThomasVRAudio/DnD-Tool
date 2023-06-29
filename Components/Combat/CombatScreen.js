import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import WeaponSection from "./WeaponSection";
import StatSection from "./StatSection";

import { useRef, useState, useEffect } from "react";
import ArmorSection from "./ArmorSection";
import HitPointSection from "./HitPointSection";
import { Keyboard } from "react-native";

export default function CombatScreen({ characterData }) {
  const [armorClass, setArmorClass] = useState();

  const [keyboardStatus, setKeyboardStatus] = useState("");
  const [scrollUpHeight, setScrollUpHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const scrollRef = useRef();

  useEffect(() => {
    if (keyboardStatus === "Keyboard Shown") {
      scrollRef.current?.scrollTo({ y: scrollUpHeight, animated: true });
    }
  }, [keyboardStatus]);

  return (
    <LinearGradient colors={Colors.basicBackground} style={styles.container}>
      <ScrollView ref={scrollRef}>
        <StatSection characterData={characterData} armorClass={armorClass} />
        <HitPointSection />
        <View>
          <Text style={styles.sectionTitle}>Weapons</Text>
          <WeaponSection characterData={characterData} />
        </View>
        <Text
          style={styles.sectionTitle}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setScrollUpHeight(layout.y - 300);
          }}
        >
          Armor
        </Text>
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
