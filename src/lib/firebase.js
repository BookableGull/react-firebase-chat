// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-7f1a6.firebaseapp.com",
  projectId: "reactchat-7f1a6",
  storageBucket: "reactchat-7f1a6.appspot.com",
  messagingSenderId: "245218741740",
  appId: "1:245218741740:web:763c2f44124d7b2348c4c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Call getAuth to initialize the auth object
const db = getFirestore(app); // Call getFirestore to initialize the Firestore object
const storage = getStorage(app); // Call getStorage to initialize the Storage object

export { auth, db, storage };















