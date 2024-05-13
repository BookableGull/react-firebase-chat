// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCs7hp1wOJpUq5qOKhz2PFqexrn2-mpyxM",
  authDomain: "reactchat-8a047.firebaseapp.com",
  projectId: "reactchat-8a047",
  storageBucket: "reactchat-8a047.appspot.com",
  messagingSenderId: "782691037530",
  appId: "1:782691037530:web:2bd0df3afa1084f2800363"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Call getAuth to initialize the auth object
const db = getFirestore(app); // Call getFirestore to initialize the Firestore object
const storage = getStorage(app); // Call getStorage to initialize the Storage object

export { auth, db, storage };















