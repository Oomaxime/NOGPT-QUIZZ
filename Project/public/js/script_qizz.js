/** LOGIN **/
const modal = document.querySelector('.modal');
const login = document.querySelector('#login');
const rules = document.querySelector('#rules');


// num page
let num_page = 0;
let test = 0;

/**** Toogle full screen when agree rules ****/
let screen_status= 'OFF'
const contract_button = document.querySelector('#rules_button');
contract_button.addEventListener('click', () => {
    document.documentElement.requestFullscreen().catch((e) => {
        console.log(e);
    });
    next();
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
        cheater_cheater_dont_get_the_winner("tab_change");
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
        cheater_cheater_dont_get_the_winner("fullscreen_off");
    }
}}, 1000)



document.addEventListener("keydown", (e) => {
    if (e.key === 'Control'
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
        cheater_cheater_dont_get_the_winner(e.key);
    }
});

/** envois de la réponse et switch vers la question suivante **/
const qcm_section = document.querySelector('.qcm_section');
const answer_sending_button = document.querySelector('.answer_sending_button');
const question_title = document.querySelector('#question_title');
const main = document.querySelector('main');


document.addEventListener('DOMContentLoaded', function() {
    let checkboxes = document.querySelectorAll('.checkbox');

    for (let i = 0; i < checkboxes.length; i++) {
        let checkbox = checkboxes[i];
        let label = document.querySelectorAll('.qcm_label')[i];

        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Changer la couleur de la bordure du label si la checkbox est cochée
                label.style.border = '1px solid var(--gold)'; // par exemple, vert pour "coché"
            } else {
                // Remettre la couleur de la bordure par défaut si la checkbox n'est pas cochée
                label.style.border = '1px solid white'; // par exemple, noir pour "non coché"
            }
        });
    }
});

answer_sending_button.addEventListener("click", (e) => {
    console.log("bouton")
    e.preventDefault();
    next();
});


function next(){
    
    try {
        try {
            const previous_question = document.querySelector(`#num_${num_page-1}`);
            previous_question.classList.toggle('flexcenter');
        } catch(err) {
            console.log("min page reached");
        }
        console.log('ca passe dans le reste')
        const current_question = document.querySelector(`#num_${num_page}`);
        current_question.classList.toggle('flexcenter');
        console.log(num_page, "before")
        num_page++;
        console.log(num_page, "after")

    } catch(err) {
        fetch('/end', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: true })
    }
}




setInterval(()=>{
    test++;
    console.log(test)
}, 1000);













function cheater_cheater_dont_get_the_winner (ele_de_triche) {
    console.log(ele_de_triche)
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
                triche: ele_de_triche,
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
            console.log(ele_de_triche);
        })
        .catch(error => {
            console.log(error);
        });
};