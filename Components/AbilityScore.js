import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";
import { useState } from "react";
import { useEffect } from "react";

const AbilityScore = ({ ability, value, confirm }) => {
  const [abilityValue, setAbilityValue] = useState(value);

  useEffect(() => {
    setAbilityValue(value);
  }, [, value]);

  const clearValue = () => {
    setAbilityValue("");
  };

  return (
    <View style={styles.abilityContainer}>
      <Text style={styles.ability}>{ability}</Text>
      <TextInput
        style={styles.score}
        defaultValue={String(abilityValue)}
        onChangeText={(text) =>
          confirm({ value: text, prop: String(ability).toLowerCase() })
        }
        keyboardType="numeric"
        onFocus={() => clearValue()}
      ></TextInput>
      <Text style={styles.score}>
        {(value >= 10 && "+") + Math.floor((value - 10) / 2)}
      </Text>
    </View>
  );
};

export default AbilityScore;
const styles = StyleSheet.create({
  ability: {
    fontFamily: "Serif-Bold",
    fontSize: 14,
  },
  score: {
    fontFamily: "Serif-Light",
    paddingTop: 10,
    fontSize: 20,
    textAlign: "center",
  },
  abilityContainer: {
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "35%",
    backgroundColor: Colors.card,
    elevation: 5,
  },
});
