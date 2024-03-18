import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { firebase } from './private/js/database.js';
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore';

import { get_data_database, add_data_database, update_data_database } from './private/js/manipulation_database.js';
import { createJsonFile, read_File } from './private/js/json_manipulation.js'

import { fileURLToPath } from 'url';
import path from 'path';    

import { create_page } from './private/js/create_qizz.js'


// Repertoire de travail
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app = express();
const port = 3000;

// Démarrage du serveur HTTP
app.listen(port, (err) => {
    console.info(`listening to : ${port}`);
});

// Initialisation de Firestore
const db = getFirestore(firebase);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

let NameQizzGlobal = ""


app.set('views', './view');
app.set('view engine', 'ejs');



app.get('/qizztest', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/test_creation', (req, res) => {
    // page de test pour la creation du qizz
    res.sendFile(path.join(__dirname, 'view', 'creation.html'));
})

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

app.post('/submit', async(req, res) => {
    const name = req.body.name;
    const firstname = req.body.firstname;

    const data = {
        nom : "j'calle_le_petard_entre_mes_dents",
        creator_id : "1111",
        data : {
            reponse : "bah oe bah oe"
        },
        students : {
            triche : false,
            data : {
                question_1 : {
                    test : "test"
                },
            }
        },
    }

    console.log(data)

    try {
        await add_data_database(db, 'qizz', data);
        console.log('Données ajoutées avec succès à Firestore.');

        // Mettre à jour le champ "questions" en utilisant arrayUnion()
        await update_data_database(db, 'qizz', "j'calle_le_petard_entre_mes_dents", 'questions', { triche : true });

        await update_data_database(db, 'qizz', "j'calle_le_petard_entre_mes_dents", 'students', 'question_2', {key:"asd"});

        await update_data_database(db, 'qizz', "j'calle_le_petard_entre_mes_dents", 'students', 'question_3', true);

        res.status(200).send('Données soumises avec succès.');
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout ou de la mise à jour des données à Firestore:", error);
        res.status(500).send('Une erreur s\'est produite lors du traitement de votre demande.');
    }
});

app.post('/send_answer', async(req, res) => {
    const formData = req.body;
})

app.post('/submit_code', async(req, res) => {
    console.log(req.body)

})
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});