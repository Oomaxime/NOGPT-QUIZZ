// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup #available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArqtlILhyHhFEmp5NUMChpsR3ooZmnaPI",
  authDomain: "qizz-d4c6b.firebaseapp.com",
  databaseURL: "https://qizz-d4c6b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "qizz-d4c6b",
  storageBucket: "qizz-d4c6b.appspot.com",
  messagingSenderId: "43576131512",
  appId: "1:43576131512:web:9e08cc786caca2f3c1594d"
};

// initalize firebase
const firebase = initializeApp(firebaseConfig);



export{firebase}
