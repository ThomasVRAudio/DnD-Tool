import { StyleSheet, View, Text, TextInput } from "react-native";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

const HitPointSection = () => {
  const DATA = {
    health: "0",
    maxHealth: "0",
    tempHealth: "0",
  };

  const [health, setHealth] = useState(DATA);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("health");

    if (jsonValue != null) {
      setHealth(JSON.parse(jsonValue));
      setRefresh(!refresh);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("health", JSON.stringify(health));
  }, [refresh]);

  const onEditData = ({ value, prop }) => {
    let copy = health;
    copy[prop] = value;
    setHealth(copy);
    setRefresh(!refresh);
  };

  return (
    <View style={styles.healthContainer}>
      <View style={styles.currentHPContainer}>
        <View style={styles.upperPart}>
          <View style={styles.hpTop}>
            <Text style={styles.hpMaxTitle}>Hit Point Maximum: </Text>
            <TextInput
              style={styles.hpMax}
              onChangeText={(text) =>
                onEditData({ value: text, prop: "maxHealth" })
              }
              defaultValue={health.maxHealth}
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={() =>
              onEditData({ value: health.maxHealth, prop: "health" })
            }
          >
            <Ionicons name="reload" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.healthCounterContainer}>
          <TouchableOpacity
            onPress={() =>
              onEditData({
                value: String(parseInt(health.health) - 1),
                prop: "health",
              })
            }
          >
            <Text style={styles.buttonLeft}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.healthCounter}
            onChangeText={(text) => onEditData({ value: text, prop: "health" })}
            defaultValue={health.health}
          ></TextInput>
          <TouchableOpacity
            onPress={() =>
              onEditData({
                value: String(parseInt(health.health) + 1),
                prop: "health",
              })
            }
          >
            <Text style={styles.buttonRight}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.healthTitle}>Current Hit Points</Text>
        </View>
      </View>
      <View style={styles.temporaryHPContainer}>
        <TouchableOpacity
          style={styles.tempUpperPart}
          onPress={() => onEditData({ value: "0", prop: "tempHealth" })}
        >
          <Ionicons name="reload" size={20} />
        </TouchableOpacity>
        <View style={styles.healthCounterContainer}>
          <TouchableOpacity
            onPress={() =>
              onEditData({
                value: String(parseInt(health.tempHealth) - 1),
                prop: "tempHealth",
              })
            }
          >
            <Text style={styles.buttonLeft}>-</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.healthCounter}
            onChangeText={(text) =>
              onEditData({ value: text, prop: "tempHealth" })
            }
            defaultValue={health.tempHealth}
          ></TextInput>
          <TouchableOpacity
            onPress={() =>
              onEditData({
                value: String(parseInt(health.tempHealth) + 1),
                prop: "tempHealth",
              })
            }
          >
            <Text style={styles.buttonRight}>+</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.healthTitle}>Temporary Hit Points</Text>
        </View>
      </View>
    </View>
  );
};

export default HitPointSection;

const styles = StyleSheet.create({
  buttonLeft: {
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    padding: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    backgroundColor: Colors.button,
    fontSize: 20,
    borderWidth: 1,
    elevation: 5,
  },
  buttonRight: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.button,
    fontSize: 20,
    borderWidth: 1,
    elevation: 5,
  },
  healthContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  currentHPContainer: {
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    elevation: 5,
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flex: 1.5,
    justifyContent: "space-between",
    width: "80%",
  },
  temporaryHPContainer: {
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    elevation: 5,
    padding: 10,
    marginTop: 10,
    flex: 1,
    width: "80%",
  },
  healthCounterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    alignItems: "center",
  },
  hpMax: {
    fontFamily: "Serif-Light",
    color: "#0000008E",
  },
  hpMaxTitle: {
    fontFamily: "Serif-Bold",
    color: "#0000008E",
  },
  hpTop: {
    flexDirection: "row",
    fontFamily: "Serif-Light",
    alignItems: "center",
  },
  healthTitle: {
    fontFamily: "Serif-Bold",
    textAlign: "center",
  },
  healthCounter: {
    fontFamily: "Serif-Light",
    fontSize: 30,
  },
  upperPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  tempUpperPart: {
    alignItems: "flex-end",
    paddingHorizontal: 10,
  },
});
