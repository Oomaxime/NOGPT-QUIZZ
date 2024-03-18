// /** LOGIN **/
// const modal = document.querySelector('.modal');
// const login = document.querySelector('#login');
// const log_button = document.querySelector('#log_button');
// const rules = document.querySelector('#rules');

/** LOGIN VALIDATION **/
log_button.addEventListener('click', function(e) {
    const name = document.getElementById('name_input').value;
   const firstname = document.getElementById('firstname_input').value;

    if (name.trim() === '' || firstname.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        e.preventDefault();
    } else {
        /*methode poste pour récupérer les donné nom/prénom*/
        login.style.display = 'none';
        rules.style.display = 'flex';
    }
});

// // prevent the form to exit the page
// document.getElementById("form").addEventListener("submit", function(event) {
//     event.preventDefault();
// });

// /**** Toogle full screen when agree rules ****/
// let screen_status= 'OFF'
// const contract_button = document.querySelector('#rules_button');
// contract_button.addEventListener('click', () => {
//     document.documentElement.requestFullscreen().catch((e) => {
//         console.log(e);
//     });
//     rules.style.display = 'none';
//     modal.style.display = 'none';
//     screen_status = 'ON'
// });

// /****** RULES CHECKER ******/

// document.addEventListener("contextmenu", function(e){
//     e.preventDefault();
// }, false);

// document.addEventListener('visibilitychange', () => {
//     if(document.visibilityState==='hidden'){
//         document.title = 'LOOSER'
//         /* Récuperer l'info pour le prof et mettre 0 a la fin*/
//     }
// })
// function getFullscreenElement() {
//     return !!document.fullscreenElement
//         || !!document.webkitFullscreenElement
//         || !!document.mozFullscreenElement
//         || !!document.msFullscreenElement
// }

// setInterval(()=>{if(screen_status === 'ON'){
//     if(getFullscreenElement()=== false){
//     /*Récuperer l'info pour mettre 0 a la fin*/
//         console.log("mode plein écran désactivez")
//     }
// }}, 1000)



// document.addEventListener("keydown", (e) => {
//     if (e.key === 'Enter'
//         || e.key === 'Shift'
//         || e.key === 'Control'
//         || e.key === 'Alt'
//         || e.key === 'Meta'
//         || e.key === 'F1'
//         || e.key === 'F2'
//         || e.key === 'F3'
//         || e.key === 'F4'
//         || e.key === 'F5'
//         || e.key === 'F6'
//         || e.key === 'F7'
//         || e.key === 'F8'
//         || e.key === 'F9'
//         || e.key === 'F10'
//         || e.key === 'F11'
//         || e.key === 'F12'){
//         /* log la touche et mettre 0 a la fin*/
//         console.log('mauvaise touche'+ e.key);
//     }
// });

// /** envois de la réponse et switch vers la question suivante **/
// const qcm_section = document.querySelector('.qcm_section');
// const answer_sending_button = document.querySelector('.answer_sending_button');
// const question_title = document.querySelector('#question_title');
// const main = document.querySelector('main');
// let question_index = 1
// answer_sending_button.addEventListener('click', () => {
//     if (question_index === 1) {
//         question_title.textContent = 'et moi la question 2 ?'
//         qcm_answer_list.innerHTML = '<div>\n'+
//             '<p class="qcm_answer" id="qcm_choice1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
//             '<p class="qcm_answer" id="qcm_choice2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
//             '</div>\n'+
//             '<div>\n'+
//             '<p class="qcm_answer" id="qcm_choice3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
//             '</div>';
//         question_index++;
//     } else if (question_index === 2) {
//         question_title.textContent = 'moi je suis la question 3 ?'
//         qcm_answer_list.innerHTML = '<div>\n'+
//             '<p class="qcm_answer" id="qcm_choice1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
//             '<p class="qcm_answer" id="qcm_choice2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
//             '</div>\n'+
//             '<div>\n'+
//             '<p class="qcm_answer" id="qcm_choice3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
//             '<p class="qcm_answer" id="qcm_choice4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
//             '</div>';
//         question_index++;
//     } else if (question_index === 3) {
//         qcm_section.style.display = 'none';
//         main.innerHTML += '<strong id="ending_words">FIN.</strong>\n'+
//             '<button id="close_button">FERMER LA SESSION</button>';

//         const close_button = document.querySelector('#close_button');
//         close_button.addEventListener('click', () => {
//             window.close();
//         })

//     }
// })

// /******* OUTILS DE SÉLECTION DE RÉPONSE QCM ********/

