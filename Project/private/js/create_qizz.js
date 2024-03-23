import { writeFile } from 'fs/promises';

function create_page(data, path) {
    const content_qizz = data['content']
    let body_html = 
    `
    `;

    let num_question = 0;

    for (const question in content_qizz){
        const title = content_qizz[question]['name'];
        const lang_type = content_qizz[question]['language'];
        const content_question = content_qizz[question]['choices'];
        
        // Switch pour verifier le type de la question
        switch (content_qizz[question]['type']) {
            case "qcm" :
                body_html += coche_creation(title, content_question, num_question);
                break;
            case "text" :
                body_html += text_creation(title, num_question, lang_type);
                break;
            default :
                console.log("le type n'existe pas")
                // faire un exeption si il y a eu un pb sur le type ou qu'il a ete volontairement modifie.
        };
        body_html += 
        `
    
        `;
        num_question++
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
        <div id="rules">
            <h2>CONTRAT</h2>
            <p>Cher apprenant,<br> en signant ce contrat, tu t'engages à réaliser ce test par la seul force de tes connaissances, sans outils ou aide externe.<br>Il t'es donc dors et déjà <span>interdit</span> :<br>- de changer d'onglet<br>- de changer de bureau ou de fenêtre de logiciel<br> - d'utiliser les touches <strong>"ctrl"</strong>, <strong>"shift"</strong>, <strong>"tab"</strong>, <strong>"alt"</strong>, <strong>"altgr"</strong>,<strong>"windows"</strong>, <strong>"opt"</strong>, <strong>"cmd"</strong>, les touches <strong>fonction</strong> et enfin le <strong>clic droit</strong>.<br>Une fois le contrat signé, ton navigateur passera en <span>plein écran</span> et le test débutera. Pendant toute la durée de celui-ci, <span>il est interdit de quitter ce mode "plein écran"</span><br>Tout comportement ne respectant pas ces règles entrainera un <strong>zéro</strong> comme note d'évaluation.</p>

            <button id= "rules_button" type="submit">SIGNER LE CONTRAT</button>

        </div>
    </div>

    <header>
        <img id=logo src="img/logo.png" alt="">
    </header>
    <main>
    <input type="hidden" id="name" name="name" value="name_student">
    <input type="hidden" id="firstname" name="firstname" value="firstname_student">
    <input type="hidden" id="qizz" name="qizz" value="qizz_student">

        ${body_html}
    </main>
<script src="js/script_qizz.js"></script>
<script src="js/editor.bundle.js"></script>
</body>
</html>
    `;

    writeFile(path, htmlContent)
}


// {/* <form id="form" method="post" action="/working_data">
//                 <input type="hidden" name="fileName" value="test.html">
//                 <label for="name_input">NOM:</label><input type="text" name="name" id="name_input">
//                 <label for="firstname_input">PRENOM:</label><input type="text" name="firstname" id="firstname_input">
//                 <button id= "log_button" type="submit">VALIDEZ</button>
//             </form> */}

function text_creation(title, num_question, lang_type) {
    let text = `
    <section class="texted_answer_section" id="num_${num_question}">

        <h3 id="question_title">${title}</h3>
        <div class="editor"></div>
        <button type="submit" class="answer_sending_button" id="getCodeButton">VALIDER</button>

    </section>
    `

    return text
}




// Fonction creation d'une question de type coche prenant en parametre son intitule et son contenu (le contenu des reponses et leur nombre)
// Elle créera une div dediée qui sera ensuite mis dans le coeur de l'html
function coche_creation(title ,content, num_question) {
    // i permettra d'avancer dans le nb des questions et questions stockera les questions
    let i = 0
    let questions = 
    `
    `;

    // Boucle pour la creation des choix du qcm
    for (const ele of content) {
        console.log(ele)
        let proposition = 
        `
        <label class="qcm_label" for="rep${i}">${ele['content']}</label>
        <input type="checkbox" name="rep${i}" id="rep${i}" class="checkbox" style="display:none">
        `;

        questions += proposition;

        i++;
    };
    
    // Creation du qcm par ajouts des valeurs
    let qcm = 
    `
    <section class="qcm_section" id="num_${num_question}">
    <h2> ${title} </h2>
    <form class="qcm_answer_form flexcenter" action="/send_answer" method="post">
        <div class="qcm_answer_list">

            ${questions}

        </div>
        <button class="answer_sending_button" type="submit">Validez</button>
        </form>
    </section>
    `
    ;
    return qcm
}


export{create_page}