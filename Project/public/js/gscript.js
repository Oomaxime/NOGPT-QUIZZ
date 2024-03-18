/*const USER = {
  id:"",
  score:0
};

function generateUniqueId() {
  const randomNumber = Math.floor(Math.random() * 100);
  const uniqueId = '4' + randomNumber.toString().padStart(3, '0');
  return uniqueId;
}

const user_id = document.getElementById("user_number");
USER.id = generateUniqueId();
user_id.innerHTML = USER.id;*/

function BeginTest() {
  // 4 minutes

  const redirectTimeout = setTimeout(function() {
    window.location.href = 'http://127.0.0.1:5500/view/main_test.html';
  }, 24000);


  const alertTimeout = setTimeout(function() {
    alert('10 secondes avant lancement !!!');
    clearTimeout(redirectTimeout);
    setTimeout(function() {
      window.location.href = 'http://127.0.0.1:5500/view/main_test.html';
    }, 1000);
  }, 23000);

}


BeginTest();
//module.exports = {USER}; (Node Js)
