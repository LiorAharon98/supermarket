import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUyJxktRcXYNIy4g7VYbiQqDUm51l0SMM",
  authDomain: "shopping-cart-e1c9e.firebaseapp.com",
  projectId: "shopping-cart-e1c9e",
  storageBucket: "shopping-cart-e1c9e.appspot.com",
  messagingSenderId: "474995265495",
  appId: "1:474995265495:web:edeb31036697269f2fc592",
  measurementId: "G-5S689VWS0V",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
