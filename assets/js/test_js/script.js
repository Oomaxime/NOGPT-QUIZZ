// import des donnees
// Donnees sous le format : {{question1},{question2}}
// Questions sous le format : {'type' : "type_de_la_question", 'what_about' = "intitule_de_la_question", 'content' = []}
const data = require('data.json') //changer la provenance des donnees

let body_html = 
`
`;

for (const question in data){
    let what_about = question["what_about"]
    let content = question["content"]


    // Switch pour verifier le type de la question
    switch (question["type"]) {
        case "coche" :
            body_html = coche_creation(what_about, content);
        case "text" :
            body_html = text_creation(what_about);
    }
    body_html += 
    `

    `;
}

// Fonction creation d'une question de type coche prenant en parametre son intitule et son contenu (le contenu des reponses et leur nombre)
// Elle creera une div dediee qui sera ensuite mis dans le coeur de l'html
function coche_creation(what_about ,content ) {
    let questions = 
    `
    `;

    for (const ele of content) {
        let proposition = 
        `
        <div>
        ${ele}
        </div>
        `;
        questions += proposition;
    };
    
    
    let coche = 
    `
    <div class="" id="">
        <h2>${what_about}</h2>
        ${questions}
    </div>
    `;

    return coche
}




// Fonction creation d'une question de type text prenant en parametre son intitule
// Elle creera une div dediee qui sera ensuite mis dans le coeur de l'html
function text_creation(what_about){
    let text = 
    `
    <div class="" id="">
        <h2>${what_about}</h2>
    </div>
    `; 

    return text
}





// Page standart html
// body vide
let htmlContent =
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>

${body_html}

</body>
</html>
`;



module.exports = htmlContent;