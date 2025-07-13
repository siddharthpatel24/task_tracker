import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDranJuEY3nGiMtGCnfygdNUDnKRkh5tUI",
  authDomain: "task-tracker-e3a15.firebaseapp.com",
  projectId: "task-tracker-e3a15",
  storageBucket: "task-tracker-e3a15.appspot.com",
  messagingSenderId: "791283701471",
  appId: "1:791283701471:web:f2ffcfd0c67b9774aa3b6a",
  measurementId: "G-HF38EGH52B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
queueMicrotask