function updateLeaderboard(leaderboard) {
    const table = document.getElementById(".leaderboard");
    table.innerHTML = "";
  
    leaderboard.forEach((user, index) => {
        const row = table.insertRow();
        const rankCell = row.insertCell();
        const userIdCell = row.insertCell();
        switch (index) {
            case 0:
                userIdCell.style.fontSize = "xx-large";
                rankCell.textContent = '🥇';
                userIdCell.style.color = "#FFB02E";
                break;
            case 1:
                userIdCell.style.fontSize = "x-larger";
                rankCell.textContent = '🥈';
                userIdCell.style.color = "#C7C7C7";
                break;
            case 2:
                userIdCell.style.fontSize = "large";
                rankCell.textContent = '🥉';
                userIdCell.style.color = "#D3883E";
                break;
            default:
                userIdCell.style.fontSize = "medium";
                rankCell.textContent = '☠️';
                userIdCell.style.color = "white";
        }
        userIdCell.textContent = user.userId;
    });
  }