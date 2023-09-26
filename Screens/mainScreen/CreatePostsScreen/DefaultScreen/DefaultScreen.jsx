import { useEffect, useState } from "react";
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
import { db, storage } from "../../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { nanoid } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { useSelector } from "react-redux";

export default DefaultScreen = ({ navigation, route }) => {
  const [_, setKeyboardStatus] = useState();
  const [photoName, setPhotoName] = useState("");
  const [camera, setCamera] = useState(null);
  const [goCamera, setGoCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [region, setRegion] = useState(null);

  const { userId, login } = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!route.params) {
      return;
    }
    setRegion(route.params.region[0]);
  }, [route]);

  const takePhoto = async () => {
    try {
      const photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
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

  const uploadPhotoToServer = async () => {
    try {
      const id = nanoid();
      const storageRef = ref(storage, `photos/${id}`);
      const response = await fetch(photo);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const processedPhoto = await getDownloadURL(storageRef);
      return processedPhoto;
    } catch (error) {
      console.log("error", error);
    }
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      console.log("photo", photo);
      const createPost = await addDoc(collection(db, "posts"), {
        photo,
        photoName,
        region,
        userId,
        login,
      });
      console.log(
        "photo,photoName,region,userId,login",
        photo,
        photoName,
        region,
        userId,
        login
      );
      console.log("createPost", createPost);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const sendPhoto = () => {
    navigation.navigate("Публикации", { region, photo, photoName });
    uploadPostToServer();
    setCamera(null),
      setPhoto(null),
      setGoCamera(null),
      setPhotoName(""),
      setRegion(null);
  };
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
          onChangeText={(value) => setPhotoName(value)}
          value={photoName}
          onFocus={() => setKeyboardStatus(true)}
        ></TextInput>
        <TouchableOpacity
          style={styles.mapBtn}
          onPress={() => navigation.navigate("Карта")}
        >
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            style={{ marginRight: 4 }}
          />
          {region ? (
            <Text style={styles.mapBtnTextActive}>
              {region.country}, {region.city}, {region.name}
            </Text>
          ) : (
            <Text style={styles.mapBtnText}>Местность...</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          disabled={photoName.length !== 0 && photo ? false : true}
          style={
            photoName.length !== 0 && photo
              ? styles.send
              : { ...styles.send, backgroundColor: "#F6F6F6" }
          }
          onPress={() => {
            sendPhoto();
          }}
        >
          <Text
            style={
              photoName.length !== 0 && photo
                ? styles.sendText
                : {
                    ...styles.sendText,
                    color: "#BDBDBD",
                  }
            }
          >
            Опубликовать
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.delete}
          onPress={() => {
            setCamera(null), setPhoto(null), setGoCamera(null);
            setPhotoName(""), setRegion(null);
          }}
        >
          <Feather name="trash-2" size={24} color="#DADADA" />
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
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
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
  mapBtnTextActive: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
  },
  sendText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  delete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "45%",
  },
});
