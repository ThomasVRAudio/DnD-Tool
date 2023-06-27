import { View, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { calculateProficiencyBonus } from "../../constants/Functions";
import Colors from "../../constants/Colors";

const Skill = ({
  title,
  isProficient,
  onEditData,
  section,
  abilityScoreName,
  characterData,
}) => {
  let abilityScore = (name) => {
    if (!characterData.ability_scores) {
      return;
    }

    return Math.floor(
      (characterData.ability_scores[
        String(name).toLowerCase().replace(/ /g, "_")
      ] -
        10) /
        2 +
        (isProficient &&
          calculateProficiencyBonus(characterData.character_info.level))
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          onEditData({ value: !isProficient, prop: title, section: section })
        }
      >
        <Ionicons
          name={isProficient ? "md-radio-button-on" : "md-radio-button-off"}
          size={20}
        />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {abilityScoreName && (
          <>
            <Text style={styles.abilityName}>
              {" ( " +
                String(abilityScoreName).slice(0, 3).toUpperCase() +
                " )"}
            </Text>
          </>
        )}
        {abilityScoreName ? (
          <Text style={styles.bonus}>
            {abilityScore(abilityScoreName) >= 0 ? "+" : " "}
            {abilityScore(abilityScoreName)}
          </Text>
        ) : (
          <Text style={styles.bonus}>
            {abilityScore(String(title).toLowerCase()) >= 0 ? "+" : " "}
            {abilityScore(String(title).toLowerCase())}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Skill;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontFamily: "Serif-Light",
    fontSize: 16,
    textAlignVertical: "center",
  },
  abilityName: {
    fontFamily: "Serif-Light",
    color: "#000000AB",
    fontSize: 13,
    textAlignVertical: "center",
    paddingTop: 3,
  },
  text: {
    flexDirection: "row",
  },
  bonus: {
    fontFamily: "Serif-Light",
    marginLeft: 4,
    marginVertical: 5,
    backgroundColor: "#F8D5A8",
    borderWidth: 1,
    borderRadius: 2,
    padding: 2,
    elevation: 2,
  },
});
