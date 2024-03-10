import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { firebase } from './private/js/database.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { get_data_database, add_data_database } from './private/js/manipulation_database.js';
import { createJsonFile, read_File } from './private/js/json_manipulation.js';

import { fileURLToPath } from 'url';
import path from 'path';


// Repertoire de travail
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app = express();
const port = 3000;

<<<<<<< HEAD
=======
// Initialisation de Firestore
>>>>>>> a2458ca42cbc29b876dad4eff316f516dfb3d28e
const db = getFirestore(firebase);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.post('/submit', (req, res) => {
    const name = req.body.name;
    const firstname = req.body.firstname;

    const data = {
        where: 'etudiants',
        nom : name,
        prenom : firstname,
        stats_triche : {
            touches_sus : {
                crtl : 0,
                alt : 0,
                tab : 0,
                cmd : 0,
                opt : 0,
                funct : 0
            },
            windows : {
                fullscreen : false,
                exit : false,
                cursor : false
            }
        },
        stats : {
<<<<<<< HEAD
            
        } 
    }

    console.log(data)
=======
            koi:"feur"
        }
    };
>>>>>>> a2458ca42cbc29b876dad4eff316f516dfb3d28e

    add_data_database(db, data)
        .then(() => {
            console.log('Données ajoutées avec succès à Firestore.');
            res.status(200).send('Données ajoutées avec succès.'); // Envoyer une réponse au client
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de l'ajout de données à Firestore:", error);
            res.status(500).send("Une erreur s'est produite lors de l'ajout de données à Firestore.");
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});