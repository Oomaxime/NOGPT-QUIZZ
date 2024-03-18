
const leaderboard = [
    { userId: 4072, score: 12 },
    { userId: 4052, score: 17 },
    { userId: 4081, score: 1 },
    { userId: 4020, score: 9 },
    { userId: 4042, score: -1 },
    { userId: 4021, score: 0 },
    { userId: 4001, score: 3 }
];

function sortLeaderboard(leaderboard) {
    return leaderboard.sort((a, b) => b.score - a.score);
}

function updateLeaderboard(leaderboard) {
    const table = document.getElementById("leaderboard");
    table.innerHTML = "";

    leaderboard.forEach((user, index) => {
        const row = table.insertRow();
        const rankCell = row.insertCell();
        const userIdCell = row.insertCell();

        switch (index) {
            case 0:
                userIdCell.style.fontSize = "60px";
                rankCell.textContent = '🥇';
                userIdCell.style.color = "#FFB02E";
                userIdCell.textContent = user.userId;
                break;
            case 1:
                userIdCell.style.fontSize = "52px";
                rankCell.textContent = '🥈';
                userIdCell.style.color = "#C7C7C7";
                userIdCell.textContent = user.userId;
                break;
            case 2:
                userIdCell.style.fontSize = "44px";
                rankCell.textContent = '🥉';
                userIdCell.style.color = "#D3883E";
                userIdCell.textContent = user.userId;
                break;
            default:
                break;
        }
    });
}

const sortedLeaderboard = sortLeaderboard(leaderboard);
updateLeaderboard(sortedLeaderboard);

setInterval(() => {
    sortedLeaderboard.sort((a, b) => b.score - a.score);
    updateLeaderboard(sortedLeaderboard);
}, 1000);