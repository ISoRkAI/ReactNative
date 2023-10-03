import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthScreen } from "../Screens/auth/authScreen";
import { MainScreen } from "../Screens/mainScreen/MeinScreen";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { selectorUser } from "../redux/selectors";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  const isLoggedIn = useSelector(selectorUser);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="MainScreen"
            component={MainScreen}
          />
        ) : (
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="AuthScreen"
            component={AuthScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
