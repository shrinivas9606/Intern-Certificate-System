// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjtL8UpRrDZZOP2e5Xvr54bbVR3lTJ-EA",
    authDomain: "interncert-bf431.firebaseapp.com",
    databaseURL: "https://interncert-bf431-default-rtdb.firebaseio.com",
    projectId: "interncert-bf431",
    storageBucket: "interncert-bf431.firebasestorage.app",
    messagingSenderId: "824814245395",
    appId: "1:824814245395:web:7716bf8f155ce3e96391e6",
    measurementId: "G-87K1VYPGLX"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { database, auth };
