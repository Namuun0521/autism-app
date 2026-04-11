import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5ASAUwt38hVdPbx14uvrGNVktFfpUjvw",
  authDomain: "autism-app-8bb7e.firebaseapp.com",
  projectId: "autism-app-8bb7e",
  storageBucket: "autism-app-8bb7e.firebasestorage.app",
  messagingSenderId: "881587466096",
  appId: "1:881587466096:android:ad852b5d3668a2a97169b5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Түр зуур: гарах
signOut(auth);
