// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCccFqitO5lBg-RXuwO19hsSWq5wsqyRQ",
  authDomain: "innovate-14042.firebaseapp.com",
  projectId: "innovate-14042",
  storageBucket: "innovate-14042.appspot.com",
  messagingSenderId: "487391069661",
  appId: "1:487391069661:web:9d26c184915ef6ecb7a234",
  measurementId: "G-9FH9MG23YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;