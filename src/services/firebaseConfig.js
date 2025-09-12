

// src/services/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase project configuration - 
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

/*
initializeApp(firebaseConfig) → Connects your app to your Firebase project.
getAuth(app) → Enables Firebase Authentication (login/signup users).
getFirestore(app) → Connects to Firestore database (store and read data).
getAnalytics(app) → Tracks user behavior in your app (optional).
Basically, it prepares Firebase services so you can use them anywhere in your React app by importing
*/