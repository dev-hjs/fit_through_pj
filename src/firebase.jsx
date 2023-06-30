// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDAb4u6GYL8dDwUbDY7KCwiR2GcCG9Tjgs',
  authDomain: 'fit-through-41507.firebaseapp.com',
  projectId: 'fit-through-41507',
  storageBucket: 'fit-through-41507.appspot.com',
  messagingSenderId: '789190750446',
  appId: '1:789190750446:web:c529fcdc708d2466d0c3ff'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { signOut };
