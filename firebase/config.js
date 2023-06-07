import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA74aoA-vECmWm9VCGyB9oKHBKlbkj6l8s",
  authDomain: "goitproject-reactnative.firebaseapp.com",
  projectId: "goitproject-reactnative",
  storageBucket: "goitproject-reactnative.appspot.com",
  messagingSenderId: "71737232826",
  appId: "1:71737232826:web:54d02c87a2bac6ff3ce183",
  measurementId: "G-T96LMKC9DQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
