import {basicSetup} from "codemirror"
import {Compartment, EditorState} from "@codemirror/state"
import {EditorView, keymap} from "@codemirror/view"
import {indentWithTab} from "@codemirror/commands"
import truthGame from './editor_theme.js';

/**LISTE DES LANGAGES**/
import {html} from "@codemirror/lang-html"
import {css} from "@codemirror/lang-css"
import {javascript} from "@codemirror/lang-javascript"
import {python} from "@codemirror/lang-python"
import {php} from "@codemirror/lang-php"
import {sql} from "@codemirror/lang-sql"
import {json} from "@codemirror/lang-json"


/** CRÉATION ET SETUP DE L'ÉDITEUR DE CODE **/
let language = new Compartment

const fixedHeightEditor = EditorView.theme({
    "&": {height: "300px", font: "'JetBrains Mono', monospace", fontSize: '16px'},
    ".cm-scroller": {overflow: "auto"}
})


let state= EditorState.create({
    extensions: [
        fixedHeightEditor,
        truthGame,
        basicSetup,
        keymap.of([indentWithTab])
    ]
})

let langTag='javascript'

switch (langTag){
    case 'javascript':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
                language.of(javascript())
            ]
        });
        break;
    case 'html':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
                language.of(html())
            ]
        });
        break;
    case 'css':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
                language.of(css())
            ]
        });
        break;
    case 'python':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
                language.of(python())
            ]
        });
        break;
    case 'sql':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
                language.of(sql())
            ]
        });
        break
    case 'php':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
                language.of(php())
            ]
        });
        break
    case 'json':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
                language.of(json())
            ]
        });
        break
    case 'text':
        state = EditorState.create({
            extensions: [
                fixedHeightEditor,
                truthGame,
                basicSetup,
                keymap.of([indentWithTab]),
            ]
        });
        break
}

let view = new EditorView({
    state,
    parent: document.querySelector('.editor'),

})


const getFocus = setInterval(() => {
    view.focus();
    if(view.hasFocus) clearInterval(getFocus);
}, 500);

/** CHANGE LANGUAGE

 function setLanguage(value) {
 view.dispatch({
 effects: language.reconfigure(value)
 })
 }

 setLanguage(python()) **/

/***GET DATA***/

const getCodeButton = document.getElementById("getCodeButton")


getCodeButton.addEventListener(`click`, e => {


    fetch('/submit_code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({code: view.state.doc.toString() })
    })
  /**fetch('/submit_code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonCode
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de l\'envoi des données.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert("Données envoyé avec succès !");
        })
        .catch(error => {
            console.error(error);
            alert("Une erreur s'est produite lors de l'envoi des données.");
        }); */

})

