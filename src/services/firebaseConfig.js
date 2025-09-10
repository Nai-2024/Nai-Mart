

// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtqlW5Zcx3l-3urozLOdDnLKHdvrQ8eZg",
  authDomain: "naimart-d977d.firebaseapp.com",
  projectId: "naimart-d977d",
  storageBucket: "naimart-d977d.appspot.com",
  messagingSenderId: "1039689763442",
  appId: "1:1039689763442:web:5c99752a33dde26ad310eb",
  measurementId: "G-45GESNRFNM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);       // Firebase Authentication
const db = getFirestore(app);    // Firestore Database

export { app, analytics, auth, db, firebaseConfig };
