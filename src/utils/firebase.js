// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYDkbTv4ZPpO7h-Uflbd4VtekBi2EoM8Q",
  authDomain: "cinemood-56b7f.firebaseapp.com",
  projectId: "cinemood-56b7f",
  storageBucket: "cinemood-56b7f.firebasestorage.app",
  messagingSenderId: "854241788324",
  appId: "1:854241788324:web:768cc349fa4f836ce94131",
  measurementId: "G-9C07Y23XKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();