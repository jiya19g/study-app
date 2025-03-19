// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9L4OsFZhdOpBAF6ZPcg9X1ermNpHLj8w",
  authDomain: "studybuddy-db5f6.firebaseapp.com",
  projectId: "studybuddy-db5f6",
  storageBucket: "studybuddy-db5f6.firebasestorage.app",
  messagingSenderId: "61198188216",
  appId: "1:61198188216:web:62547ef5414db6c2f9fe4d",
  measurementId: "G-MN8GSV4005"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
//const analytics = getAnalytics(app); // Optional: Only if you're using analytics

// Export the services
export { auth, firestore, GoogleAuthProvider };