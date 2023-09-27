import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { authSignUpUser } from "../../../redux/auth/authOperations";
import {
  Avatar,
  Container,
  ContainerForm,
  ImgBackground,
  Input,
  InputContainer,
  LogInBtn,
  LogInBtnText,
  PlusBtn,
  PlusImg,
  RegisterBtn,
  RegisterBtnText,
  ShowBtn,
  ShowText,
  Title,
} from "./RegistrationScreen.styled";

const initialState = {
  email: "",
  password: "",
  login: "",
};

export default RegistrationScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const dispatch = useDispatch();

  const SigInUser = () => {
    if (state.login !== "" && state.email !== "" && state.password !== "") {
      dispatch(authSignUpUser(state));
      setState(initialState);
    } else {
      setShowKeyboard(false);
      return alert("Fill in all the fields!!!");
    }
  };

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => keyboardHide()}>
      <Container>
        <ImgBackground source={require("../../../../assets/PhotoBG.png")}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <ContainerForm keyboardStatus={keyboardStatus}>
              <Avatar>
                <PlusBtn>
                  <PlusImg source={require("../../../../assets/add.png")} />
                </PlusBtn>
              </Avatar>
              <Title>Регистрация</Title>
              <InputContainer>
                <Input
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, login: value }))
                  }
                  onFocus={() => setKeyboardStatus(true)}
                  onSubmitEditing={() => setKeyboardStatus(false)}
                  value={state.login}
                  placeholder="Логин"
                ></Input>
                <Input
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  onFocus={() => setKeyboardStatus(true)}
                  onSubmitEditing={() => setKeyboardStatus(false)}
                  value={state.email}
                  placeholder="Адрес электронной почты"
                ></Input>
                <View style={{ marginBottom: 42 }}>
                  <Input
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    onFocus={() => setKeyboardStatus(true)}
                    onSubmitEditing={() => setKeyboardStatus(false)}
                    value={state.password}
                    placeholder="Пароль"
                    secureTextEntry={secureText}
                    marginBottom0={true}
                  ></Input>
                  <ShowBtn onPress={() => setSecureText(!secureText)}>
                    <ShowText>{secureText ? `Показать` : "Скрыть"}</ShowText>
                  </ShowBtn>
                </View>
              </InputContainer>
              <RegisterBtn onPress={() => SigInUser()}>
                <RegisterBtnText>Войти</RegisterBtnText>
              </RegisterBtn>
              <LogInBtn onPress={() => navigation.navigate("LogIn")}>
                <LogInBtnText>Уже есть аккаунт? Войти</LogInBtnText>
              </LogInBtn>
            </ContainerForm>
          </KeyboardAvoidingView>
        </ImgBackground>
      </Container>
    </TouchableWithoutFeedback>
  );
};
