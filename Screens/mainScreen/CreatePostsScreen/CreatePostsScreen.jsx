import { createStackNavigator } from "@react-navigation/stack";
import PhotoScreen from "./PhotoScreen/PhotoScreen";
import MapScreen from "./MapScreen/MapScreen";
import DefaultScreen from "./DefaultScreen/DefaultScreen";
import { useState } from "react";

const AuthStack = createStackNavigator();

export default CreatePostsScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Создать публикацию"
        component={DefaultScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen name="Карта" component={MapScreen}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};
