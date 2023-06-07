import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { AuthScreen } from "../Screens/auth/authScreen";
import { MainScreen } from "../Screens/mainScreen/MeinScreen";
import { authStateChahngeUser } from "../redux/auth/authOperations";
import { selectorUser } from "../redux/selectors";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authStateChahngeUser());
  }, []);

  return (
    <NavigationContainer>
      {selectorUser ? <MainScreen /> : <AuthScreen />}
    </NavigationContainer>
  );
};

export default Main;
