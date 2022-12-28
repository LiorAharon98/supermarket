// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAF6vfbzdGrUJuBajrTUjr3HA3vRNnYvrQ",
  authDomain: "supermarket-ace60.firebaseapp.com",
  projectId: "supermarket-ace60",
  storageBucket: "supermarket-ace60.appspot.com",
  messagingSenderId: "521971311024",
  appId: "1:521971311024:web:db0d061e6bd731380eb675",
  measurementId: "G-4JQBRLWVYQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
