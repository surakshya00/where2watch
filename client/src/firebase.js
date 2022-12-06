// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNncDGilKrSc-mnq6MHDzxSlIz1exl1aE",
  authDomain: "where2watch-68d1c.firebaseapp.com",
  projectId: "where2watch-68d1c",
  storageBucket: "where2watch-68d1c.appspot.com",
  messagingSenderId: "286159713398",
  appId: "1:286159713398:web:31704df3c254600fdd5b57",
  measurementId: "G-8X41P20VNH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);