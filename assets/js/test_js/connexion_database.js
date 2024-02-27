import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    "rules": {
        ".read": true,
        ".write": true
      }
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
async function get_qizz(db) {
  const qizzCol = collection(db, 'cities');
  const qizzSnapshot = await getDocs(qizzCol);
  const qizzList = qizzSnapshot.docs.map(doc => doc.data());
  return qizzList;
}




// Test de fonction qui ajoute des valeurs
async function add_quizz(db) {
    await setDoc(doc(db, "qizz"), {
        name:"Qizz1"
    });
}