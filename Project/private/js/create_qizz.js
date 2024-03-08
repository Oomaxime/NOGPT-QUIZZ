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
    <!doctype html>
<html lang=fr>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>TruthGame</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Bokor&display=swap" rel="stylesheet">
</head>
<body>
<!-- popup de connexion -->
    <div class="modal flexcenter" id="login_modal">
        <div id="login">
            <h2>CONNEXION</h2>
            <form id="form" method="post" action="#">
                <label for="name_input">NOM:</label><input type="text" name="name" id="name_input">
                <label for="firstname_input">PRENOM:</label><input type="text" name="firstname" id="firstname_input">
                <button id= "log_button" type="submit">VALIDEZ</button>
            </form>
        </div>

        <div id="rules">
            <h2>CONTRAT</h2>
            <p>Cher apprenant,<br> en signant ce contrat, tu t'engages à réaliser ce test par la seul force de tes connaissances, sans outils ou aide externe.<br>Il t'es donc dors et déjà <span>interdit</span> :<br>- de changer d'onglet<br>- de changer de bureau ou de fenêtre de logiciel<br> - d'utiliser les touches <strong>"ctrl"</strong>, <strong>"shift"</strong>, <strong>"tab"</strong>, <strong>"alt"</strong>, <strong>"altgr"</strong>,<strong>"windows"</strong>, <strong>"opt"</strong>, <strong>"cmd"</strong>, les touches <strong>fonction</strong> et enfin le <strong>clic droit</strong>.<br>Une fois le contrat signé, ton navigateur passera en <span>plein écran</span> et le test débutera. Pendant toute la durée de celui-ci, <span>il est interdit de quitter ce mode "plein écran"</span><br>Tout comportement ne respectant pas ces règles entrainera un <strong>zéro</strong> comme note d'évaluation.</p>

            <button id= "rules_button" type="submit">SIGNER LE CONTRAT</button>

        </div>
    </div>

    <header>
        <img id=logo src="../public/img/logo.png" alt="">
    </header>
    <main>
        

    </main>
<script src="js/script.js"></script>
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