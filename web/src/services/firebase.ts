import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJpUrRQIzhAeBQia35Sq0KZ0yIscKwJhY",
  authDomain: "my-recipes-455d4.firebaseapp.com",
  projectId: "my-recipes-455d4",
  storageBucket: "my-recipes-455d4.appspot.com",
  messagingSenderId: "718058767833",
  appId: "1:718058767833:web:5fedc0a22e742b8ee845c8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };
