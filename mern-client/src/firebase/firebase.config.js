// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6u8vouRnAXOoB9AMnop6OVfMU2HTjIKs",
  authDomain: "book-inventory-edc73.firebaseapp.com",
  projectId: "book-inventory-edc73",
  storageBucket: "book-inventory-edc73.appspot.com",
  messagingSenderId: "585668330309",
  appId: "1:585668330309:web:c8f43289416dfca17e342c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
