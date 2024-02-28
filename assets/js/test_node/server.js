const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('QIIIIIIIIIIIIZZZZZZZZZZZ :)');
});

app.get('/id', (req, res) => {
    res.send('ca va etre les id des eleves lors du test ;)');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Serveur Express en cours d'exécution sur le port : ${port}`);
});
