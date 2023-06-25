import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const StatSection = ({ abilityScores, armorClass }) => {

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statAC}>
        <Text style={styles.statScore}>
          {armorClass}
        </Text>
        <Text style={styles.statTitle}>Armor Class</Text>
      </View>
      <View style={styles.stats}>
        <Text style={styles.statScore}>
          {Math.floor((abilityScores.dexterity - 10) / 2)}
        </Text>
        <Text style={styles.statTitle}>Initiative</Text>
      </View>
      <View style={styles.stats}>
        <Text style={styles.statScore}>30</Text>
        <Text style={styles.statTitle}>Speed</Text>
      </View>
    </View>
  );
};

export default StatSection;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  stats: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 10,
    width: "25%",
    padding: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 5,
  },
  statAC: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    width: "25%",
    padding: 5,
    margin: 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 5,
  },
  statTitle: {
    fontFamily: "Serif-Bold",
    textAlign: "center",
  },
  statScore: {
    fontFamily: "Serif-Light",
  },
});
