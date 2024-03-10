function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var sevenMinutes = 60 * 7,
        display = document.querySelector('#timer');
    startTimer(sevenMinutes, display);
};


// Partie quiz

// fetch('../front/goulag-test.json')
//   .then(response => response.json())
//   .then(data => {
//     const questionData = data.questions[0];

//     const qcmButtons = document.getElementsByClassName('qcm_answer');
//     for (let i = 0; i < qcmButtons.length; i++) {
//       qcmButtons[i].textContent = questionData.options[i];
//     }

//     document.getElementById('question_title').textContent = questionData.question;
//   })

fetch('../front/goulag-test.json')
  .then(response => response.json())
  .then(data => {
    const { question, options } = data.questions[0];

    document.getElementById('question_title').textContent = question;
    document.querySelectorAll('.qcm_answer').forEach((button, index) => {
      button.textContent = options[index];
    });
  });