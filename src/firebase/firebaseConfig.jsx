import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjttnDK5jjfZGO75Lh3zXPAwGtnxqNBLs",
  authDomain: "task-mangement-ec108.firebaseapp.com",
  projectId: "task-mangement-ec108",
  storageBucket: "task-mangement-ec108.firebasestorage.app",
  messagingSenderId: "300469995131",
  appId: "1:300469995131:web:df3cedaf882a994ed104de"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export default firebaseApp;
