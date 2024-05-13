// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-e4da9.firebaseapp.com",
  projectId: "reactchat-e4da9",
  storageBucket: "reactchat-e4da9.appspot.com",
  messagingSenderId: "875725126162",
  appId: "1:875725126162:web:a67a04fd5bd3dddcef76cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Call getAuth to initialize the auth object
const db = getFirestore(app); // Call getFirestore to initialize the Firestore object
const storage = getStorage(app); // Call getStorage to initialize the Storage object

export { auth, db, storage };














