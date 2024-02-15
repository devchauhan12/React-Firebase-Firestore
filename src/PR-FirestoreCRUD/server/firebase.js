// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKwThin9JeGbvT-STa9ALSTT389eC0QNg",
    authDomain: "react-firebase-a6737.firebaseapp.com",
    databaseURl: "https://react-firebase-a6737-default-rtdb.firebaseio.com/",
    projectId: "react-firebase-a6737",
    storageBucket: "react-firebase-a6737.appspot.com",
    messagingSenderId: "454103379876",
    appId: "1:454103379876:web:b28cafdaf853e138c2db31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);