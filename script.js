const rollButton = document.getElementById('rollButton');
const quantityInput = document.getElementById('quantity');
const difficultyInput = document.getElementById('difficulty');
const diceTypeInput = document.getElementById('diceType');
const resultContainer = document.getElementById('resultContainer');
const successCount = document.getElementById('successCount');
const failureCount = document.getElementById('failureCount');
const showModalButton = document.getElementById('showModalButton');
const modal = document.getElementById('modal');
const rollDetails = document.getElementById('rollDetails');
const resetButton = document.getElementById('resetButton');

rollButton.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    const difficulty = parseInt(difficultyInput.value);
    const diceType = diceTypeInput.value;

    let successes = 0;
    let failures = 0;
    const rolls = [];

    for (let i = 0; i < quantity; i++) {
        let rollResult;
        if (diceType === 'd6') {
            rollResult = Math.floor(Math.random() * 6) + 1;
        } else if (diceType === 'd12') {
            rollResult = Math.floor(Math.random() * 12) + 1;
        } else {
            rollResult = Math.floor(Math.random() * 10) + 1; // Padrão é d10
        }
        rolls.push(rollResult);

        if (rollResult >= difficulty) {
            successes++;
        } else if (rollResult === 1) {
            failures++;
        }
    }

    successCount.textContent = successes;
    failureCount.textContent = failures;
    resultContainer.classList.remove('hidden');
    showModalButton.disabled = false;

    showModalButton.addEventListener('click', () => {
        modal.style.display = 'block';
        rollDetails.innerHTML = '';
        rolls.forEach(roll => {
            const li = document.createElement('li');
            li.textContent = roll;
            rollDetails.appendChild(li);
        });
    });
    
    modal.addEventListener('click', event => {
        if (event.target === modal || event.target.className === 'close') {
            modal.style.display = 'none';
            rollDetails.innerHTML = '';
        }
    });
    
    resetButton.addEventListener('click', () => {
        quantityInput.value = 1;
        difficultyInput.value = 5;
        resultContainer.classList.add('hidden');
        showModalButton.disabled = true;
        rollDetails.innerHTML = '';
    });
});