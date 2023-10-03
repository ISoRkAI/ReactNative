import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import { db } from "../../../../../firebase/config";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

export const DefaultPostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const queryPosts = query(collection(db, "posts"));
    onSnapshot(queryPosts, (data) => {
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image source={{ uri: item.photo }} style={styles.postPhoto} />
            <Text
              style={{
                color: "#212121",
                fontSize: 16,
                fontWeight: "500",
                marginBottom: 8,
              }}
            >
              {item.photoName}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  navigation.navigate("MainScreen", { MapOpen: true });
                  navigation.navigate("Комментарии");
                }}
              >
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  style={{ marginRight: 6 }}
                />
                <Text
                  style={{
                    color: "#BDBDBD",
                    fontSize: 16,
                  }}
                >
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  navigation.navigate("MainScreen", { MapOpen: true });
                  navigation.navigate("Карта", { location: item.region });
                }}
              >
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={{
                    color: "#212121",
                    fontSize: 16,
                    textDecorationLine: "underline",
                  }}
                >
                  {item.region.country}, {item.region.region}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  postPhoto: { height: 240, borderRadius: 8, marginBottom: 8 },
});
