import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0IA-HglE6vxWLiCiikuf7fi7XopTAFew",
  authDomain: "session-eight.firebaseapp.com",
  projectId: "session-eight",
  storageBucket: "session-eight.appspot.com",
  messagingSenderId: "837874437779",
  appId: "1:837874437779:web:ff8363ae85abfa11588766",
  measurementId: "G-1LE5VLK1PM",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export { doc, setDoc };