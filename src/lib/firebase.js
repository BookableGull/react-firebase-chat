// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-e677a.firebaseapp.com",
  projectId: "reactchat-e677a",
  storageBucket: "reactchat-e677a.appspot.com",
  messagingSenderId: "765177028049",
  appId: "1:765177028049:web:dea323f04b6b04854814f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Call getAuth to initialize the auth object
const db = getFirestore(app); // Call getFirestore to initialize the Firestore object
const storage = getStorage(app); // Call getStorage to initialize the Storage object

export { auth, db, storage };
