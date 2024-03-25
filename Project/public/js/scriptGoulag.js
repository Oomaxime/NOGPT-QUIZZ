// const { USER } = require('./script.js'); (Node JS)

function generateUniqueId() {
  const randomNumber = Math.floor(Math.random() * 100);
  const uniqueId = '4' + randomNumber.toString().padStart(3, '0');
  return uniqueId;
}

const usertest_id = document.getElementById("nbr_title");
usertest_id.innerHTML = generateUniqueId();


// Timer on the way
function startTimer(duration, display, redirectUrl) {
  var timer = duration, minutes, seconds;
  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (timer-- <= 0) {
      clearInterval(this);
      window.location.href = redirectUrl;
    }
  }, 1000);
}

window.onload = function () {
  var fourMinutes = 60 * 4,
      display = document.querySelector('#timer'),
      redirectUrl = 'https://www.youtube.com/watch?v=wpV-gGA4PSk';
  startTimer(fourMinutes, display, redirectUrl);
};

// Disable Copy and Paste

function disabled() {
  const body = document.querySelector('body');

  // MENU : Disable
  body.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  // Right Click : Disable
  body.addEventListener('mousedown', (event) => {
    if (event.button === 2) {
      event.preventDefault();
    }
  });

  // Unselectable text
  body.addEventListener('selectstart', (event) => {
    event.preventDefault();
  });
}

disabled();


// Partie quiz
const questions = [
  {
  "question": "Que signifie HTML ?",
  "options": [
    "A. Langage de balisage hypertexte",
    "B. Langage de manipulation de texte de haut niveau",
    "C. Langage de gestion d'outils domestiques",
    "D. Langage de balisage transférable hypertexte"
  ],
  "correct_answer": 1
},
{
  "question": "En programmation Rust, quelle est la propriété clé qui garantit l'absence de comportements indéfinis ?",
  "options": [
    "A. Ownership",
    "B. Concurrency",
    "C. Borrowing",
    "D. Lifetime"
  ],
  "correct_answer": 1
},
{
  "question": "Quel langage de programmation est connu pour son utilisation dans l'analyse de données et l'apprentissage automatique ?",
  "options": [
    "A. Java",
    "B. Python",
    "C. C++",
    "D. Ruby"
  ],
  "correct_answer": 2
},
{
  "question": "Quel est le but de la commande \"git clone\" dans Git ?",
  "options": [
    "A. Créer un nouveau référentiel Git",
    "B. Mettre à jour le référentiel local",
    "C. Cloner un référentiel distant sur la machine locale",
    "D. Supprimer un référentiel Git"
  ],
  "correct_answer": 3
},
{
  "question": "Quelle fonction permet d'allouer dynamiquement de la mémoire en C ?",
  "options": [
      "A. OpenMemory()",
      "B. new Memory()",
      "C. malloc()",
      "D. System.memory.alloc()"
  ],
  "correct_answer" : 3
},
{
  "question": "Quel est le système de gestion de paquets utilisé dans le langage de programmation Rust ?",
  "options": [
    "A. NPM",
    "B. Cargo",
    "C. Maven",
    "D. Pip"
  ],
  "correct_answer": 2
},
{
  "question": "Que signifie CSS dans le développement web ?",
  "options": [
    "A. Feuilles de style centralisées",
    "B. Feuilles de style informatiques",
    "C. Feuilles de style en cascade",
    "D. Feuilles de style créatives"
  ],
  "correct_answer": 3
},
{
  "question": "En programmation orientée objet, qu'est-ce que l'encapsulation ?",
  "options": [
    "A. Combinaison de données et de méthodes qui opèrent sur les données en une seule unité",
    "B. Découpage d'un programme en modules plus petits",
    "C. Stockage de données dans un format structuré",
    "D. Suppression des fonctionnalités inutiles du code"
  ],
  "correct_answer": 1
},
{
  "question": "Quelle syntaxe est la bonne pour afficher Hello World! en Java ?",
  "options": [
    "A. std::cout << \"Hello World!\" ",
    "B. System.out.println(\"Hello World!\")",
    "C. Console.WriteLine(\"Hello World!\")",
    "D. puts \"Hello World!\""
  ],
  "correct_answer": 2
},
{
  "question": "Quel type de données COBOL est utilisé pour stocker les nombres décimaux compressés ?",
  "options": [
    "A. PIC 9(n)",
    "B. PIC S9(n) COMPRESSED-DECIMAL",
    "C. PIC S9(n) PACKED-DECIMAL",
    "D. PIC 9(n)V9(m)"
  ],
  "correct_answer": 3
},
{
  "question": "Quel mot-clé est utilisé pour déclarer une fonction en langage de programmation Go ?",
  "options": [
    "A. func",
    "B. function",
    "C. def",
    "D. procedure"
  ],
  "correct_answer": 1
},
{
  "question": "En programmation Go, que signifie l'acronyme 'GOROOT' ?",
  "options": [
    "A. Go Runtime Environment",
    "B. Go Root of Operations",
    "C. Go Repository",
    "D. Go Object-Oriented Technology"
  ],
  "correct_answer": 1
},
{
  "question": "Quel mot-clé est utilisé en Python pour définir une fonction ?",
  "options": [
    "A. define",
    "B. function",
    "C. def",
    "D. func"
  ],
  "correct_answer": 3
},
{
  "question": "Quel est le but de l'instruction SQL SELECT ?",
  "options": [
    "A. Mettre à jour des enregistrements dans une base de données",
    "B. Récupérer des données d'une base de données",
    "C. Supprimer des enregistrements d'une base de données",
    "D. Insérer de nouveaux enregistrements dans une base de données"
  ],
  "correct_answer": 2
},
{
  "question": "Quelle est la sortie du code suivant en Python ?\n\n```python\nprint(3 * 4 + 8 / 2)\n```",
  "options": [
    "A. 10,0",
    "B. 18,0",
    "C. 14",
    "D. 20"
  ],
  "correct_answer": 2
},
{
  "question": "Quel type de données est utilisé pour stocker une séquence de caractères en programmation C ?",
  "options": [
    "A. int",
    "B. float",
    "C. char",
    "D. string"
  ],
  "correct_answer": 3
},
{
  "question": "Que désigne le terme 'mnémonique' en programmation Assembleur 68000 ?",
  "options": [
    "A. Un nom symbolique pour un opcode",
    "B. Un type de variable",
    "C. Une adresse mémoire",
    "D. Une opération arithmétique"
  ],
  "correct_answer": 1
},
{
  "question": "En programmation COBOL, à quoi sert la section 'FILE SECTION' ?",
  "options": [
    "A. Déclarer des variables de stockage temporaire",
    "B. Gérer le flux d'exécution du programme",
    "C. Spécifier des opérations arithmétiques",
    "D. Définir des fichiers d'entrée et de sortie de données"
  ],
  "correct_answer": 4
},
{
  "question": "Quel est le but de la commande \"npm\" dans le développement Node.js ?",
  "options": [
    "A. Gestionnaire de paquets Node",
    "B. Nouveau gestionnaire de projet",
    "C. Gestionnaire de processus Node",
    "D. Module de programmation Node"
  ],
  "correct_answer": 1
},
{
  "question": "Que permet de faire Docker en informatique ?",
  "options": [
    "A. Gérer les versions de Ruby",
    "B. Créer des conteneurs pour les applications",
    "C. Gérer les bases de données",
    "D. Compiler du code source"
  ],
  "correct_answer": 2
},
{
  "question": "Quel est le langage de programmation principalement associé à Ruby on Rails ?",
  "options": [
    "A. Java",
    "B. Python",
    "C. Ruby",
    "D. C++"
  ],
  "correct_answer": 3
},
{
  "question": "Quel est le paradigme de programmation principalement associé à OCaml ?",
  "options": [
    "A. Programmation impérative",
    "B. Programmation orientée objet",
    "C. Programmation fonctionnelle",
    "D. Programmation structurée"
  ],
  "correct_answer": 3
},
{
  "question": "Que signifie FAMAS ?",
  "options": [
    "A. Fusil Automatique du Ministère de l'Armement et de la Sécurité",
    "B. Fusil d'Anti Matière d'Assault Solideg",
    "C. Fusil d'Assaut Mecanisé de l'Armurerie de Saint-Denis",
    "D. Fusil d'Assaut de la Manufacture d'Arme de Saint-Etienne"
  ],
  "correct_answer": 4
}];

