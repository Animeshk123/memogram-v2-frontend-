import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDasF4Yj0UcO7vW0rPJJk50zTBKCy-CfXw",
  authDomain: "social-media-devlopment.firebaseapp.com",
  projectId: "social-media-devlopment",
  storageBucket: "social-media-devlopment.appspot.com",
  messagingSenderId: "9560977238",
  appId: "1:9560977238:web:7ce8cd7c830579bce5b0f7"
});

export const auth = getAuth();
export const storage = getStorage(app);
export default app;