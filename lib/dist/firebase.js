"use strict";
exports.__esModule = true;
exports.db = exports.auth = void 0;
// lib/firebase.ts
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var firestore_1 = require("firebase/firestore");
//  Your Firebase config
var firebaseConfig = {
    apiKey: "AIzaSyDzSslIBjGTaUoGs6XMYSwSiPcszNoBofA",
    authDomain: "investment-portfolio-app-e68e9.firebaseapp.com",
    projectId: "investment-portfolio-app-e68e9",
    storageBucket: "investment-portfolio-app-e68e9.firebasestorage.app",
    messagingSenderId: "280599523031",
    appId: "1:280599523031:web:af01834d53ad56cba6ca92"
};
// Initialize Firebase (only once)
var app = app_1.initializeApp(firebaseConfig);
// Export Auth & Firestore
exports.auth = auth_1.getAuth(app);
exports.db = firestore_1.getFirestore(app);
