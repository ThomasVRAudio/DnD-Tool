import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../constants/Colors";
import Weapon from "./Weapon";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CombatScreen = () => {
  const weaponDATA = [
    {
      name: "",
      damage_dice: "",
      weapon_range: "",
      equipment_category: ""
    },
  ];

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState([]);
  const [weapons, setWeapons] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("weapons");

    if (jsonValue != null) {
      setWeapons(JSON.parse(jsonValue));
    }
  };

  const url = `https://www.dnd5eapi.co/api/equipment/${search
    .toLocaleLowerCase()
    .trimEnd()
    .replace(/ /g, "-")
    .replace(/'/g, "-")}/`;

  const confirm = () => {
    if (search === "") {
      return;
    }

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));

    setSearch("");
    setIsSearching(false);
  };

  useEffect(() => {
    if (data.length === 0 || data.error !== undefined) {
      return;
    }

    let arrayCopy = [...weapons];
    let newWeapon = {
      name: data.name,
      damage_dice: data.damage.damage_dice,
      weapon_range: data.weapon_range,
      equipment_category: data.equipment_category.index
    };
    arrayCopy.push(newWeapon);
    setWeapons(arrayCopy);
  }, [data]);

  useEffect(() => {
    AsyncStorage.setItem("weapons", JSON.stringify(weapons));
  }, [weapons]);

  return (
    <LinearGradient colors={Colors.basicBackground} style={styles.container}>
      <ScrollView>
        <View style={styles.statsContainer}>
          <View style={styles.statAC}>
            <Text style={styles.statScore}>14</Text>
            <Text style={styles.statTitle}>Armor Class</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statScore}>3</Text>
            <Text style={styles.statTitle}>Initiative</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statScore}>30</Text>
            <Text style={styles.statTitle}>Speed</Text>
          </View>
        </View>
        <View style={styles.healthContainer}>
          <View style={styles.currentHPContainer}>
            <View style={styles.hpTop}>
              <Text style={styles.hpMaxTitle}>Hit Point Maximum: </Text>
              <Text style={styles.hpMax}>30</Text>
            </View>
            <View style={styles.healthCounterContainer}>
              <Text style={styles.buttonLeft}>-</Text>
              <Text style={styles.healthCounter}>27</Text>
              <Text style={styles.buttonRight}>+</Text>
            </View>
            <View>
              <Text style={styles.healthTitle}>Current Hit Points</Text>
            </View>
          </View>
          <View style={styles.temporaryHPContainer}>
            <View style={styles.healthCounterContainer}>
              <Text style={styles.buttonLeft}>-</Text>
              <Text style={styles.healthCounter}>0</Text>
              <Text style={styles.buttonRight}>+</Text>
            </View>
            <View>
              <Text style={styles.healthTitle}>Temporary Hit Points</Text>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Weapons</Text>
        {weapons.map((weapon, index) => {
          return (
            <Weapon
              key={index}
              weapon={weapon}
            />
          );
        })}
        {isSearching ? (
          <View style={styles.searchContainer}>
            <View style={styles.leftSearchContainer}>
              <Ionicons
                name="search"
                style={styles.searchIcon}
                size={20}
                color={"#A39E9E"}
              ></Ionicons>
              <TextInput
                style={styles.input}
                placeholder="Dagger"
                placeholderTextColor={"#FFFFFF80"}
                onChangeText={updateSearch}
                value={search}
                onSubmitEditing={() => confirm()}
              ></TextInput>
            </View>
            <View style={styles.rightSearchContainer}>
              <Ionicons
                name="add-circle"
                style={styles.addIcon}
                size={40}
                color={"#A39E9E"}
                onPress={() => confirm()}
              ></Ionicons>
            </View>
          </View>
        ) : (
          <View>
            <Ionicons
              name="add-circle"
              style={styles.addIcon}
              size={40}
              color={"#00000093"}
              width="90%"
              onPress={() => setIsSearching(true)}
            ></Ionicons>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default CombatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  equipmentContainer: {},
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
    padding: 10,
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
  },
  healthTitle: {
    fontFamily: "Serif-Bold",
    textAlign: "center",
  },
  healthCounter: {
    fontFamily: "Serif-Light",
    fontSize: 30,
  },
  searchContainer: {
    flexDirection: "row",
    borderRadius: 35,
    width: "85%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "#2C2929",
    padding: 5,
    marginTop: 10,
  },
  leftSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightSearchContainer: {
    flex: 1,
  },
  searchIcon: {},
  addIcon: {
    textAlign: "right",
  },
  input: {
    color: "#ffffff",
    fontSize: 20,
    paddingLeft: 10,
    paddingHorizontal: 90,
  },
  sectionTitle: {
    fontFamily: "Serif-Light-Italic",
    fontSize: 30,
    color: "#0000006C",
    textAlign: "right",
    width: "90%",
    paddingBottom: 10,
  },
});
