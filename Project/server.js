import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { firebase } from './private/js/database.js';
import { getFirestore, collection, getDoc, getDocs } from 'firebase/firestore';

import { get_data_database, add_data_database, update_data_database,  create_cheater_data, get_cheater_score } from './private/js/manipulation_database.js';
import { createJsonFile, read_File } from './private/js/json_manipulation.js'

import { fileURLToPath } from 'url';
import path from 'path';    

import { create_page } from './private/js/create_qizz.js'


import fs from 'fs';
import { log } from 'console';


// Repertoire de travail
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialisation de l'application Express
const app = express();
const port = 3000;

// Initialisation de Firestore
const db = getFirestore(firebase);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


let NameQizzGlobal = ""


app.set('views', './view');
app.set('view engine', 'ejs');






// ==========================================
// 
//                  GET
// 
// ==========================================




// Permet de creer des qizz
// A faire : un systeme de pret connexion permettant aux intervenants de consulter d'anciens qizz et de creer des nouveaux
app.get('/creation', (req, res) => {
    // page de test pour la creation du qizz
    res.sendFile(path.join(__dirname, 'view', 'creation.html'));
})




// Permet a l'user de se conencter a un qizz
// Il devra rentrer :
// - Nom
// - Prenom
// - Nom du qizz
// Quand cela est fait il validera le forme, actionnant /redirect
app.get('/connexion', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'login.html'));
})

app.get('/goulag', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'gindex.html'));
})


// recupere dans un post :
// - data_received : le nom du qizz
// - name : le nom de l'user
// - firstname : le prenom de l'user
// et envoie l'user sur la page correspondant a data_received
app.get('/working', (req, res) => {
    const data_received = req.query.data_received;
    const name = req.query.name;
    const firstname = req.query.firstname;

    // console.log('Received input data:', data_received, name, firstname);

    for (let ele in ["creation","login","index"]){
        if (ele === data_received) {
            console.log("un malin a tenter de se connecter a une page interdite d'acces");
            res.redirect("/connexion");
        }
    }

    try {
        let htmlContent = fs.readFileSync(`./view/${data_received}.html`, 'utf-8');

        htmlContent = htmlContent.replace('<input type="hidden" id="name" name="name" value="name_student">', `<input type="hidden" id="name" name="name" value="${name}">`);
        htmlContent = htmlContent.replace('<input type="hidden" id="firstname" name="firstname" value="firstname_student">', `<input type="hidden" id="firstname" name="firstname" value="${firstname}">`);
        htmlContent = htmlContent.replace('<input type="hidden" id="qizz" name="qizz" value="qizz_student">', `<input type="hidden" id="qizz" name="qizz" value="${data_received}">`);

        res.send(htmlContent);
    } catch(err) {
        console.log("user tried to connect but an error occured :",err);
        res.redirect("/connexion");
    }
});
  
app.get('/api/get-cheater-score/:name/:firstname', async (req, res) => {
    const name = req.params.name;
    const firstname = req.params.firstname;
    const user_score = await get_cheater_score(db, name, firstname);
  
    res.setHeader('Content-Type', 'application/json');
    res.json({ name  : name , score : user_score });
  });



// ==========================================
// 
//              POST
// 
// ==========================================

// Redirige l'user vers le qizz qu'il a rentre (/working)
// Il y a une verification basique pour eviter qu'il puisse acceder a des parties non autorisee
app.post('/redirect', async(req, res) => {
    const name_student = req.body.name;
    const firstname_student = req.body.firstname;
    const qizz = req.body.qizz;

    const qizz_for_student = await get_data_database(db,'qizz',qizz);

    async function Qizz_verif(qizz) {
        const interdits = ["creation"]

        interdits.forEach(e => {
            if (e === qizz) {
                return false;
            } 
        });

        return true;
    }


    async function Qizz_in_database_verif(qizz_for_student) {
        if (qizz_for_student === null) {
            return false;
        } else {
            return true
    }

    }

    async function Student_verif(qizz_for_student, name_student, firstname_student) {
        if (await Qizz_in_database_verif(qizz_for_student) === true) {
            for (const element in qizz_for_student['students']){
                if (element === (name_student+"_"+firstname_student).toLowerCase()){
                    console.log((name_student+"_"+firstname_student).toLowerCase(), " a tente de se reconnecter au qizz : ", qizz);
                    return false;
                }}
            return true;
        } else {
            return false;
        }
    }

    async function Firestore_update(db, qizz, name_student, firstname_student) {
        try {
            await update_data_database(db, 'qizz', qizz, 'students', (name_student+"_"+firstname_student).toLowerCase(), {triche:false, data:{}, data_triche:{}});
            return true;
            
        } catch (error) {
            return false;
        }
    }


    if (await Qizz_verif(qizz) && await Student_verif(qizz_for_student, name_student, firstname_student) && await Firestore_update(db, qizz, name_student, firstname_student)) {
        res.redirect(`/working?data_received=${qizz}&name=${name_student}&firstname=${firstname_student}`);
    } else {
        res.redirect('/connexion');
    }
});

