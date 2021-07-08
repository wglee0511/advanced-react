import { createSlice } from "@reduxjs/toolkit";
import { delCookie, setCookie } from "../../shared/Cookie";
import { firebaseAuth } from "../../shared/firebase";
import firebase from "firebase/app";

const initialState = {
  user: null,
  is_login: false,
};

const user = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    actionLogin: (state, action) => {
      setCookie("is_login", "success");
      state.user = action.payload;
      state.is_login = true;
    },
    actionLogout: (state, action) => {
      delCookie("is_login");
      state.user = null;
      state.is_login = false;
    },
    actionSetuser: (state, action) => {
      state.user = action.payload;
      state.is_login = true;
    },
  },
});

// middleware acions

export const actionLoginCheckForFirebase =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      await firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          dispatch(
            actionSetuser({
              user_name: user.displayName,
              id: user.email,
              user_profile: "",
              uid: user.uid,
            })
          );
        } else {
          dispatch(actionLogout());
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

export const actionLoginForFirebase =
  (id, pwd) =>
  async (dispatch, getState, { history }) => {
    try {
      await firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      try {
        const currentUser = await firebaseAuth.signInWithEmailAndPassword(
          id,
          pwd
        );
        dispatch(
          actionSetuser({
            user_name: currentUser.user.displayName,
            id: id,
            user_profile: "",
            uid: currentUser.user.uid,
          })
        );
        history.push("/");
      } catch (error) {
        window.alert(error.message);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

export const actionSignupForFirebase =
  (id, password, user_name) =>
  async (dispatch, getState, { history }) => {
    try {
      await firebaseAuth.createUserWithEmailAndPassword(id, password);
      try {
        await firebaseAuth.currentUser.updateProfile({
          displayName: user_name,
        });
        try {
          const currentUser = await firebaseAuth.currentUser;
          console.log(currentUser);
          dispatch(
            actionSetuser({
              user_name,
              id,
              user_profile: "",
              uid: currentUser.uid,
            })
          );
          history.push("/login");
        } catch (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

export const actionLogoutForFirebase =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      await firebaseAuth.signOut();
      dispatch(actionLogout());
      history.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

export const { actionLogin, actionLogout, actionGetuser, actionSetuser } =
  user.actions;

export default user;
