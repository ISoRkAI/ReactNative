import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyA74aoA-vECmWm9VCGyB9oKHBKlbkj6l8s",
  authDomain: "goitproject-reactnative.firebaseapp.com",
  databaseURL: "https://goitproject-reactnative-default-rtdb.firebaseio.com",
  projectId: "goitproject-reactnative",
  storageBucket: "goitproject-reactnative.appspot.com",
  messagingSenderId: "71737232826",
  appId: "1:71737232826:web:54d02c87a2bac6ff3ce183",
  measurementId: "G-T96LMKC9DQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
