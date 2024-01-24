// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBxtQQfa_aPMIAkFtU9azkqoKvtZn8PY1Y",
  authDomain: "disneyclone-2b1d2.firebaseapp.com",
  projectId: "disneyclone-2b1d2",
  storageBucket: "disneyclone-2b1d2.appspot.com",
  messagingSenderId: "828156657043",
  appId: "1:828156657043:web:e186507c59c780962f3c66",
  measurementId: "G-S2G43M2HC9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider()
export {app, auth, provider, firestore};