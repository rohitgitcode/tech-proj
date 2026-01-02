// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVpNlu5RdftYpgzEKoHddWHhwYGYStTPQ",
  authDomain: "saferoute-fb.firebaseapp.com",
  projectId: "saferoute-fb",
  storageBucket: "saferoute-fb.firebasestorage.app",
  messagingSenderId: "211295220916",
  appId: "1:211295220916:web:fbaaab042fecb0fc7953e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
