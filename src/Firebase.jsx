// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNIDjZf2TSqpiMp7PIcapGKGbyfMldgMk",
  authDomain: "velomark-project.firebaseapp.com",
  databaseURL: "https://velomark-project-default-rtdb.firebaseio.com",
  projectId: "velomark-project",
  storageBucket: "velomark-project.appspot.com",
  messagingSenderId: "1099099261610",
  appId: "1:1099099261610:web:417065e5816bd9814e9ed3",
  measurementId: "G-G1QRL9LS9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const database = getDatabase(app);

// Export the database for use in other files
export { database };