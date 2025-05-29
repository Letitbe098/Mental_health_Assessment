import { initializeApp, getApps, getApp } from 'firebase/app';
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

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;