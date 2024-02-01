import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7SesTR84WDmjs-LKz_HBHjW6kDqwAosI",
  authDomain: "botgpt-52bd5.firebaseapp.com",
  projectId: "botgpt-52bd5",
  storageBucket: "botgpt-52bd5.appspot.com",
  messagingSenderId: "140926756682",
  appId: "1:140926756682:web:d7ca90b4918b5940df43b3",
  measurementId: "G-3Z3CD2FDHY",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