// const qcm_answer_list = document.querySelector('.qcm_answer_list');

// const qcm_choice1 = document.querySelector('#qcm_choice1');
// const qcm_choice2 = document.querySelector('#qcm_choice2');
// const qcm_choice3 = document.querySelector('#qcm_choice3');
// const qcm_choice4 = document.querySelector('#qcm_choice4');

// let qcm_choice1_statut = 'unselect';
// let qcm_choice2_statut = 'unselect';
// let qcm_choice3_statut = 'unselect';
// let qcm_choice4_statut = 'unselect';

// qcm_answer_list.addEventListener('click', (e) => {
//     switch (e.target) {
//         case qcm_choice1:
//             console.log('C1')
//             if (qcm_choice1_statut === 'selected') {
//                 qcm_choice1.style.borderColor = 'white';
//                 qcm_choice1_statut = 'unselect';
//             } else {
//                 qcm_choice1.style.borderColor = 'var(--gold)';
//                 qcm_choice1_statut = 'selected';
//             }
//             break;
//         case qcm_choice2:
//             console.log('C2')
//             if (qcm_choice2_statut === 'selected') {
//                 qcm_choice2.style.borderColor = 'white';
//                 qcm_choice2_statut = 'unselect';
//             } else {
//                 qcm_choice2.style.borderColor = 'var(--gold)';
//                 qcm_choice2_statut = 'selected';
//             }
//             break;
//         case qcm_choice3:
//             console.log('C3')
//             if (qcm_choice3_statut === 'selected') {
//                 qcm_choice3.style.borderColor = 'white';
//                 qcm_choice3_statut = 'unselect';
//             } else {
//                 qcm_choice3.style.borderColor = 'var(--gold)';
//                 qcm_choice3_statut = 'selected';
//             }
//             break;
//         case qcm_choice4:
//             console.log('C4')
//             if (qcm_choice4_statut === 'selected') {
//                 qcm_choice4.style.borderColor = 'white';
//                 qcm_choice4_statut = 'unselect';
//             } else {
//                 qcm_choice4.style.borderColor = 'var(--gold)';
//                 qcm_choice4_statut = 'selected';
//             }
//             break;
//         default:
//             console.log('no valid target')
//     }
// })

// =============================================================
//          ADMIN PAGE
// =============================================================

let config = document.querySelector('.config')
let typeQuestion = document.querySelector('#type_question')
let btn_question_suivante = document.querySelector('#btn_question_suivante')
let none_intitule_reponse = document.querySelector('.intitule_reponse')
let none_nbr_question = document.querySelector('.nbr_question')
let none_reponses = document.querySelector('.nbr_question')
let type_text = document.querySelector('.type_text')

typeQuestion.addEventListener('change', async() => {
    
    let type = typeQuestion.value;

    if (type == '') {
        btn_question_suivante.style.display = 'none';
        none_intitule_reponse.style.display = 'none';
        none_reponses.style.display = 'none';
        reponses.innerHTML = '';
        type_text.style.display = 'none';

    } else if (type == 'qcm') {
        btn_question_suivante.style.display = 'block';
        none_intitule_reponse.style.display = 'flex';
        none_reponses.style.display = 'flex';
        reponses.innerHTML = '';
        type_text.style.display = 'none';

    } else if (type == 'text') {
        none_nbr_question.style.display = 'none';
        btn_question_suivante.style.display = 'block';
        none_intitule_reponse.style.display = 'flex';
        type_text.style.display = 'flex';
        // reponses.innerHTML = 
        // `
        //     <label for="reponse_text">entrez la réponse</label>
        //     <textarea name="" id="reponse_text" placeholder="code..." required></textarea>
        // `
    }
})

// ================== REPONSES QCM ==================

let nbr_reponses = document.querySelector('#nbr_reponses')
let reponses = document.querySelector('.reponses')
let none_attention = document.querySelector('.attention p')

nbr_reponses.addEventListener('change', () => {

    let nbr = nbr_reponses.value;

    reponses.innerHTML = 
    `
    <div class="attention">
        <p><i class="fa-solid fa-circle-exclamation"></i> ATTENTION <i class="fa-solid fa-circle-exclamation"></i><br />cocher la/les bonne(s) reponse(s)</p>
    </div>
    ` 

    for (let i = 0; i < nbr; i++) {
        reponses.innerHTML += 
        `
        <div class="reponse">
            <div class="space_between">
                <label for="check_reponse${i}">Réponse ${i + 1}</label>
                <input type="checkbox" name="check_reponse${i}" id="check_reponse${i}">
            </div>
            <input name="check_content${i}" type="text" id="reponse${i}" placeholder="" required>
        </div>
        `
    }
})

