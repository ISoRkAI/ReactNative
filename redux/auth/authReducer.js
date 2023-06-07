import { createSlice } from "@reduxjs/toolkit";
import {
  authSignInUser,
  authSignOutUser,
  authSignUpUser,
  authStateChahngeUser,
} from "./authOperations";

const initialState = {
  user: { login: null, email: null, userId: null, stateChange: false },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authSignUpUser.fulfilled](state, { payload }) {
      state.user = payload;
    },
    [authSignUpUser.rejected](state, _) {
      state.user = {
        login: null,
        email: null,
        userId: null,
        stateChange: false,
      };
    },
    [authSignInUser.fulfilled](state, { payload }) {
      state.user = payload;
    },
    [authSignInUser.rejected](state, _) {
      state.user = {
        login: null,
        email: null,
        userId: null,
        stateChange: false,
      };
    },
    [authStateChahngeUser.fulfilled](state, { payload }) {
      state.user = payload;
    },
    [authStateChahngeUser.rejected](state, _) {
      state.user = {
        login: null,
        email: null,
        userId: null,
        stateChange: false,
      };
    },
    [authSignOutUser.fulfilled](state, _) {
      state.user = {
        login: null,
        email: null,
        userId: null,
        stateChange: false,
      };
    },
  },
});
