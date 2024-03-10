const typeSelect = document.getElementById('type-select');
const numberSelect = document.getElementById('number-select');
const responseInputs = document.querySelectorAll('.response-input');
const checkInputs = document.querySelectorAll('.check-input');
const question_title = document.querySelector('#intitule_question');
const qcm_title = document.querySelectorAll('#admin_form-titre-nom'); // ajouter le liens pour aller prendre le titre du qcm



// Objectif
// - Le prof choisi un nom pour son qcm et poursuit dans sa création (l'info sera recup par un post)
// - Quand le prof aura selectionner et rentre toute les infos, il clique sur le bouton "creer question",
//   on recupere les donnnees depuis le post et on les stocks dans un fichier temporaire. 
// - Quand le prof aura finis, il appuiera sur un bouton qui permettra de creer le qcm, cela appelera les fonctions,
//   l'appelle de ces fonctions permettra la creation du qcm au complet qui sera par la suite envoyé dans la database.



// Tips : Les fonctions en dessous permette de bien creer les données pour le fichier temporaire
// data_question va devoir etre modifier car les infos proviendront du post (vous faites pas iech utilise juste les imports)
// data_qizz_prof va etre en gros le fichier temporaire (si c un fichier json, la structure reste la meme mais au lieu du .push() vous utiliserez la fonction pour ajouter dans un json)



// To do :
// - Creer l'input pour le nom du qcm
// - Gérer les post (ou en tout cas vérifier par le biais d'un consol log l'envoie des données)
// - Création d'un fichier temporaire (json ou autre) pour stocker les données pour les questions, ...
// - Creer les fonctions ou les ameliorer pour les adapter
// - Reussir a faire un console.log() de la totalité des inforamtions



// Normalement, la manipulation des datas sera différentes car provenant du véritable requête POST
const data_question = {
    typeSelect: typeSelect,
    numberSelect: numberSelect,
    responseInputs: responseInputs,
    checkInputs: checkInputs,
    question_title: question_title,
    qcm_title: qcm_title
}


// Les data pour le qcm du prof (il faut changer le nom)
const data_qcm_prof = {
}


// Fonction pour ajouter les questions aux Qizz du prof
function add_to_qizz(value_to_add) {
    data_qcm_prof.push(value_to_add)
}


// Fonction pour créer des questions en fonction choix du prof
function create_qcm(data) {
    add_to_qizz(
        {
        title_quizz: `${data['qcm_title']}`,
        question: add_value_to_question(data),
    }
    )
}


function add_question(data) {
    question = {
        title: data['question_title'],
        options:{}
    }
    for (ele in data['numberSelect'],i=0,i++) {
        question['option'][`question_${i}`] = add_options(data)
    }
}

// Fonction qui creer des questions pour ensuite pouvoir les ajouter dans le qcm
function add_options(data) {
    return {
        title: data['option_title'],
        is_true: data['checkInputs']
    };
};



// typeSelect.addEventListener('change', () => {
//     valuee.type = typeSelect.value;
// });

// numberSelect.addEventListener('change', () => {
//     const numberOfOptions = parseInt(numberSelect.value);
//     valuee.option = [];

//     for (let i = 0; i < numberOfOptions; i++) {
//         const response = responseInputs[i].value;
//         const check = checkInputs[i].checked;

//         valuee.option.push({
//             rep: response,
//             intitule: document.getElementById(`intitule_question_${i}`).value,
//             is_true: check
//         });
//     }
// });

