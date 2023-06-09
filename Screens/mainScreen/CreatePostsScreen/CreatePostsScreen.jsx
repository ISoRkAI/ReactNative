import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import PhotoScreen from "./PhotoScreen/PhotoScreen";
import MapScreen from "./MapScreen/MapScreen";
import DefaultScreen from "./DefaultScreen/DefaultScreen";
import { useEffect, useState } from "react";
import { getHeaderTitle } from "@react-navigation/elements";
import { TouchableOpacity, View } from "react-native";

const AuthStack = createStackNavigator();

export default CreatePostsScreen = ({ navigation }) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{
          headerBackVisible: true,
          headerBackTitleVisible: true,
          headerBackTitle: "Назад",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Публикации")}
              title="back"
              style={{ marginLeft: 16 }}
            >
              <View>
                <Feather name="arrow-left" size={24} color="black" />
              </View>
            </TouchableOpacity>
          ),
        }}
        name="Создать публикацию"
        component={DefaultScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        options={{ headerBackTitle: "Назад" }}
        name="Карта"
        component={MapScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
