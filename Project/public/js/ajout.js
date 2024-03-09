const typeSelect = document.getElementById('type-select');
const numberSelect = document.getElementById('number-select');
const responseInputs = document.querySelectorAll('.response-input');
const checkInputs = document.querySelectorAll('.check-input');

const valuee = {
    type: `${typeSelect}`,
    title_quizz: `${admin_form-titre-nom}`,
    option: []
};

typeSelect.addEventListener('change', () => {
    valuee.type = typeSelect.value;
});

numberSelect.addEventListener('change', () => {
    const numberOfOptions = parseInt(numberSelect.value);
    valuee.option = [];

    for (let i = 0; i < numberOfOptions; i++) {
        const response = responseInputs[i].value;
        const check = checkInputs[i].checked;

        valuee.option.push({
            rep: response,
            intitule: document.getElementById(`intitule_question_${i}`).value,
            is_true: check
        });
    }
});
