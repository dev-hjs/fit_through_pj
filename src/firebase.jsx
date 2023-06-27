// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC9AsrMHB0CPD6uX0HEZMZJOe-HXeKbOk",
  authDomain: "react-news-feed-cba27.firebaseapp.com",
  projectId: "react-news-feed-cba27",
  storageBucket: "react-news-feed-cba27.appspot.com",
  messagingSenderId: "277080772057",
  appId: "1:277080772057:web:d059eab37e8493cfc85dc8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
