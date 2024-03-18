/** LOGIN **/
const modal = document.querySelector('.modal');
const login = document.querySelector('#login');
const log_button = document.querySelector('#log_button');
const rules = document.querySelector('#rules');

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

// prevent the form to exit the page
document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault();
});

/**** Toogle full screen when agree rules ****/
let screen_status= 'OFF'
const contract_button = document.querySelector('#rules_button');
contract_button.addEventListener('click', () => {
    document.documentElement.requestFullscreen().catch((e) => {
        console.log(e);
    });
    rules.style.display = 'none';
    modal.style.display = 'none';
    screen_status = 'ON'
});

/****** RULES CHECKER ******/

document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);

document.addEventListener('visibilitychange', () => {
    if(document.visibilityState==='hidden'){
        document.title = 'LOOSER'
        /* Récuperer l'info pour le prof et mettre 0 a la fin*/
    }
})
function getFullscreenElement() {
    return !!document.fullscreenElement
        || !!document.webkitFullscreenElement
        || !!document.mozFullscreenElement
        || !!document.msFullscreenElement
}

setInterval(()=>{if(screen_status === 'ON'){
    if(getFullscreenElement()=== false){
    /*Récuperer l'info pour mettre 0 a la fin*/
        console.log("mode plein écran désactivez")
    }
}}, 1000)



document.addEventListener("keydown", (e) => {
    const restrictedKeys = [
        'Enter',
        'Shift',
        'Control',
        'Alt',
        'Meta',
        'F1',
        'F2',
        'F3',
        'F4',
        'F5',
        'F6',
        'F7',
        'F8',
        'F9',
        'F10',
        'F11',
        'F12'
    ];

    if (restrictedKeys.includes(e.key)) {
        console.log('Pressing wrong key: ' + e.key);
        window.location.href = '../../view/gindex.html'; 
    }
});

/** envois de la réponse et switch vers la question suivante **/
const qcm_section = document.querySelector('.qcm_section');
const answer_sending_button = document.querySelector('.answer_sending_button');
const question_title = document.querySelector('#question_title');
const main = document.querySelector('main');
let question_index = 1
answer_sending_button.addEventListener('click', () => {
    if (question_index === 1) {
        question_title.textContent = 'et moi la question 2 ?'
        qcm_answer_list.innerHTML = '<div>\n'+
            '<p class="qcm_answer" id="qcm_choice1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
            '<p class="qcm_answer" id="qcm_choice2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
            '</div>\n'+
            '<div>\n'+
            '<p class="qcm_answer" id="qcm_choice3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
            '</div>';
        question_index++;
    } else if (question_index === 2) {
        question_title.textContent = 'moi je suis la question 3 ?'
        qcm_answer_list.innerHTML = '<div>\n'+
            '<p class="qcm_answer" id="qcm_choice1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
            '<p class="qcm_answer" id="qcm_choice2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
            '</div>\n'+
            '<div>\n'+
            '<p class="qcm_answer" id="qcm_choice3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
            '<p class="qcm_answer" id="qcm_choice4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula</p>\n'+
            '</div>';
        question_index++;
    } else if (question_index === 3) {
        qcm_section.style.display = 'none';
        main.innerHTML += '<strong id="ending_words">FIN.</strong>\n'+
            '<button id="close_button">FERMER LA SESSION</button>';

        const close_button = document.querySelector('#close_button');
        close_button.addEventListener('click', () => {
            window.close();
        })

    }
})

/******* OUTILS DE SÉLECTION DE RÉPONSE QCM ********/

const qcm_answer_list = document.querySelector('.qcm_answer_list');

const qcm_choice1 = document.querySelector('#qcm_choice1');
const qcm_choice2 = document.querySelector('#qcm_choice2');
const qcm_choice3 = document.querySelector('#qcm_choice3');
const qcm_choice4 = document.querySelector('#qcm_choice4');

let qcm_choice1_statut = 'unselect';
let qcm_choice2_statut = 'unselect';
let qcm_choice3_statut = 'unselect';
let qcm_choice4_statut = 'unselect';

qcm_answer_list.addEventListener('click', (e) => {
    switch (e.target) {
        case qcm_choice1:
            console.log('C1')
            if (qcm_choice1_statut === 'selected') {
                qcm_choice1.style.borderColor = 'white';
                qcm_choice1_statut = 'unselect';
            } else {
                qcm_choice1.style.borderColor = 'var(--gold)';
                qcm_choice1_statut = 'selected';
            }
            break;
        case qcm_choice2:
            console.log('C2')
            if (qcm_choice2_statut === 'selected') {
                qcm_choice2.style.borderColor = 'white';
                qcm_choice2_statut = 'unselect';
            } else {
                qcm_choice2.style.borderColor = 'var(--gold)';
                qcm_choice2_statut = 'selected';
            }
            break;
        case qcm_choice3:
            console.log('C3')
            if (qcm_choice3_statut === 'selected') {
                qcm_choice3.style.borderColor = 'white';
                qcm_choice3_statut = 'unselect';
            } else {
                qcm_choice3.style.borderColor = 'var(--gold)';
                qcm_choice3_statut = 'selected';
            }
            break;
        case qcm_choice4:
            console.log('C4')
            if (qcm_choice4_statut === 'selected') {
                qcm_choice4.style.borderColor = 'white';
                qcm_choice4_statut = 'unselect';
            } else {
                qcm_choice4.style.borderColor = 'var(--gold)';
                qcm_choice4_statut = 'selected';
            }
            break;
        default:
            console.log('no valid target')
    }
})



