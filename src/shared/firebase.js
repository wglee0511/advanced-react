import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2ArmjNTQdil2EXUAKID6zW5GLQecBa58",
  authDomain: "advanced-react-735a3.firebaseapp.com",
  projectId: "advanced-react-735a3",
  storageBucket: "advanced-react-735a3.appspot.com",
  messagingSenderId: "86411870204",
  appId: "1:86411870204:web:3d0a1f69091ecc6b023c79",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;

const firebaseAuth = firebase.auth();

const firebaseStore = firebase.firestore();

const firebaseStorage = firebase.storage();

export { firebaseAuth, firebaseStore, firebaseStorage, apiKey };
