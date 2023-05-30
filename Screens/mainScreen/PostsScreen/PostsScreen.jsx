import { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";

export default PostsScreen = ({ route }) => {
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
            <Image
              source={{ uri: item.photo }}
              style={{ marginHorizontal: 10, height: 200 }}
            />
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
  },
});
