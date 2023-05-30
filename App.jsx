import { useCallback, useState } from "react";
import { useFonts } from "expo-font";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

import { AuthScreen } from "./Screens/auth/authScreen";
import { MainScreen } from "./Screens/mainScreen/MeinScreen";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {isLogin ? <MainScreen /> : <AuthScreen />}
      </View>
    </NavigationContainer>
  );
}
