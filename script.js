// Select DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Calculator state
let currentInput = '';
let previousInput = '';
let operator = null;
let resultDisplayed = false;

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const number = button.dataset.number;

        if (button.classList.contains('number') || button.classList.contains('decimal')) {
            appendNumber(number);
        } else if (button.classList.contains('operator')) {
            chooseOperator(action);
        } else if (button.classList.contains('equals')) {
            calculate();
        } else {
            handleAction(action);
        }

        updateDisplay();
    });
});

// Append number or decimal to current input
function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }

    if (number === '.' && currentInput.includes('.')) return;

    currentInput += number;
}

// Choose operator
function chooseOperator(action) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }

    operator = action;
    previousInput = currentInput;
    currentInput = '';
}

// Handle special actions like clear and delete
function handleAction(action) {
    if (action === 'clear') {
        clear();
    } else if (action === 'delete') {
        deleteLast();
    }
}

// Perform calculation based on the operator
function calculate() {
    if (operator === null || previousInput === '' || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let computation = 0;

    switch (operator) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            computation = current === 0 ? 'Error' : prev / current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operator = null;
    previousInput = '';
    resultDisplayed = true;
}

// Update the display
function updateDisplay() {
    display.textContent = currentInput || previousInput || '0';
}

// Clear all inputs
function clear() {
    currentInput = '';
    previousInput = '';
    operator = null;
    resultDisplayed = false;
}

// Delete the last character
function deleteLast() {
    if (resultDisplayed) {
        clear();
        return;
    }
    currentInput = currentInput.slice(0, -1);
}
