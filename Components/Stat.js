import { Text, StyleSheet, View } from "react-native";

const Stat = ({ changeSpellSlots, spellSlots, index }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={spellSlots[index] !== 0 ? styles.level : styles.levelzero}>
          Lv. {index + 1}
        </Text>
        <View style={styles.counterContainer}>
          <Text
            style={styles.buttonLeft}
            onPress={() => {
              changeSpellSlots({ number: -1, index: index });
            }}
          >
            -
          </Text>
          <Text
            style={
              spellSlots[index] !== 0 ? styles.counter : styles.counterzero
            }
          >
            {spellSlots[index]}
          </Text>
          <Text
            style={styles.buttonRight}
            onPress={() => {
              changeSpellSlots({ number: 1, index: index });
            }}
          >
            +
          </Text>
        </View>
      </View>
    </>
  );
};

export default Stat;

const styles = StyleSheet.create({
  stat: {
    fontFamily: "DND-Title",
    fontSize: 50,
  },
  buttonLeft: {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    padding: 5,
    paddingHorizontal: 8,
    margin: 10,
    backgroundColor: "#B89669",
    fontSize: 20,
    borderWidth: 1,
    elevation: 5,
  },
  buttonRight: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    padding: 5,
    margin: 10,
    backgroundColor: "#B89669",
    fontSize: 20,
    borderWidth: 1,
    elevation: 5,
  },
  counter: {
    fontFamily: "Serif-Light",
    fontSize: 30,
  },
  counterzero: {
    fontFamily: "Serif-Light",
    fontSize: 30,
    color: "#00000038",
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "75%",
  },
  level: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 20,
  },
  levelzero: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 20,
    color: "#0000005B",
  },
});
