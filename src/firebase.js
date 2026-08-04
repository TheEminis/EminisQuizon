import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5-DHPt7wtv6V0-juwRYjpuBjpI5XVUzo",
  authDomain: "eminisquizon-e671e.firebaseapp.com",
  projectId: "eminisquizon-e671e",
  storageBucket: "eminisquizon-e671e.firebasestorage.app",
  messagingSenderId: "861731086047",
  appId: "1:861731086047:web:703b9dda428ec064e6536a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);