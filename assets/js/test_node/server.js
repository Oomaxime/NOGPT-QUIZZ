import express from 'express';
import cors from 'cors';
import { firebase } from './database.js';

const app = express();
const port = 3000;


import { collection, getDoc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore'

// initialisation firestore
const db = getFirestore(firebase)

app.use(cors())
app.use(express.json())



app.get('/', (req, res) => {
    res.send('QIIIIIIIIIIIIZZZZZZZZZZZ :)');
});

app.get('/id', (req, res) => {
    res.send('ca va etre les id des eleves lors du test ;)');
});

app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port : ${port}`);
});

app.get('/users', async (req, res) => {
    const professeurs = collection(db, 'professeurs');
    const eleves = collection(db, 'eleves');

    let professeurs_values = [];
    let eleves_values = [];

    // Attente des deux promesses
    Promise.all([getDocs(professeurs), getDocs(eleves)])
        .then(([professeursSnapshot, elevesSnapshot]) => {
            // Récupération des valeurs des professeurs
            professeursSnapshot.docs.forEach((doc) => {
                professeurs_values.push({ ...doc.data(), id: doc.id });
            });

            // Récupération des valeurs des élèves
            elevesSnapshot.docs.forEach((doc) => {
                eleves_values.push({ ...doc.data(), id: doc.id });
            });

            // Envoi des valeurs une fois que les deux collections ont été récupérées
            res.send([professeurs_values, eleves_values]);
        })
        .catch((error) => {
            // Gestion des erreurs ici
            console.error('Erreur lors de la récupération des données:', error);
            res.status(500).send('Erreur lors de la récupération des données');
        });
    });




