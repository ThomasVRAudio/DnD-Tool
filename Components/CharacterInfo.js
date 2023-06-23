import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";

const CharacterInfo = ({ data, confirm }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.upperPart}>
          <View style={styles.nameSection}>
            <Text style={styles.name}>Name </Text>
            <TextInput
              style={styles.nameInput}
              defaultValue={String(data.name)}
              onChangeText={(text) => confirm({ value: text, prop: "name" })}
            ></TextInput>
          </View>
        </View>
        <View style={styles.lowerPart}>
          <View style={styles.section}>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Level </Text>
              <TextInput
                style={styles.score}
                defaultValue={String(data.level)}
                onChangeText={(text) => confirm({ value: text, prop: "level" })}
                keyboardType="numeric"
              ></TextInput>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Race </Text>
              <TextInput
                style={styles.score}
                defaultValue={String(data.race)}
                onChangeText={(text) => confirm({ value: text, prop: "race" })}
              ></TextInput>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Background </Text>
              <TextInput
                style={styles.score}
                defaultValue={String(data.background)}
                onChangeText={(text) =>
                  confirm({ value: text, prop: "background" })
                }
              ></TextInput>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Class </Text>
              <TextInput
                style={styles.score}
                defaultValue={String(data.class)}
                onChangeText={(text) => confirm({ value: text, prop: "class" })}
              ></TextInput>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Alignment </Text>
              <TextInput
                style={styles.score}
                defaultValue={String(data.alignment)}
                onChangeText={(text) =>
                  confirm({ value: text, prop: "alignment" })
                }
              ></TextInput>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statTitle}>Exp </Text>
              <TextInput
                style={styles.score}
                defaultValue={String(data.exp)}
                onChangeText={(text) => confirm({ value: text, prop: "exp" })}
                keyboardType="numeric"
              ></TextInput>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CharacterInfo;

const styles = StyleSheet.create({
  statTitle: {
    fontFamily: "Serif-Bold",
    fontSize: 14,
    textAlign: "left",
  },
  score: {
    fontFamily: "Serif-Light",
    fontSize: 14,
    textAlign: "left",
  },
  container: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "95%",
    backgroundColor: Colors.card,
    elevation: 5,
  },
  stat: {
    textAlign: "left",
  },
  section: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  lowerPart: {
    justifyContent: "center",
  },
  upperPart: {
    flexDirection: "row",
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  nameInput: {
    fontFamily: "Serif-Light",
    fontSize: 16,
  },
  name: {
    fontFamily: "Serif-Bold",
    fontSize: 16,
  },
});
