// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwBJc46nS1I_wjvJh6xSxCbFfE0EDSDtY",
  authDomain: "facebook-clone-a7212.firebaseapp.com",
  projectId: "facebook-clone-a7212",
  storageBucket: "facebook-clone-a7212.appspot.com",
  messagingSenderId: "287441091510",
  appId: "1:287441091510:web:d24c223e689df828ff9f17",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
