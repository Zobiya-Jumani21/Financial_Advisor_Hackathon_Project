// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDzSslIBjGTaUoGs6XMYSwSiPcszNoBofA",
  authDomain: "investment-portfolio-app-e68e9.firebaseapp.com",
  projectId: "investment-portfolio-app-e68e9",
  storageBucket: "investment-portfolio-app-e68e9.firebasestorage.app",
  messagingSenderId: "280599523031",
  appId: "1:280599523031:web:af01834d53ad56cba6ca92"
};

// Initialize Firebase (only once)
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
