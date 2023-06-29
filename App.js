import React, { useCallback } from "react";
import SearchScreen from "./Components/SearchScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ItemsScreen from "./Components/Items/ItemsScreen";
import SpellsScreen from "./Components/Spells/SpellsScreen";
import SpellSlotsScreen from "./Components/SpellSlots/SpellSlotsScreen";
import InfoStatsScreen from "./Components/CharacterInfo/InfoStatsScreen";
import CombatScreen from "./Components/Combat/CombatScreen";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CharacterData } from "./Components/Data/CharacterData";
import SkillsScreen from "./Components/Skills/SkillsScreen";
import Colors from "./constants/Colors";

export default function App() {
  const [fontsLoaded] = useFonts({
    "DND-Title": require("./assets/fonts/DUNGRG.ttf"),
    "Serif-Light": require("./assets/fonts/IBMPlexSerif-Medium.ttf"),
    "Serif-Light-Italic": require("./assets/fonts/IBMPlexSerif-MediumItalic.ttf"),
    "Serif-Bold": require("./assets/fonts/IBMPlexSerif-SemiBold.ttf"),
    "Serif-Bold-Italic": require("./assets/fonts/IBMPlexSerif-SemiBoldItalic.ttf"),
  });

  const [characterData, setCharacterData] = useState(CharacterData);
  const [characterDataRefresh, setCharacterDataRefresh] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("characterData");
    if (jsonValue != null) {
      setCharacterData(JSON.parse(jsonValue));
      setCharacterDataRefresh(!characterDataRefresh);
    }
  };

  useEffect(() => {
    AsyncStorage.setItem("characterData", JSON.stringify(characterData));
  }, [characterDataRefresh]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Combat"
        screenOptions={{
          drawerStyle: { backgroundColor: Colors.header, width: 240 },
          headerTintColor: { color: Colors.header },
          headerStyle: {
            height: 80,
            backgroundColor: Colors.header,
          },
          headerTitleStyle: {
            color: "#111111",
          },
          drawerActiveBackgroundColor: "#745135",
          drawerActiveTintColor: "white",
        }}
      >
        <Drawer.Screen name="Search Spells" component={SearchScreen} />
        <Drawer.Screen name="Items" component={ItemsScreen} />
        <Drawer.Screen name="Spell Slots" component={SpellSlotsScreen} />
        <Drawer.Screen name="Spells" component={SpellsScreen} />
        <Drawer.Screen name="Character Info & Stats">
          {() => (
            <InfoStatsScreen
              characterData={characterData}
              setCharacterData={setCharacterData}
              setRefresh={setCharacterDataRefresh}
              refresh={characterDataRefresh}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Combat">
          {() => <CombatScreen characterData={characterData} />}
        </Drawer.Screen>
        <Drawer.Screen name="Skills">
          {() => (
            <SkillsScreen
              characterData={characterData}
              setCharacterData={setCharacterData}
              setRefresh={setCharacterDataRefresh}
              refresh={characterDataRefresh}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
