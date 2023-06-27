import Skill from "./Skill";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const SkillsScreen = ({
  characterData,
  setCharacterData,
  refresh,
  setRefresh,
}) => {
  const onEditData = ({ prop, section, value }) => {
    let data = characterData;
    data[section][String(prop).toLowerCase().replace(/ /g, "_")] = value;
    setCharacterData(data);
    setRefresh(!refresh);
  };

  return (
    <LinearGradient style={styles.container} colors={Colors.basicBackground}>
      <ScrollView>
        <View style={styles.skillsContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Saving Throws</Text>
          </View>
          <Skill
            title={"Strength"}
            isProficient={characterData.saving_throws.strength}
            section={"saving_throws"}
            onEditData={onEditData}
            characterData={characterData}
          />
          <Skill
            title={"Dexterity"}
            isProficient={characterData.saving_throws.dexterity}
            section={"saving_throws"}
            onEditData={onEditData}
            characterData={characterData}
          />
          <Skill
            title={"Constitution"}
            isProficient={characterData.saving_throws.constitution}
            section={"saving_throws"}
            onEditData={onEditData}
            characterData={characterData}
          />
          <Skill
            title={"Intelligence"}
            isProficient={characterData.saving_throws.intelligence}
            section={"saving_throws"}
            onEditData={onEditData}
            characterData={characterData}
          />
          <Skill
            title={"Wisdom"}
            isProficient={characterData.saving_throws.wisdom}
            section={"saving_throws"}
            onEditData={onEditData}
            characterData={characterData}
          />
          <Skill
            title={"Charisma"}
            isProficient={characterData.saving_throws.charisma}
            section={"saving_throws"}
            onEditData={onEditData}
            characterData={characterData}
          />
        </View>
        <View style={styles.skillsContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Skills</Text>
          </View>
          <Skill
            title={"Acrobatics"}
            isProficient={characterData.skills.acrobatics}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Dexterity"}
            characterData={characterData}
          />
          <Skill
            title={"Animal Handling"}
            isProficient={characterData.skills.animal_handling}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Wisdom"}
            characterData={characterData}
          />
          <Skill
            title={"Arcana"}
            isProficient={characterData.skills.arcana}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Intelligence"}
            characterData={characterData}
          />
          <Skill
            title={"Athletics"}
            isProficient={characterData.skills.athletics}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Strength"}
            characterData={characterData}
          />
          <Skill
            title={"Deception"}
            isProficient={characterData.skills.deception}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Charisma"}
            characterData={characterData}
          />
          <Skill
            title={"History"}
            isProficient={characterData.skills.history}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Intelligence"}
            characterData={characterData}
          />
          <Skill
            title={"Insight"}
            isProficient={characterData.skills.insight}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Wisdom"}
            characterData={characterData}
          />
          <Skill
            title={"Intimidation"}
            isProficient={characterData.skills.intimidation}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Charisma"}
            characterData={characterData}
          />
          <Skill
            title={"Investigation"}
            isProficient={characterData.skills.investigation}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Intelligence"}
            characterData={characterData}
          />
          <Skill
            title={"Medicine"}
            isProficient={characterData.skills.medicine}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Wisdom"}
            characterData={characterData}
          />
          <Skill
            title={"Nature"}
            isProficient={characterData.skills.nature}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Intelligence"}
            characterData={characterData}
          />
          <Skill
            title={"Perception"}
            isProficient={characterData.skills.perception}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Wisdom"}
            characterData={characterData}
          />
          <Skill
            title={"Performance"}
            isProficient={characterData.skills.performance}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Charisma"}
            characterData={characterData}
          />
          <Skill
            title={"Persuasion"}
            isProficient={characterData.skills.persuasion}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Charisma"}
            characterData={characterData}
          />
          <Skill
            title={"Religion"}
            isProficient={characterData.skills.religion}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Intelligence"}
            characterData={characterData}
          />
          <Skill
            title={"Sleight of Hand"}
            isProficient={characterData.skills.sleight_of_hand}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Dexterity"}
            characterData={characterData}
          />
          <Skill
            title={"Stealth"}
            isProficient={characterData.skills.stealth}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Dexterity"}
            characterData={characterData}
          />
          <Skill
            title={"Survival"}
            isProficient={characterData.skills.survival}
            section={"skills"}
            onEditData={onEditData}
            abilityScoreName={"Wisdom"}
            characterData={characterData}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SkillsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skillsContainer: {
    alignItems: "center",
    backgroundColor: Colors.card,
    margin: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontFamily: "Serif-Bold",
    fontSize: 30,
    alignSelf: "center",
  },
  titleSection: {
    borderBottomWidth: 1,
    width: "80%",
  },
});
