import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Spell = ({ data, onPressDelete, index }) => {
  const [detailed, setDetailed] = useState(false);

  const showDetails = () => {
    setDetailed(!detailed);
  };

  return (
    <ScrollView
      style={styles.container}
      //onTouchEnd={() => showDetails()}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => showDetails()}>
        <View style={detailed ? styles.upperTextDetailed : styles.upperText}>
          <Text style={styles.title}>{data && data.name}</Text>
          <View style={styles.rightTop}>
            <Text style={styles.level}>
              {data && data.level !== 0
                ? data.level === "Trait"
                  ? data.level
                  : "level: " + data.level
                : "Cantrip"}
            </Text>
            <Ionicons
              name="trash-outline"
              onPress={() => onPressDelete(index)}
              padding={8}
            ></Ionicons>
          </View>
        </View>
      </TouchableOpacity>
      <View>
        {detailed && (
          <>
            <View style={styles.separator}></View>
            <View style={styles.componentsContainer}>
              <Text style={styles.components}>Casting Time: </Text>
              <Text style={styles.componentData}>{data.casting_time}</Text>
            </View>
            <View style={styles.componentsContainer}>
              <Text style={styles.components}>Range: </Text>
              <Text style={styles.componentData}>{data.range}</Text>
            </View>
            <View style={styles.componentsContainer}>
              <Text style={styles.components}>Components: </Text>
              <Text style={styles.componentData}>{data.components}</Text>
            </View>
            <View style={styles.componentsContainer}>
              <Text style={styles.components}>Duration: </Text>
              <Text style={styles.componentData}>{data.duration}</Text>
            </View>
            <Text style={styles.lowerText}>{data.desc}</Text>
            {data.higher_level && data.higher_level.length !== 0 && (
              <>
                <Text style={styles.mediumTitle}>Higher Level:</Text>
                <Text style={styles.lowerText}>{data.higher_level}</Text>
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Spell;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 10,
    borderWidth: 2,
    elevation: 5,
    padding: 10,
    margin: 5,
  },
  title: {
    fontFamily: "Serif-Bold",
    fontSize: 20,
    flex: 1,
  },
  level: {
    fontFamily: "Serif-Light",
    paddingRight: 20,
    overflow: "visible",
  },
  upperText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  upperTextDetailed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 10,
  },
  lowerText: {
    fontFamily: "Serif-Light-Italic",
    paddingTop: 8,
  },
  components: {
    fontFamily: "Serif-Bold",
  },
  componentsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 2,
  },
  componentData: {
    fontFamily: "Serif-Light",
  },
  mediumTitle: {
    fontFamily: "Serif-Bold",
    fontSize: 16,
  },
  rightTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    borderTopWidth: 1,
    paddingBottom: 10,
  },
});
