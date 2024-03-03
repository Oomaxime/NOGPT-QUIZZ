/** LOGIN **/
const modal = document.querySelector('.modal');
const login = document.querySelector('#login');
const log_button = document.querySelector('#log_button');
const rules = document.querySelector('#rules');
log_button.addEventListener('click', (e) => {
    login.style.display = 'none';
    rules.style.display = 'flex';

})

let test_statuts = 'OFF'
/**** Toogle full screen when agree rules ****/
const contract_button = document.querySelector('#rules_button');
contract_button.addEventListener('click', (e) => {
    document.documentElement.requestFullscreen().catch((e) => {
        console.log(e);
    });
    rules.style.display = 'none';
    modal.style.display = 'none';
    test_statuts = 'ON'
    console.log(test_statuts)
});

/****** RULES CHECKER ******/
function getFullscreenElement() {
    return document.fullscreenElement
}

if(test_statuts === 'ON'){
    console.log(getFullscreenElement())
}

/*document.addEventListener("keydown", (e) => {
    console.log(e.key)
})*/

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