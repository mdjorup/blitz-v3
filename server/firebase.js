import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
const dotenv = require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blitz-v0.firebaseapp.com",
  projectId: "blitz-v0",
  storageBucket: "blitz-v0.appspot.com",
  messagingSenderId: "482384035084",
  appId: "1:482384035084:web:dca13ae351bec25ea89d29",
  measurementId: "G-8P297KP5DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}

