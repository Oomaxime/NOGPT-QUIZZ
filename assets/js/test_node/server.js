// server.mjs (ou utilisez "type": "module" dans package.json)

import express from 'express';
import cors from 'cors';
import { get_data_database, add_data_database } from './manipulation_database.js';
import { firebase } from './database.js';

// Importation pour HTLM
import http from 'http';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Importation des modules Firestore
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const app = express();
const port = 8080;
const port_express = 3000;


// Initialisation de Firestore
const db = getFirestore(firebase);

app.use(cors());
app.use(express.json());



// Vos routes et logique de gestion des requêtes ici...

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html');

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('erreur : ${err}')
            return;
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    });
});



server.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});

app.listen(port_express, () => {
    console.log(`Serveur Express en cours d'exécution sur le port : ${port_express}`);
});

app.get('/id', (req, res) => {
    res.send('ca va etre les id des eleves lors du test ;)');
});

app.get('/id', (req, res) => {
    res.send('ca va etre les id des eleves lors du test ;)');
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

            const values_qizz = {
                where : "qizz",
                nom : "test",
                data : {},
                creator_id : "ta_race"
            }

            // format pour values :
            // {where:"intervenants",nom:"nom",prenom:"prenom"}
            // {where:"qizz", nom:"nom", data:{data}, creator_id:"id"}
            


            // test_node-app-1  | Une erreur s'est produite lors de l'ajout de données :  ReferenceError: where is not defined
            // test_node-app-1  |     at add_data_database (file:///app/manipulation_database.js:89:36)
            // test_node-app-1  |     at file:///app/server.js:69:13

            add_data_database(db, values)
            add_data_database(db, values_qizz)

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
