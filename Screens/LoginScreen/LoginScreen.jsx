import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default LoginScreen = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState();
  const [secureText, setSecureText] = useState(true);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  const secureTextShown = () => {
    if (secureText === false) {
      console.log("true", password);
      return setSecureText(true);
    }
    console.log("false", password);
    return setSecureText(false);
  };

  const inputPassword = (text) => setPassword(text);
  const inputEmail = (text) => setLogin(text);

  const loginUser = () => {
    Alert.alert("Credentials", `${login} + ${password}`);
  };
  if (!fontsLoaded) {
    return null;
  }
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/PhotoBG.png")}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View
              style={{
                ...styles.containerLogin,
                marginBottom: keyboardStatus ? -250 : 0,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text style={styles.title}>Войти</Text>
              </View>
              <View>
                <TextInput
                  style={styles.inputEmail}
                  placeholder="Адрес электронной почты"
                  onChangeText={inputEmail}
                  value={login}
                  onFocus={() => setKeyboardStatus(true)}
                ></TextInput>
                <View style={{ marginBottom: 42 }}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="Пароль"
                    secureTextEntry={secureText}
                    onChangeText={inputPassword}
                    value={password}
                    onFocus={() => setKeyboardStatus(true)}
                  ></TextInput>
                  <TouchableOpacity
                    style={styles.showBtn}
                    onPress={secureTextShown}
                  >
                    <Text style={styles.showText}>
                      {secureText ? `Показать` : "Скрыть"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.goBtn} onPress={loginUser}>
                <Text style={styles.goText}>Войти</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registrationBtn}>
                <Text style={styles.registrationBtnText}>
                  Нет аккаунта? Зарегистрироваться
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeaea",
  },

  image: {
    flex: 1,
    justifyContent: "flex-end",
    resizeMode: "cover",
  },

  containerLogin: {
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingBottom: 144,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginBottom: 32,
  },

  inputEmail: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
  },

  inputPassword: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    padding: 16,
  },

  showText: {
    position: "absolute",
    top: Platform.OS === "ios" ? -36 : -42,
    right: 32,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },

  goBtn: {
    borderRadius: 100,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    alignItems: "center",
  },

  goText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  registrationBtn: { alignItems: "center", marginHorizontal: 16 },

  registrationBtnText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});