// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-77eed.firebaseapp.com",
  projectId: "reactchat-77eed",
  storageBucket: "reactchat-77eed.appspot.com",
  messagingSenderId: "584108722537",
  appId: "1:584108722537:web:725fc46eb76b9ddd4515f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Call getAuth to initialize the auth object
const db = getFirestore(app); // Call getFirestore to initialize the Firestore object
const storage = getStorage(app); // Call getStorage to initialize the Storage object

export { auth, db, storage };















