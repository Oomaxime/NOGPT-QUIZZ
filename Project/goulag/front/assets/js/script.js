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