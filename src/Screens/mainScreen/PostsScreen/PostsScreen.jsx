import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image, Text } from "react-native";

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image source={{ uri: item.photo }} style={styles.postPhoto} />
            <Text>{item.photoName}</Text>
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
    paddingHorizontal: 16,
  },
  postPhoto: { height: 240, borderRadius: 8, marginBottom: 8 },
});
