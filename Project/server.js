import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { firebase } from './private/js/database.js';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { get_data_database, add_data_database } from './private/js/manipulation_database.js';
import { createJsonFile, read_File } from './private/js/json_manipulation.js';

import { fileURLToPath } from 'url';
import path from 'path';

import { create_page } from './private/js/create_qizz.js'


// Repertoire de travail
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app = express();
const port = 3000;

const db = getFirestore(firebase);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/qizztest', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/test_creation', (req, res) => {
    // page de test pour la creation du qizz
    res.sendFile(path.join(__dirname, 'view', 'creation.html'));
})

app.get('/connexion', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'connexion.html')); //faire le fichier html pour la page de connexion
})

app.get('/working', (req, res) => {
    const fileName = req.query.fileName;

    console.log('Received input data:', fileName);

    res.sendFile(path.join(__dirname, 'view', fileName));
});

app.post('/add_quiz', async(req, res) => {
    // post gerant pour l'instant le test de la creation du qizz dans la bdd

    

    // const name_qizz = req.body.nom_du_qizz;
    
    // try {
    //     const cache_qizz_data = await read_File(`./private/js/cache/${name_qizz}.json`);  
    //     console.log(cache_qizz_data); 
    // } catch (err) {
    //     console.log("erreur lors de la recherche du fichier",err);
    //     res.redirect('/test_creation');
    // }

});


app.post('/generate_quiz', async(req, res) => {
    // fonction test gerant la generation de qizz lors de la connexion d'un eleve


    // data simulant les donnees qui proviendront de la lecture du fichier json
    const data_qizz = {
        name : "mon_quizz",
        content : {
            question_1 : {
                title : "koi",
                type : "qcm",
                choices :[
                    {content : "feur",is_true : true}
                ]
            },
            question_2 : {
                title : "bonjour",
                type : "text"
            }
        }
    };

    // fileName devrait etre generer par rapport aux nom et prenom de l'eleve
    const fileName = "test.html"


    // ** **
    //  mettre un systeme de verifications des donnees
    // ** **

    //Creation de la page en fonction du chemin et de la data
    // ** **
    //  faire en sorte d'importer la data depuis la bdd 
    // ** **
    await create_page(data_qizz,  path.join(__dirname, 'view', fileName))

    
    // redirige l'user vers la page qui vient d'etre cree
    // il faut faire un js qui va permettre de faire des exports de donnees dans chaque fichier
    res.redirect(`/working?fileName=${fileName}`);
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
        } 
    }

    console.log(data)

    add_data_database(db, data)
        .then(() => {
            console.log('Données ajoutées avec succès à Firestore.');
        })
        .catch(error => {
            console.error("Une erreur s'est produite lors de l'ajout de données à Firestore:", error);
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});