import { getFirestore, collection, doc, setDoc, addDoc, updateDoc, getDoc } from "firebase/firestore";



const get_data_database = (snapshot) => {
    let values = [];
    snapshot.docs.forEach((doc) => {
        values.push({ ...doc.data(), id: doc.id });
    });
    return values;
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





const update_data_database = async (db, collectionName, docId, fieldName, newValue) => {
    try {
        const docRef = doc(collection(db, collectionName), docId);
        const docSnapshot = await getDoc(docRef);
        
        if (docSnapshot.exists()) {
            const existingData = docSnapshot.data();

            console.log(existingData, "feur")
            
            // Check if the field exists and is an object
            if (existingData[fieldName] && typeof existingData[fieldName] === 'object') {
                const updatedData = { 
                    ...existingData, 
                    [fieldName]: { 
                        ...existingData[fieldName], 
                        ...newValue 
                    } 
                };
                
                await setDoc(docRef, updatedData);
                console.log("Field updated successfully.");
            } else {
                console.error(`Field '${fieldName}' does not exist or is not an object.`);
            }
        } else {
            console.error("Document not found:", docId);
        }
    } catch (error) {
        console.error("An error occurred while updating the field:", error);
    }
}




export {get_data_database, add_data_database, update_data_database};





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