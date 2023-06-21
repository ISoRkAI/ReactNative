import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

export const authSignUpUser = createAsyncThunk(
  "auth / signUp ",
  async ({ login, email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const user = await auth.currentUser;
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        stateChange: true,
      };
      return userUpdateProfile;
    } catch (e) {
      console.log("signUp", e.message);
    }
  }
);
export const authSignInUser = createAsyncThunk(
  "auth / signIn ",
  async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        stateChange: true,
      };
      return userUpdateProfile;
    } catch (e) {
      console.log("signIn", e.message);
    }
  }
);

export const authSignOutUser = createAsyncThunk("auth/signOut", async () => {
  try {
    await signOut(auth);
  } catch (e) {
    console.log("signOut", e.message);
  }
});

export const authStateChahngeUser = createAsyncThunk(
  "auth/refreshUser",
  async () => {
    try {
      const user = await new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(user);
          } else {
            reject(new Error("User not found"));
          }
        });
      });
      if (user) {
        const userUpdateProfile = {
          userId: user.uid,
          login: user.displayName,
          email: user.email,
          stateChange: true,
        };
        return userUpdateProfile;
      }
      const userUpdateProfile = {
        userId: null,
        login: null,
        email: null,
        stateChange: false,
      };
      return userUpdateProfile;
    } catch (e) {
      console.log(e.message);
    }
  }
);
