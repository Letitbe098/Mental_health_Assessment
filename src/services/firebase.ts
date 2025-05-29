import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHieLdsjcZRXXNogO38B-E9D8TE3KRv5U",
  authDomain: "mental-health-assessment-new.firebaseapp.com",
  projectId: "mental-health-assessment-new",
  storageBucket: "mental-health-assessment-new.firebasestorage.app",
  messagingSenderId: "824298955850",
  appId: "1:824298955850:web:01fa24865008e10768b2b3",
  measurementId: "G-PQVS59KTSD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;