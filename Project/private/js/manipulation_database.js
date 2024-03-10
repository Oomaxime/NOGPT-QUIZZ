// fichier contenant toutes les fonctions permettant de manipuler la bdd

import { getFirestore, collection, doc, setDoc, addDoc} from "firebase/firestore";



// simple fonction get, qui retourne les valeurs contenu dans un emplacement de la bdd
const get_data_database = (snapshot) => {
    let values = []
    snapshot.docs.forEach((doc) => {
    values.push({ ...doc.data(), id: doc.id });
    });
    return values
};


// data = {type:str, collection, all: 
// {
//     nom: "",
//     prenom: "",
// };
// };

class user {
    constructor (nom, prenom) {
        this.nom = nom;
        this.prenom = prenom;
    }

    toString() {
        return this.nom + ', ' + this.prenom;
    }
}

class etudiants extends user {
    constructor (nom, prenom, stats_triche, stats) {
        super(nom, prenom);
        this.stats_triche
        this.stats
    }
}

class qizz {
    constructor (nom, data, creator_id) {
        this.nom;
        this.data;
        this.creator_id;
    }

    toString() {
        return this.nom + ', ' + this.data, '. ' + this.creator_id;
    }
}



// converters pour firestore
const converted_result_user = {
    toFirestore: (infos) => {
        return {
            nom: infos.nom,
            prenom: infos.prenom,

        };
    },
    fromFirestore: (snapshot, options) => {
        const infos = snapshot.data(options);
        return new user(infos.nom, infos.prenom);
    }   
};

const converted_result_etudiants  = {
    toFirestore: (infos) => {
        return {
            nom: infos.nom,
            prenom: infos.prenom,
            stats_triche : infos.stats_triche,
            stats : infos.stats
        };
    },
    fromFirestore: (snapshot, options) => {
        const infos = snapshot.data(options);
        return new user(infos.nom, infos.prenom,infos.stats_triche,infos.stats);
    }   
};

const converted_result_qizz = {
    toFirestore: (infos) => {
        return {
            nom: infos.nom,
            data: infos.data,
            creator_id : infos.creator_id
        };
    },
    fromFirestore: (snapshot, options) => {
        const infos = snapshot.data(options);
        return new qizz(infos.nom, infos.data, infos.creator_id);
    }   
};


const add_data_database = async (db, values) => {
    try {
        switch (values['where']) {
            case 'etudiants' :
                const collection_etudiants_Ref = collection(db, values['where']).withConverter(converted_result_etudiants);
                const docRef_etudiants = doc(collection_etudiants_Ref, values['nom']); // Utiliser le nom de la collection pour la référence
                await setDoc(docRef_etudiants, { nom: values['nom'], prenom: values['prenom'], stats_triche: values['stats_triche'], stats: values['stats'] });
                break;

            case 'intervenants':
                const collection_users_Ref = collection(db, values['where']).withConverter(converted_result_user);
                const docRef_users = doc(collection_users_Ref, values['nom']); // Utiliser le nom de la collection pour la référence
                await setDoc(docRef_users, { nom: values['nom'], prenom: values['prenom'] });
                break;

            case 'qizz':
                const collection_qizz_Ref = collection(db, values['where']).withConverter(converted_result_qizz);
                const docRef_qizz = doc(collection_qizz_Ref, values['nom']); // Utiliser le nom de la collection pour la référence
                await setDoc(docRef_qizz, { nom: values['nom'], data: values['data'], creator_id: values['creator_id'] });
                break;

            default:
                console.error('Collection non reconnue.');
        }
        
    } 
    catch (error) {
        console.log("Une erreur s'est produite lors de l'ajout de données : ", error);
    }
}

export {get_data_database, add_data_database};




// data = 
// {
//     question_1 : {
//         title : "Que font 3 + 3 ?",
//         coche_1 : {
//             text : "4",
//             is_true : false
//         },
//         coche_2 : {
//             text : "5",
//             is_true : false
//         },
//         coche_3 : {
//             text : "6",
//             is_true : true
//         }
//     }
// }

// data_eleves =
// {
//     nom : "Joe",
//     prenom : "Fi",
//     stats_triche : {
//         touches_sus : {
//             crtl : 0,
//             alt : 0,
//             tab : 0,
//             cmd : 0,
//             opt : 0,
//             funct : 0
//         },
//         windows : {
//             fullscreen : false,
//             exit : false,
//             cursor : false
//         }
//     },
//     stats : {
//         // pour chaque question :
//         question_1 : [coche_1]
//     }
// }