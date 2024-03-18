import express from 'express';
import cors from 'cors';
import { firebase } from './private/js/database.js';
import { getFirestore, collection, getDoc } from 'firebase/firestore';

import { get_data_database, add_data_database, update_data_database, update_data_student_database } from './private/js/manipulation_database.js';
import { createJsonFile, read_File } from './private/js/json_manipulation.js';

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

const db = getFirestore(firebase);

let NameQizzGlobal = ""

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('/qizztest', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/creation', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'creation.html'));
})

app.get('/connexion', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'login.html')); //faire le fichier html pour la page de connexion
})



app.get('/working', (req, res) => {
    // pour les html
    // <input type="hidden" id="name" name="name" value="name_student">
    // <input type="hidden" id="firstname" name="firstname" value="firstname_student">


    const data_received = req.query.data_received;
    const name = req.query.name;
    const firstname = req.query.firstname;

    console.log('Received input data:', data_received);

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




//s'occupe d'envoye les questions pour la creation du qizz
app.post('/submit_question', async(req, res) => {
    //modifier pour que ca soit question et pas qizz
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


//s'occupe de l'envoye du nom du qizz et de sa creation
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







// redirige l'user vers le qizz si il l'a bien rentree
app.post('/redirect', async(req, res) => {
    const name_student = req.body.name;
    const firstname_student = req.body.firstname;
    const qizz = req.body.qizz;

    console.log(name_student, firstname_student, qizz);

    try {
        await update_data_database(db, 'qizz', qizz, 'students', name_student+"_"+firstname_student, {triche:false, data:{}});
        console.log('Données mises à jour avec succès à Firestore.');
        
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout ou de la mise à jour des données à Firestore:", error);
        res.redirect('/connexion');
    }

    res.redirect(`/working?data_received=${qizz}&name=${name_student}&firstname=${firstname_student}`);
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




// ajout du qizz a la bdd
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

    res.redirect('/creation')

})

app.post('/cheater', async(req, res) => {
    await update_data_student_database(db, 'qizz', req.body.qizz, req.body.name+"_"+req.body.firstname, 'triche', true );
    console.log('Données mises à jour avec succès à Firestore.');
})


// app.post('/submit', async(req, res) => {
//     const name = req.body.name;
//     const firstname = req.body.firstname;

//     const data = {
//         nom : "j'calle_le_petard_entre_mes_dents",
//         creator_id : "1111",
//         data : {
//             reponse : "bah oe bah oe"
//         },
//         students : {
//             triche : false,
//             data : {
//                 question_1 : {},
//             }
//         },
//     }

//     console.log(data)

//     try {
//         await add_data_database(db, 'qizz', data);
//         console.log('Données ajoutées avec succès à Firestore.');

//         await update_data_database(db, 'qizz', "j'calle_le_petard_entre_mes_dents", 'students', { triche: true });
//         console.log('Données mises à jour avec succès à Firestore.');

//         await update_data_database(db, 'qizz', "j'calle_le_petard_entre_mes_dents", 'students', { data : {question_2: {}} });
//         console.log('Données mises à jour avec succès à Firestore.');
        
//         res.status(200).send('Données soumises avec succès.');
//     } catch (error) {
//         console.error("Une erreur s'est produite lors de l'ajout ou de la mise à jour des données à Firestore:", error);
//         res.status(500).send('Une erreur s\'est produite lors du traitement de votre demande.');
//     }
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});