import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

export default DefaultScreen = ({ navigation }) => {
  const [_, setKeyboardStatus] = useState();
  const [photoName, setPhotoName] = useState("");
  const [camera, setCamera] = useState(null);
  const [goCamera, setGoCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);

      const regionName = await Location.reverseGeocodeAsync({
        longitude: location.longitude,
        latitude: location.latitude,
      });
      setRegion(regionName);
    } catch (error) {
      console.log("Error taking photo: ", error.message);
    }
  };

  const runCamera = () => {
    setGoCamera(true);
  };

  const removePhoto = () => {
    setPhoto(null);
  };

  const keyboardHide = () => {
    setKeyboardStatus(false);
    Keyboard.dismiss();
  };
  console.log("region", region);
  console.log("location", location);
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {goCamera ? (
          <>
            {photo ? (
              <View
                style={{
                  marginBottom: 8,
                }}
              >
                <Image
                  source={{ uri: photo }}
                  style={{
                    height: 240,
                    borderRadius: 8,
                  }}
                />

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={removePhoto}
                >
                  <Feather name="trash-2" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ borderRadius: 8, overflow: "hidden" }}>
                <Camera style={styles.camera} ref={setCamera}>
                  <TouchableOpacity style={styles.PhotoBtn} onPress={takePhoto}>
                    <Feather name="camera" size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </Camera>
              </View>
            )}
          </>
        ) : (
          <View style={styles.photoContainer}>
            <TouchableOpacity style={styles.PhotoBtn} onPress={runCamera}>
              <Feather name="camera" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={{ marginBottom: 32 }}>
          <Text style={styles.AddPhotoText}>Загрузите фото</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.inputName}
          placeholder="Название..."
          onChangeText={(value) =>
            setPhotoName((prevState) => ({
              ...prevState,
              value,
            }))
          }
          value={photoName}
          onFocus={() => setKeyboardStatus(true)}
        ></TextInput>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => navigation.navigate("Карта", { location })}
        >
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.mapBtnText}>
            {!region
              ? "Местность..."
              : `${region[0].country}, ${region[0].city} `}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.send}>
          <Text style={styles.sendText}>Опубликовать</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  camera: {
    height: 240,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 8,
  },
  send: {
    height: 50,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  photoContainer: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  PhotoBtn: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  AddPhotoText: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  removeBtn: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 60,
    height: 60,
    borderRadius: "50%",

    alignItems: "center",
    justifyContent: "center",
  },
  inputName: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
    placeholder: { color: "red" },
  },
  mapBtn: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 32,
    alignItems: "center",
  },
  mapBtnText: { color: "#BDBDBD" },
  sendText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});
