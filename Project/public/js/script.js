/** LOGIN **/
const modal = document.querySelector('.modal');
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
})

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
    if (e.key === 'Meta'
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
    }
});

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


