import React, { useCallback } from "react";
import SearchScreen from "./Components/SearchScreen";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ItemsScreen from "./Components/ItemsScreen";
import TempStatsScreen from "./Components/TempStatsScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans-basic": require("./assets/fonts/OpenSans-Bold.ttf"),
    "Montserrat-Italic": require("./assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
    "DND-Title": require("./assets/fonts/DUNGRG.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-VariableFont_wght.ttf"),
    "Serif-Light": require("./assets/fonts/IBMPlexSerif-Medium.ttf"),
    "Serif-Light-Italic": require("./assets/fonts/IBMPlexSerif-MediumItalic.ttf"),
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
      <Drawer.Navigator initialRouteName="Spell Slots">
        <Drawer.Screen name="Search Spells" component={SearchScreen} />
        <Drawer.Screen name="Items" component={ItemsScreen} />
        <Drawer.Screen name="Spell Slots" component={TempStatsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
