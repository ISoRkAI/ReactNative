import { Feather } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectorAuth } from "../../../../redux/selectors";
import { db } from "../../../../../firebase/config";
import { collection, doc, query, setDoc } from "firebase/firestore";
import { useState } from "react";

export const CommentScreen = ({ route, navigation }) => {
  const [state, setState] = useState("");
  const { postId } = route.params;
  const logIn = useSelector(selectorAuth);

  useEffect(() => {
    navigation.addListener("transitionStart", () => {
      navigation.navigate("MainScreen", { screenOpen: false });
    });
  }, [navigation]);

  const createPost = async () => {
    await setDoc(doc(db, "posts", `${postId}`, "comments"), state);
  };
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 32,
        backgroundColor: "#ffffff",
      }}
    >
      <Text>CommentScreen</Text>
      <View
        style={{
          position: "absolute",
          bottom: 32,
          right: 16,
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <TextInput
          placeholder="Комментировать..."
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, value }))
          }
          style={{
            width: "100%",
            height: 50,
            borderRadius: "50%",
            backgroundColor: "#F6F6F6",
            borderWidth: 1,
            borderColor: "#E8E8E8",
            paddingLeft: 16,
          }}
        ></TextInput>
        <TouchableOpacity
          style={{
            position: "absolute",
            width: 34,
            height: 34,
            top: 9,
            right: 9,
            borderRadius: "50%",
            backgroundColor: "#FF6C00",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={createPost}
        >
          <Feather name="arrow-up" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
