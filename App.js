import React, { useCallback } from "react";
import SearchScreen from "./Components/SearchScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ItemsScreen from "./Components/ItemsScreen";
import SpellsScreen from "./Components/SpellsScreen";
import SpellSlotsScreen from "./Components/SpellSlotsScreen";
import InfoStatsScreen from "./Components/InfoStatsScreen";
import CombatScreen from "./Components/CombatScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "DND-Title": require("./assets/fonts/DUNGRG.ttf"),
    "Serif-Light": require("./assets/fonts/IBMPlexSerif-Medium.ttf"),
    "Serif-Light-Italic": require("./assets/fonts/IBMPlexSerif-MediumItalic.ttf"),
    "Serif-Bold": require("./assets/fonts/IBMPlexSerif-SemiBold.ttf"),
    "Serif-Bold-Italic": require("./assets/fonts/IBMPlexSerif-SemiBoldItalic.ttf"),
  });

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
      <Drawer.Navigator initialRouteName="Combat">
        <Drawer.Screen name="Search Spells" component={SearchScreen} />
        <Drawer.Screen name="Items" component={ItemsScreen} />
        <Drawer.Screen name="Spell Slots" component={SpellSlotsScreen} />
        <Drawer.Screen name="Spells" component={SpellsScreen} />
        <Drawer.Screen
          name="Character Info & Stats"
          component={InfoStatsScreen}
        />
        <Drawer.Screen name="Combat" component={CombatScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
