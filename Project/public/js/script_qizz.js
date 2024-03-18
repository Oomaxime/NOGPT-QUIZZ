/** LOGIN **/
const modal = document.querySelector('.modal');
const login = document.querySelector('#login');
const rules = document.querySelector('#rules');

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
        cheater_cheater_dont_get_the_winner();
        /* Récuperer l'info pour le prof et mettre 0 a la fin*/
    }
})
function getFullscreenElement() {
    cheater_cheater_dont_get_the_winner();
    return !!document.fullscreenElement
        || !!document.webkitFullscreenElement
        || !!document.mozFullscreenElement
        || !!document.msFullscreenElement
}

setInterval(()=>{if(screen_status === 'ON'){
    if(getFullscreenElement()=== false){
    /*Récuperer l'info pour mettre 0 a la fin*/
        console.log("mode plein écran désactivez")
        cheater_cheater_dont_get_the_winner();
    }
}}, 1000)



document.addEventListener("keydown", (e) => {
    if (e.key === 'Enter'
        || e.key === 'Shift'
        || e.key === 'Control'
        || e.key === 'Alt'
        || e.key === 'Meta'
        || e.key === 'F1'
        || e.key === 'F2'
        || e.key === 'F3'
        || e.key === 'F4'
        || e.key === 'F5'
        || e.key === 'F6'
        || e.key === 'F7'
        || e.key === 'F8'
        || e.key === 'F9'
        || e.key === 'F10'
        || e.key === 'F11'
        || e.key === 'F12'){
        /* log la touche et mettre 0 a la fin*/
        console.log('mauvaise touche'+ e.key);
        cheater_cheater_dont_get_the_winner();
    }
});

/** envois de la réponse et switch vers la question suivante **/
const qcm_section = document.querySelector('.qcm_section');
const answer_sending_button = document.querySelector('.answer_sending_button');
const question_title = document.querySelector('#question_title');
const main = document.querySelector('main');




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



function cheater_cheater_dont_get_the_winner () {
    const name = document.getElementById("name").value;
    const firstname = document.getElementById("firstname").value;
    const qizz = document.getElementById("qizz").value;

    fetch('/cheater', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                name: document.getElementById("name").value,
                firstname: document.getElementById("firstname").value,
                qizz: document.getElementById("qizz").value,
            }
        )
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de l\'envoi des données.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
};