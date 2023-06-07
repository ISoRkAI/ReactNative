import { createStackNavigator } from "@react-navigation/stack";
import PhotoScreen from "./PhotoScreen/PhotoScreen";
import DefaultScreen from "./DefaultScreen/DefaultScreen";

const AuthStack = createStackNavigator();

export default CreatePostsScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen
        name="DefaultScreen"
        component={DefaultScreen}
      ></AuthStack.Screen>
      {/* <AuthStack.Screen
        name="PhotoScreen"
        component={PhotoScreen}
      ></AuthStack.Screen> */}
    </AuthStack.Navigator>
  );
};
