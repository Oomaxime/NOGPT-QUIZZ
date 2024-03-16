function generateUniqueId() {
  const randomNumber = Math.floor(Math.random() * 100);
  const uniqueId = '4' + randomNumber.toString().padStart(3, '0');
  return uniqueId;
}

const user_id = document.getElementById("user_number");
user_id = generateUniqueId();

function BeginTest() {
  // 4 minutes
  const redirectTimeout = setTimeout(function() {
    window.location.href = 'http://127.0.0.1:5501/front/main_test.html';
  }, 240000);


  const alertTimeout = setTimeout(function() {
    alert('10 secondes avant lancement !!!');
    clearTimeout(redirectTimeout);
    setTimeout(function() {
      window.location.href = 'http://127.0.0.1:5501/front/main_test.html';
    }, 10000);
  }, 230000);

  window.onload = function(){
    BeginTest();
  }
}

BeginTest();

export{user_id}