import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase project configuration goes here
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Referenceto the data in your Firebase Realtime Database
const dataRef = ref(db, 'path/to/your/data');

// Function to fetch and display the data
const fetchData = () => {
  onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    const sortedData = sortScores(data);
    displayLeaderboard(sortedData);
  }, {
    onlyOnce: true,
  });
};

// Function to display the leaderboard
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

// Initial fetch
fetchData();

// Update the data every 5 seconds
setInterval(fetchData, 5000);

// The sortScores function
function sortScores(data) {
  return data.sort((a, b) => b.score - a.score);
}