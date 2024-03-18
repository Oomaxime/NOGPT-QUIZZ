import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { firebase } from './private/js/database.js';
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore';

import { get_data_database, add_data_database } from './private/js/manipulation_database.js';
import { createJsonFile, read_File } from './private/js/json_manipulation.js'

import { fileURLToPath } from 'url';
import path from 'path';    

import { create_page } from './private/js/create_qizz.js'

import fs from 'fs';


// Repertoire de travail
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app = express();
const port = 3000;

let NameQizzGlobal = ""

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'))


app.set('views', './view');
app.set('view engine', 'ejs');



app.get('', (req, res) => {
    res.render("index")
});

// Initialisation de Firestore
const db = getFirestore(firebase);


// Démarrage du serveur HTTP
app.listen(port, (err) => {
    console.info(`listening to : ${port}`);
});

app.post('/connexion', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Aucune donnée reçue');
    }

    const name = req.body.name;
    const firstname = req.body.firstname;

    if (!name || !firstname) {
        console.log('Nom:', name);
        console.log('Prénom:', firstname);
        return res.status(400).send('Champs manquants dans le formulaire');
    }    

    console.log('Nom:', name);
    console.log('Prénom:', firstname);

    const data = {
        where: 'etudiants',
        nom : '',
        prenom : '',
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
        }
    }

    data['nom'] = name
    data['prenom'] = firstname

    add_data_database(db, data)

    res.send(`Connexion réussie pour ${firstname} ${name}`);

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

            // Envoi des valeurs une fois que les deux collections ont été récupérées
            res.send([intervenants_data, etudiants_data, qizzSnapshot_data]);
        })
        .catch((error) => {
            // Gestion des erreurs ici
            console.error('Erreur lors de la récupération des données:', error);
            res.status(500).send('Erreur lors de la récupération des données');
        });
    });

    // const qizz_test = {
    //     question_1 : {
    //         type : "coche",
    //         title : "Que font 3 + 3 ?",
    //         content :{    
    //             coche_1 : {
    //                 text : "4",
    //                 is_true : false
    //             },
    //             coche_2 : {
    //                 text : "5",
    //                 is_true : false
    //             },
    //             coche_3 : {
    //                 text : "6",
    //                 is_true : true
    //             }},
    //     }
    // }

