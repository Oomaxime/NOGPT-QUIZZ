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

// class etudiants extends user {
//     constructor (nom, prenom) {
//         super(nom, prenom);
//     }
// }

// class intervenants extends user {
//     constructor (nom, prenom) {
//         super(nom, prenom);
//     }
// }

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
    toFirestore: (data) => {
        return {
            nom: data.nom,
            prenom: data.prenom
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.nom, data.prenom);
    }   
};

const converted_result_qizz = {
    toFirestore: (data) => {
        return {
            nom: data.nom,
            prenom: data.prenom
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.nom, data.prenom);
    }   
};


const add_data_database = (db, values) => {
    try {
        // Obtention de la référence à la collection "intervenants"
        const collectionRef = collection(db, values['where']).withConverter(converted_result_user);

        // Ajout des données du nouvel utilisateur à la collection
        addDoc(collectionRef, { nom: values['nom'], prenom: values['prenom'] });
    } 
    catch (error) {
        console.log("Une erreur s'est produite lors de l'ajout de données : ", error);
    }
}



const add_data_to_document = (data) => {
    try {

        const { collection, name_file, all } = data

        setDoc(doc(db, collection, name_file), all);

        console.log("ajout des données")

    } catch (error) {
        
        console.log("Erreur lors de l'ajout des données : ", error)
    
    };
    };

export {get_data_database, add_data_database};