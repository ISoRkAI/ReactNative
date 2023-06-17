import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";

export default MapScreen = ({ route }) => {
  const { latitude } = route.params.location;
  const { longitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
      ></MapView>
      {/* <Marker /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
