import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: "firestore-pj-a9d9f.firebaseapp.com",
  projectId: "firestore-pj-a9d9f",
  storageBucket: "firestore-pj-a9d9f.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore
export const db = getFirestore(app);