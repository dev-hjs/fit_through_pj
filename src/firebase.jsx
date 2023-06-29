// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDC8cFneSkDavszFOKnqUBkzG3OFRIAQPE',
  authDomain: 'teamproject-e3fc2.firebaseapp.com',
  projectId: 'teamproject-e3fc2',
  storageBucket: 'teamproject-e3fc2.appspot.com',
  messagingSenderId: '833680902087',
  appId: '1:833680902087:web:52a7e1d9a346248e15fbe2'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
