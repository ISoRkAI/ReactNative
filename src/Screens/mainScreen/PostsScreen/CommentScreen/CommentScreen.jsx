import { Feather } from "@expo/vector-icons";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export const CommentScreen = () => {
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
        >
          <Feather name="arrow-up" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
