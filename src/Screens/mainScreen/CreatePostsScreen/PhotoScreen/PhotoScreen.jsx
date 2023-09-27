import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";

export default PhotoScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();

      setPhoto(photo.uri);
    } catch (error) {
      console.log("Error taking photo: ", error.message);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const sendPhoto = () => {
    navigation.navigate("Публикации", { photo });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <TouchableOpacity style={styles.snap} onPress={takePhoto}>
          <Feather name="camera" size={24} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>
      <TouchableOpacity style={styles.send} onPress={sendPhoto}>
        <Text style={styles.sendText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    height: 300,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  snap: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  send: {
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sendText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});