let currentQuestionIndex = 0;
const question_idle = document.getElementById("question_title");
const answer_1 = document.getElementById("qcm_choice1");
const answer_2 = document.getElementById("qcm_choice2");
const answer_3 = document.getElementById("qcm_choice3");
const answer_4 = document.getElementById("qcm_choice4");

function displayQuestionAndAnswers() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];

    question_idle.textContent = currentQuestion.question;
    answer_1.textContent = currentQuestion.options[0];
    answer_2.textContent = currentQuestion.options[1];
    answer_3.textContent = currentQuestion.options[2];
    answer_4.textContent = currentQuestion.options[3];

    currentQuestionIndex++;
  }
  else{
    location.replace("https://www.youtube.com/watch?v=wpV-gGA4PSk");
  }
}

 let user_score = 0;


function checkAnswer(selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex - 1];
  if (selectedAnswer === (currentQuestion.correct_answer - 1)) {
    user_score += 2;
  }
  else
  {
    user_score -= 4;
  }
  document.getElementById("user_score").textContent = user_score;
  displayQuestionAndAnswers();
}

function startQuizz() {
  displayQuestionAndAnswers();

  answer_1.addEventListener("click", () => checkAnswer(0));
  answer_2.addEventListener("click", () => checkAnswer(1));
  answer_3.addEventListener("click", () => checkAnswer(2));
  answer_4.addEventListener("click", () => checkAnswer(3));
}

// Partie Serveur à compléter
/*

fetch(`/api/get-cheater-score/${name}/${firstname}`)
  .then((response) => response.json())
  .then((data) => {
    const user_score = data.user_score;
    console.log("User score: ", user_score);
    document.getElementById("user_score").textContent = user_score;
  })
  .catch((error) => {
    console.log("Error fetching user score: ", error);
  });


async function checkAnswer(name, firstname, selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex - 1];
  if (selectedAnswer === (currentQuestion.correct_answer - 1)) {
    user_score += 2;
  } else {
    user_score -= 4;
  }
  const response = await fetch(`/api/get-cheater-score/${name}/${firstname}`);
  const data = await response.json();
  user_score = data.user_score;

  document.getElementById("user_score").textContent = user_score;
  displayQuestionAndAnswers();
}

function startQuizz() {
  displayQuestionAndAnswers();
  answer_1.addEventListener("click", () => checkAnswer(name, firstname, 0));
  answer_2.addEventListener("click", () => checkAnswer(name, firstname, 1));
  answer_3.addEventListener("click", () => checkAnswer(name, firstname, 2));
  answer_4.addEventListener("click", () => checkAnswer(name, firstname, 3));
}
*/

startQuizz();
