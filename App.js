import React, { useCallback } from "react";
import SearchComponent from "./Components/SearchComponent";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

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

  return <SearchComponent />;
}
