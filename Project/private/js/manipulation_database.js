import { getFirestore, collection, doc, setDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";



const get_data_database = async (db, collectionName, value) => {
    try {
        const docRef = doc(collection(db, collectionName), value); 
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            return { ...docSnapshot.data(), id: docSnapshot.id };
        } else {
            console.log("Le document n'existe pas.");
            return null;
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la lecture de données à Firestore :", error);
        throw error; // Répercuter l'erreur pour la gestion à un niveau supérieur si nécessaire
    }
};


const add_data_database = async (db, collectionName, values) => {
    try {
        const docRef = doc(collection(db, collectionName), values['nom']); 
        await setDoc(docRef, values, { merge: true });
        console.log("Données ajoutées avec succès à Firestore.");
    } catch (error) {
        console.error("Une erreur s'est produite lors de l'ajout de données à Firestore :", error);
    }
}


const update_data_database = async (db, collectionName, docId, nestedFieldName, key, newValue) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data();

            if (data.hasOwnProperty(nestedFieldName) && typeof data[nestedFieldName] === 'object') {

                data[nestedFieldName][key] = newValue;

                await setDoc(docRef, data, { merge: true });
            } else {
                console.error(`Le champ "${nestedFieldName}" n'est pas présent ou n'est pas de type objet.`);
            }
        } else {
            console.error("Document non trouvé :", docId);
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour du champ spécifique :", error);
    }
}


const update_data_student_database = async (db, collectionName, docId, nestedFieldName, champ, key, newValue) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data();

            data[nestedFieldName][champ][key] = newValue;

            await setDoc(docRef, data, { merge: true });
            
        }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour du champ spécifique :", error);
    }
}

const create_cheater_data = async (db, name, firstname) => {
    try {
        const docRef = doc(db, 'qizz', 'goulag');
        await setDoc(doc(docRef, `${name}_${firstname}`, { merge: true }), {
            flag: true,
            score: 0,
        });
    } catch (error) {
        console.error("Une erreur s'est produite lors de la mise à jour du champ spécifique :", error);
    }
};

const get_cheater_score = async (db, name, firstname) => {
    try {
      const docRef = doc(db, 'qizz', 'goulag', `${name}_${firstname}`);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        return docSnap.data().score;
      } else {
        console.log("Utilisateur inconnu.");
        return 0;
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération du score :", error);
      return 0;
    }
  };

export {get_data_database, add_data_database, update_data_database, update_data_student_database, create_cheater_data, get_cheater_score};





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