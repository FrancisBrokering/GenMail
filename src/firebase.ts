import { initializeApp } from "firebase/app";
// import { getDatabase, ref, set, onValue, remove } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9jSqqATZpLZPoacSEnUAFqEgB8N1DRmo",
  authDomain: "genplate-952bd.firebaseapp.com",
  projectId: "genplate-952bd",
  storageBucket: "genplate-952bd.appspot.com",
  messagingSenderId: "881648618740",
  appId: "1:881648618740:web:c070eb75d406d39f0ca2a1",
  measurementId: "G-QWP8MCDNRZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubAuthProvider = new GithubAuthProvider();

export { auth, googleProvider, facebookProvider, githubAuthProvider };