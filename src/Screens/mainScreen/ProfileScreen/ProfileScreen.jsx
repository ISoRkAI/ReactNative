import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

export const ProfileScreen = () => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut}>
        <Text>signOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
