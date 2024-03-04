// server.mjs (ou utilisez "type": "module" dans package.json)

import express from 'express';
import cors from 'cors';
import { get_data_database, add_data_database } from './private/js/manipulation_database.js';
import { firebase } from './private/js/database.js';

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


// Manipulation de json
import { createJsonFile, read_File } from './private/js/json_manipulation.js';


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


    const data = {
        nom : "Joe",
        prenom : "Fi",
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
            question_1 : ["coche_1"]
        }
    }

    const qizz_test = {
        question_1 : {
            type : "coche",
            title : "Que font 3 + 3 ?",
            content :{    
                coche_1 : {
                    text : "4",
                    is_true : false
                },
                coche_2 : {
                    text : "5",
                    is_true : false
                },
                coche_3 : {
                    text : "6",
                    is_true : true
                }},
        }
    }

    createJsonFile("tet.json", data)
    createJsonFile("data.json", qizz_test)

    const json_file = await read_File("tet.json")
    console.log(json_file)
    console.log(json_file.stats_triche.touches_sus.crtl)

