import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthScreen } from "../Screens/auth/authScreen";
import { MainScreen } from "../Screens/mainScreen/MeinScreen";
import { authStateChangeUser } from "../redux/auth/authOperations";
import { selectorUser } from "../redux/selectors";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);
  const isLoggedIn = useSelector(selectorUser);
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainScreen /> : <AuthScreen />}
    </NavigationContainer>
  );
};

export default Main;
