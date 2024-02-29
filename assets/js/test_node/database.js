import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIltqBvGkmYY7U1eQ-2DS6RtIXBlKeJ_0",
  authDomain: "test-9eee6.firebaseapp.com",
  databaseURL: "https://test-9eee6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-9eee6",
  storageBucket: "test-9eee6.appspot.com",
  messagingSenderId: "946748674900",
  appId: "1:946748674900:web:6af9d63feaf78eb461eec1"
};

// initalize firebase
const firebase = initializeApp(firebaseConfig);



export{firebase}
