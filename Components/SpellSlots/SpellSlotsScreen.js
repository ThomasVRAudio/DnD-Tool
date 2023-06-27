import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Stat from "./Stat";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";

const TempStatsScreen = () => {
  const slotLevels = [
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 0],
    [1, 0],
  ];
  const [spellSlots, setSpellSlots] = useState(slotLevels);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("spellSlots");

    if (jsonValue != null) {
      setSpellSlots(JSON.parse(jsonValue));
    }
  };

  const changeSpellSlots = (props) => {
    let arrayCopy = [...spellSlots];
    arrayCopy[props.index][0] += props.number;
    arrayCopy[props.index][0] =
      arrayCopy[props.index][0] < 0 ? 0 : arrayCopy[props.index][0];
    setSpellSlots(arrayCopy);
  };

  const changeMaxSlots = ({ text, index }) => {
    let arrayCopy = [...spellSlots];
    arrayCopy[index][1] = text;
    setSpellSlots(arrayCopy);
  };

  useEffect(() => {
    AsyncStorage.setItem("spellSlots", JSON.stringify(spellSlots));
  }, [spellSlots]);

  const setToMax = () => {
    let arrayCopy = [...spellSlots];
    arrayCopy.forEach((element) => {
      for (let index = 0; index < arrayCopy.length; index++) {
        arrayCopy[index][0] = parseInt(arrayCopy[index][1]);
      }
    });

    setSpellSlots(arrayCopy);
  };

  return (
    <LinearGradient colors={Colors.basicBackground} style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.stat}>Spell Slots:</Text>
            <Ionicons
              name="reload-circle"
              size={60}
              onPress={() => setToMax()}
            />
          </View>
          {spellSlots.map((x, index) => {
            return (
              <Stat
                key={index}
                spellSlots={spellSlots}
                changeSpellSlots={changeSpellSlots}
                index={index}
                maxSlots={spellSlots}
                changeMaxSlots={changeMaxSlots}
              ></Stat>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TempStatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  stat: {
    fontFamily: "DND-Title",
    fontSize: 50,
    alignSelf: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderRadius: 5,
    elevation: 5,
    padding: 5,
    paddingHorizontal: 50,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
