//import * as firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEafJyWS8sJFnhV6dOCHflyRg45oZ2zGg",
  authDomain: "duloops.firebaseapp.com",
  projectId: "duloops",
  storageBucket: "duloops.appspot.com",
  messagingSenderId: "14854024796",
  appId: "1:14854024796:web:8e3b7176f54a8794a70099",
  measurementId: "G-S0Q5NLEX5B"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export {app, storage, db};