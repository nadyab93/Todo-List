import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBin9C5MeKdJGFyjzgD7Ig9FrArVC6Ixqw",
  authDomain: "todo-list-58ef8.firebaseapp.com",
  projectId: "todo-list-58ef8",
  storageBucket: "todo-list-58ef8.appspot.com",
  messagingSenderId: "596504364648",
  appId: "1:596504364648:web:17244809132dafa5929ddd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)