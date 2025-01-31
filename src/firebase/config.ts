import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eventurelly-7f1cf.firebaseapp.com",
  databaseURL: "https://eventurelly-7f1cf-default-rtdb.firebaseio.com",
  projectId: "eventurelly-7f1cf",
  storageBucket: "eventurelly-7f1cf.firebasestorage.app",
  messagingSenderId: "475633793435",
  appId: "1:475633793435:web:379e9cfd58acf8a178093e",
  measurementId: "G-HMJXJDDBZ0"
};

  const app: FirebaseApp = initializeApp(config);


export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
