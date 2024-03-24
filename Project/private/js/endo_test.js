import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";


const firebaseConfig = {
  // Configuration
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const dataRef = ref(db, 'path/to/your/data');


const fetchData = () => {
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    const sortedData = sortScores(data);
    displayLeaderboard(sortedData);
  }, {
    onlyOnce: true,
  });
};


const displayLeaderboard = (data) => {
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';
  data.forEach(({ id }) => {
    const player = document.createElement('div');
    player.classList.add('player');
    player.innerHTML = `<span class="player__id">${id}</span>`;
    leaderboard.appendChild(player);
  });
};

fetchData();


setInterval(fetchData, 5000);


function sortScores(data) {
  return data.sort((a, b) => b.score - a.score);
}


// PARTIE NODEJS //

const userId = "user123"; //examples
const score = 100; //examples

firebase.database().ref("scores/" + userId).set(score);


firebase.database().ref("scores/").on("value", (snapshot) => {
  const scores = snapshot.val();

  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const leaderboard = sortedScores.map(([userId, score]) => ({ userId, score }));

  updateLeaderboard(leaderboard);
});

