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
}}, 3000)



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
    }
});

/** envois de la réponse et switch vers la question suivante **/
const qcm_section = document.querySelector('.qcm_section');
const answer_sending_buttons = document.querySelectorAll('.answer_sending_button');
const question_title = document.querySelector('#question_title');
const main = document.querySelector('main');


document.addEventListener('DOMContentLoaded', function() {
    let sections = document.querySelectorAll('.qcm_section');

    sections.forEach(function(section, index) {
        let checkboxes = section.querySelectorAll('.checkbox');
        let forms = section.querySelectorAll('.qcm_answer_form');
        let labels = section.querySelectorAll('.qcm_label');

        checkboxes.forEach(function(checkbox, checkboxIndex) {
            let label = labels[checkboxIndex];

            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    // Changer la couleur de la bordure du label si la checkbox est cochée
                    label.style.border = '1px solid var(--gold)'; // par exemple, vert pour "coché"
                } else {
                    // Remettre la couleur de la bordure par défaut si la checkbox n'est pas cochée
                    label.style.border = '1px solid white'; // par exemple, noir pour "non coché"
                }
            });
        });

        forms.forEach(function(form) {
            form.addEventListener('submit', function (event) {
                let nameValue = document.getElementById('name').value;
                let firstnameValue = document.getElementById('firstname').value;
                let qizzValue = document.getElementById('qizz').value;
                let qizzInput = document.createElement('input');
                let nameInput = document.createElement('input');
                nameInput.type = 'hidden';
                nameInput.name = 'name';
                nameInput.value = (nameValue+'_'+firstnameValue).toLowerCase();
                let submitButton = form.querySelector('.answer_sending_button');

                qizzInput.type = 'hidden';
                qizzInput.name = 'qizz';
                qizzInput.value = qizzValue;

                form.insertBefore(nameInput, submitButton);

                form.insertBefore(qizzInput, submitButton);



            });
        });
    });
});

answer_sending_buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        next()
    });
});


function next(){
    try {
        const current_question = document.querySelector(`#num_${num_page}`);
        current_question.classList.toggle('flexcenter');
    } catch(err) {
        redirectToEnd()
    }

    try {
        const previous_question = document.querySelector(`#num_${num_page-1}`);
        previous_question.classList.toggle('flexcenter');
    } catch(err) {
        console.log("min page reached");
    }

    num_page++;
}

// Fonction pour envoyer la requête POST à '/end' en cas de redirection
function redirectToEnd() {
    fetch('/end', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({true: true}) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Redirect response:', data);

        window.location.href = '/connexion';
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}




setInterval(()=>{
    test++;
    console.log(test)
}, 1000);













function cheater_cheater_dont_get_the_winner(ele_de_triche) {
    // Log the cheating element to the console for debugging
    console.log(ele_de_triche);

    // Send a POST request to the '/cheater' endpoint
    fetch('/cheater', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            firstname: document.getElementById("firstname").value,
            qizz: document.getElementById("qizz").value,
            triche: ele_de_triche
        })
    })
    .then(response => {
        // Check if the response is OK
        if (!response.ok) {
            throw new Error('An error occurred while sending data.');
        }
        // Parse the JSON response
        return response.json();
    })
    .then(data => {
        // Handle the response data, if needed
        console.log(data); // Logging the response data for debugging
    })
    .catch(error => {
        // Catch and log any errors that occur during the fetch operation
        console.error('Fetch error:', error);
    });
};