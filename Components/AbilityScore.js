import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const AbilityScore = ({ ability, value }) => {
  return (
    <View style={styles.abilityContainer}>
      <Text style={styles.ability}>{ability}</Text>
      <Text style={styles.score}>{value}</Text>
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
