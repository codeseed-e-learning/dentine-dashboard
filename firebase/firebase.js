// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLMbRkwjQEByDPB0fvIEmsoQunhx7xGG4",
  authDomain: "dentine-mobile.firebaseapp.com",
  projectId: "dentine-mobile",
  storageBucket: "dentine-mobile.firebasestorage.app",
  messagingSenderId: "523870163604",
  appId: "1:523870163604:web:4e9e2db86d00a42b429a81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {app , db}