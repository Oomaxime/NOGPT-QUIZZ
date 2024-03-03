// server.mjs (ou utilisez "type": "module" dans package.json)

import express from 'express';
import cors from 'cors';
import { get_data_database, add_data_database } from './manipulation_database.js';
import { firebase } from './database.js';

// Importation des modules Firestore spécifiques
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = express();
const port = 3000;
const path = 'path'

// Initialisation de Firestore
const db = getFirestore(firebase);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join('', 'public')))

// Vos routes et logique de gestion des requêtes ici...




app.get('/', (req, res) => {
    res.sendFile(express.join('', 'public', 'index.html'))
});

app.get('/id', (req, res) => {
    res.send('ca va etre les id des eleves lors du test ;)');
});

app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port : ${port}`);
});

app.get('/users', async (req, res) => {
    const intervenants = collection(db, 'intervenants');
    const etudiants = collection(db, 'etudiants');
    const qizz = collection(db, 'qizz')


    // Attente des deux promesses
    Promise.all([getDocs(intervenants), getDocs(etudiants), getDocs(qizz)])
        .then(([intervenantsSnapshot, etudiantsSnapshot, qizzSnapshot]) => {
            const intervenants_data = get_data_database(intervenantsSnapshot)

            const etudiants_data = get_data_database(etudiantsSnapshot)

            const qizzSnapshot_data = get_data_database(qizzSnapshot)

            
            const values = {
                where : "intervenants",
                nom : "koi",
                prenom : "feur"
            }

            // test_node-app-1  | Une erreur s'est produite lors de l'ajout de données :  ReferenceError: where is not defined
            // test_node-app-1  |     at add_data_database (file:///app/manipulation_database.js:89:36)
            // test_node-app-1  |     at file:///app/server.js:69:13

            add_data_database(db, values)

            // Envoi des valeurs une fois que les deux collections ont été récupérées
            res.send([intervenants_data, etudiants_data, qizzSnapshot_data]);
        })
        .catch((error) => {
            // Gestion des erreurs ici
            console.error('Erreur lors de la récupération des données:', error);
            res.status(500).send('Erreur lors de la récupération des données');
        });
    });




    // setDoc permet de creer ou d'eccraser un seul document
    // import { doc, setDoc } from "firebase/firestore"; 

    // // Add a new document in collection "cities"
    // await setDoc(doc(db, "cities", "LA"), {
    // name: "Los Angeles",
    // state: "CA",
    // country: "USA"
    // });
    // 
    // 

    // permet de mettre a jour les infos d'un doc
    // import { doc, updateDoc } from "firebase/firestore";

    // const washingtonRef = doc(db, "cities", "DC");

    // // Set the "capital" field of the city 'DC'
    // await updateDoc(washingtonRef, {
    // capital: true
    // });




    // to do :
    //     - finir la manipulation de la bdd en verifiant le fonctionnement de l'ajout et de la modification de donnees
    //     - tester la creation de pages personnaliser
    //     - appliquer les processus dans la vrai page
    // temps : 30min / 1h / 3h => (4h environ)
    // amelioration et temps supplementaire : 6h 
