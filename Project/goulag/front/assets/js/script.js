// script.js

// Se connecter au serveur Socket.io
const socket = io();

// Exemple : Mettre à jour le score côté client
function updateScore(newScore) {
    // Envoyer la mise à jour du score au serveur
    socket.emit('updateScore', newScore);
}

// Exemple : Mettre à jour l'interface utilisateur lorsqu'un score est mis à jour
socket.on('scoreUpdated', (data) => {
    console.log(`Score mis à jour pour l'utilisateur ${data.userId}: ${data.score}`);

    // Mettre à jour l'interface utilisateur en conséquence
    // Par exemple, vous pourriez afficher le score dans une balise HTML
    // Assurez-vous d'avoir une balise HTML appropriée sur votre page, par exemple : <div id="scoreDisplay"></div>
    document.getElementById('scoreDisplay').innerText = `Score de ${data.userId}: ${data.score}`;
});
