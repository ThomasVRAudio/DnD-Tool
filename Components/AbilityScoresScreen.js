import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AbilityScore from "./AbilityScore";
import Colors from "../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
const AbilityScoresScreen = () => {
  return (
    <LinearGradient style={styles.container} colors={Colors.basicBackground}>
      <View style={styles.rowContainer}>
        <AbilityScore ability={"Strength"} value={8} />
        <AbilityScore ability={"Dexterity"} value={16} />
      </View>
      <View style={styles.rowContainer}>
        <AbilityScore ability={"Constitution"} value={13} />
        <AbilityScore ability={"Intelligence"} value={13} />
      </View>
      <View style={styles.rowContainer}>
        <AbilityScore ability={"Wisdom"} value={15} />
        <AbilityScore ability={"Charisma"} value={19} />
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Passive Wisdom (perception): </Text>
        <Text style={styles.passiveScore}>14</Text>
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Proficiency Bonus: </Text>
        <Text style={styles.passiveScore}>+2</Text>
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Spell Attack: </Text>
        <Text style={styles.passiveScore}>+6</Text>
      </View>
      <View style={styles.passiveContainer}>
        <Text style={styles.passiveTitle}>Spell Save DC: </Text>
        <Text style={styles.passiveScore}>14</Text>
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
    width: "75%"
  },
  passiveTitle: {
    fontFamily: "Serif-Bold",
  },
  passiveScore: {
    fontFamily: "Serif-Light",
    fontSize: 15
  },
});
