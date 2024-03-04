function create_page(data) {
    let body_html = 
    `
    `;

    for (const question in data){
        let title = question.title
        let content = question.content
    
    
        // Switch pour verifier le type de la question
        switch (question.type) {
            case "coche" :
                body_html = coche_creation(title, content);
        }
        body_html += 
        `
    
        `;
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
}




// Fonction creation d'une question de type coche prenant en parametre son intitule et son contenu (le contenu des reponses et leur nombre)
// Elle créera une div dediée qui sera ensuite mis dans le coeur de l'html
function coche_creation(title ,content) {
    let questions = 
    `
    `;

    for (const ele of content) {
        let proposition = 
        `
        <div>
        ${ele.text}
        </div>
        `;
        questions += proposition;
    };
    
    
    let coche = 
    `
    <div class="" id="">
        <h2>${title}</h2>
        ${questions}
    </div>
    `;

    return coche
}


// mettre les modules d'exports