// s'occupe d'envoyer les questions pour la creation du qizz
// lis les donnees sur le json present dans le cache
// Recupere a chaque ajout de question (form de creation de question dont l'action est /submit_question)
// ajoute ces donnees dans le json present dans le cache
app.post('/submit_question', async(req, res) => {
    let data_json = await read_File(`./private/js/cache/${NameQizzGlobal}.json`)

    let nb = 1
    for (let ele in data_json['content']){
        nb++
    }


    data_json['content'][`question_${nb}`] = {
        name : req.body.intitule,
        type : req.body.type_question,
    }
    
    if (data_json['content'][`question_${nb}`]['type'] == "qcm"){
        const nbr_reponses = req.body.nbr_reponses;
        data_json['content'][`question_${nb}`]['choices'] = []

        for (let i = 0; i < nbr_reponses; i++){

            let is_true_val = req.body[`check_reponse${i}`]

            if (is_true_val === 'on') {
                is_true_val = true;
            } else {
                is_true_val = false;
            }

            
            data_json['content'][`question_${nb}`]['choices'].push({content:req.body[`check_content${i}`],is_true:is_true_val});
        }
    } else {
        data_json['content'][`question_${nb}`]['language'] = req.body.type_text
    }

    

    await createJsonFile(`./private/js/cache/${NameQizzGlobal}.json`, data_json);
});


// S'occupe de l'envoye du nom du qizz et de sa creation
// Recupere dans le form le nom du qizz
// Avec ce nom, il creer un fichier json dont le format est predefinis afin de premettre la creation de qcm
app.post("/submit_name_qizz", async(req, res) => {

    const formData = req.body;

    NameQizzGlobal = formData.nom_qizz;
    // setup le nom du fichier et le chemin d'accès
    const fileName = NameQizzGlobal + '.json';
    const filePath = path.join(__dirname, '/private/js/cache/', fileName);

    // construction du json
    const jsonData = {
        nom: NameQizzGlobal,
        creator_id : "",
        content : {
            },
        students : { 
        }
    };

    await createJsonFile(filePath, jsonData);
});


// ajout du qizz a la bdd
// lis le fichier json dans le cache correspondant au qizz en cours de creation
// envoi ces donnees a la firebase
// 
// En attendant la creation d'une interface pour l'intervenant permettant d'activer ou de desactiver les qizz
// La page html du qizz est automatiquement creer apres l'envoie des donnees par relecture des donnees
app.post("/submit_quizz", async(req, res) => {
    console.log('requête reçut coté serveur')
    const mydoc = await read_File(`./private/js/cache/${NameQizzGlobal}.json`)
    console.log(mydoc)
    await add_data_database(db, "qizz", mydoc);

    console.log(NameQizzGlobal)

    const data_qizz = await get_data_database(db, 'qizz', NameQizzGlobal);

    console.log(data_qizz)
    
    await create_page(data_qizz, `./view/${NameQizzGlobal}.html`) ;

    if (fs.existsSync(`./private/cache/${NameQizzGlobal}.json`)) {
        await fs.promises.unlink(`./private/cache/${NameQizzGlobal}.json`);
        console.log("Le fichier a été supprimé avec succès !");
    }

    NameQizzGlobal = ""

    console.log("cool")

    res.redirect("/creation");
})

// Permet d'envoye les tricheurs au goulag
app.post('/cheater', async(req, res) => {
    const name = req.body.name;
    const firstname = req.body.firstname;
    const triche = req.body.triche;
    const test = await get_data_database(db, 'qizz', req.body.qizz)
    const test_flag = test['students'][(req.body.name + "_" + req.body.firstname).toLowerCase()]['triche']
    const test_data_triche = test['students'][(req.body.name + "_" + req.body.firstname).toLowerCase()]['data_triche'][triche]

    if (test_flag === false){
        await update_data_database(db, 'qizz', req.body.qizz, 'students', (req.body.name + "_" + req.body.firstname).toLowerCase(), {triche:true});
    }

    if (test_data_triche === undefined){
        await update_data_database(db, 'qizz', req.body.qizz, 'students', (req.body.name + "_" + req.body.firstname).toLowerCase(), {data_triche:{[triche]:1}});
    } else {
        await update_data_database(db, 'qizz', req.body.qizz, 'students', (req.body.name + "_" + req.body.firstname).toLowerCase(), {data_triche:{[triche]:test_data_triche+1}});
    }
    if(triche){
        await create_cheater_data(db, name, firstname);
        res.redirect('/goulag');
    }
    
})

app.post('/end', async(req, res) => {
    if (req.body.true === true) {
        console.log('c bien');
        res.redirect('/connexion')
    } else {
        console.log('c pas bien');
    }
    
})

app.post('/send_answer', async(req, res) => {
    const formData = req.body;
    console.log(formData)
    let dict_rep = {}
    let question = ''
    for (const key in formData) {
        try {
            if (key.startsWith("rep")) {
                question = `question_${(parseInt(key[5])+1)}`
                dict_rep[key] = formData[key]
        }} catch(error) {
            console.log("clef data")
        };
    };
    await update_data_database(db, 'qizz', formData['qizz'], 'students', formData['name'], {data:{[question]:dict_rep}})
    
})

app.post('/submit_code', async(req, res) => {
    console.log(req.body);

})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});