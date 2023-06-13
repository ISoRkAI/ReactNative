import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import MapView from "react-native-maps";

export default MapScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
      <Marker />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
