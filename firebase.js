// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgcXimdv-DYhWJe2gRiQTboDzqnUaFca4",
  authDomain: "flashcardsaas-82f81.firebaseapp.com",
  projectId: "flashcardsaas-82f81",
  storageBucket: "flashcardsaas-82f81.appspot.com",
  messagingSenderId: "73813152475",
  appId: "1:73813152475:web:c7cb077b5774a14b45f2fe",
  measurementId: "G-MXZMNYB8EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db}