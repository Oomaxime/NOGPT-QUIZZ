log_button.addEventListener('click', function(e) {
    const name = document.getElementById('name_input').value;
    const firstname = document.getElementById('firstname_input').value;

    if (name.trim() === '' || firstname.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        e.preventDefault();
    }

});