/**btn_question_suivante.addEventListener('click', () => {

    const data_question = {
        question_title: intitule_reponse.value,
        typeSelect: type_question.value,
        qcm_nbr_reponses: nbr_reponses.value,
        reponse_text: reponse_text.value
    }

    console.log(data_question);
})*/

// ================== FIN du QIZZ ==================

let config_questions = document.querySelector('#config_questions')
let btn_nom_quizz_valider = document.querySelector('#btn_nom_quizz_valider')
let form_nom_quizz=document.querySelector('#form_nom_quizz')
const push_quizz_data=document.querySelector('#btn_valider_quizz')
btn_nom_quizz_valider.addEventListener('click', () => {

    form_nom_quizz.style.display = 'none'
    config_questions.style.display = 'grid'

})


btn_question_suivante.addEventListener('click', ()=> {
    setTimeout( 
        async() => {
            config_questions.reset()
            reponses.innerHTML = ''
            btn_question_suivante.style.display = 'none'
            none_intitule_reponse.style.display = 'none'
            none_reponses.style.display = 'none'
            reponses.innerHTML = ''
            type_text.style.display = 'none'
    }
    , 1000)
});

push_quizz_data.addEventListener('click', ()=> {

    fetch('/submit_quizz', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de l\'envoi des données.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert("Données envoyé avec succès !");
        })
        .catch(error => {
            console.log(error);
        });
});

// =============================================================
//          DU CODE DE MERDE
// =============================================================


// let type_select = document.querySelector('#type-select');
// let qcm = document.querySelector('.qcm');
// let text = document.querySelector('.text');

// type_select.addEventListener('change', () => {
//     let a = type_select.value;
    
//     if (a == 'qcm') {
//         qcm.style.display = 'block';
//         text.style.display = 'none';
//     } else if (a == 'text'){
//         qcm.style.display = 'none';
//         text.style.display = 'block';
//     }
// });

// let number_select = document.querySelector('#number-select');
// let questions = document.querySelector('#questions')

// number_select.addEventListener('change', () => {

//     let b = number_select.value;
//     let n = 0;

//     questions.innerHTML = '';

//     while (n < b) {
//         questions.innerHTML += `
//         <div class="space-between">
//             <label for="reponse${n + 1}">Réponse ${n + 1} :</label>
//             <input type="checkbox" id="check_reponse${n + 1}" name="" />
//         </div>
//         <input type="text" id="reponse${n + 1}">
//         `;
//         n++;
//     };
// });

// // Changer de form
// let btn_nom_quizz = document.querySelector('#btn_acces_question')
// let form_question = document.querySelector('.form_nom_question')

// btn_nom_quizz.addEventListener('input', () => {
    
//     form_question.style.display = "none";
//     console.log("aa");
// });

// const form = document.getElementById('form_quetions');

// form.addEventListener('submit', (event) => {

//     event.preventDefault();

//     const type_question = document.getElementById('type-select')
//     const type_question_value = type_question.value;
//     const intitule_question = document.getElementById('intitule_question')
//     const intitule_question_value = intitule_question.value;
//     const nbr_question = document.getElementById('number-select')
//     const nbr_question_value = nbr_question.value;
//     const r1 = document.getElementById('reponse1')
//     const r1_value = r1.value;
//     const checkbox1 = document.getElementById('check_reponse1')
//     const checkbox1_value = checkbox1.value;
//     const r2 = document.getElementById('reponse2')
//     const r2_value = r2.value;
//     const checkbox2 = document.getElementById('check_reponse2')
//     const checkbox2_value = checkbox2.value;

//     const reponse_form = {
//         type_question: type_question_value,
//         intitule_question: intitule_question_value,
//         nbr_question: nbr_question_value,
//         r1: r1_value,
//         checkbox1: checkbox1_value,
//         r2: r2_value,
//         checkbox2: checkbox2_value,
//         rText: rText_value
//     }
//     // console.log(`Type: ${type_question_value}`);
//     // console.log(`Intitulé: ${intitule_question_value}`);
//     // console.log(`Nombre de question: ${nbr_question_value}`);
//     // console.log(`Reponse 1: ${r1_value}`);
//     // console.log(`Vrai / Faux : ${checkbox1_value}`);
//     // console.log(`rText : ${rText_value}`);
//     console.log(reponse_form);
// });