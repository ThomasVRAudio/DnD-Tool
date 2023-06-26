import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StatSection = ({ characterData, armorClass }) => {
  const DATA = {
    armor_class: 16,
    armor_class_custom: false,
    speed: 45,
  };

  const [tapOpen, setTapOpen] = useState(false);
  const [useCustom, setUseCustom] = useState(false);
  const [custom, setCustom] = useState(DATA);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("customAC");

    if (jsonValue != null) {
      setCustom(JSON.parse(jsonValue));
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("customAC", JSON.stringify(custom));
    if (custom.armor_class_custom) {
      setUseCustom(true);
    }
  }, [refresh]);

  const onConfirm = ({ value, stat }) => {
    let dataCopy = custom;
    dataCopy[stat] = value;
    setCustom(dataCopy);
    setRefresh(!refresh);
  };

  return (
    <>
      <View style={styles.statsContainer}>
        <View style={styles.statAC}>
          <TouchableOpacity
            onPress={() => {
              setTapOpen(!tapOpen);
            }}
          >
            {useCustom ? (
              <TextInput
                style={styles.statScore}
                defaultValue={String(custom.armor_class)}
                keyboardType="numeric"
                onChangeText={(text) =>
                  onConfirm({ value: text, stat: "armor_class" })
                }
              />
            ) : (
              <Text style={styles.statScore}>{armorClass}</Text>
            )}

            <Text style={styles.statTitle}>Armor Class</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statScore}>
            {Math.floor((characterData.ability_scores.dexterity - 10) / 2)}
          </Text>
          <Text style={styles.statTitle}>Initiative</Text>
        </View>
        <View style={styles.stats}>
          <TextInput
            style={styles.statScore}
            defaultValue={String(custom.speed)}
            keyboardType="numeric"
            onChangeText={(text) => onConfirm({ value: text, stat: "speed" })}
          />
          <Text style={styles.statTitle}>Speed</Text>
        </View>
      </View>
      {tapOpen && (
        <View style={styles.customSection}>
          <View style={styles.customACContainer}>
            <Text style={styles.customTitle}>Custom: </Text>
            <Ionicons
              name={useCustom ? "checkmark-circle" : "md-close-circle"}
              size={15}
              color={"#000000AD"}
              onPress={() => {
                onConfirm({ value: !useCustom, stat: "armor_class_custom" });
                setUseCustom(!useCustom);
              }}
            ></Ionicons>
          </View>
        </View>
      )}
    </>
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
    textAlign: "center",
  },
  customTitle: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 17,
  },
  customACContainer: {
    borderWidth: 1,
    borderRadius: 5,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
    paddingHorizontal: 8,
    width: "31%",
  },
  customSection: {
    width: "80%",
    alignSelf: "center",
  },
});
