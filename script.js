let previousNum = '';
let currentNum = '';
let operator = '';

const currentDisplay = document.querySelector('.current-number');
const previousDisplay = document.querySelector('.previous-number');

window.addEventListener('keydown', handleKeyPress);

const equal = document.querySelector('.equals');
equal.addEventListener('click', () => {
  if (currentNum != '' && previousNum != '') {
    calculate();
  }
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click', addDecimal)

const clear = document.querySelector('.clear');
clear.addEventListener('click', clearCalculator);

const del = document.querySelector('.delete');
del.addEventListener('click', deleteNumber);

const numbers = document.querySelectorAll('.number');

const operators = document.querySelectorAll('.operator');

numbers.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
  });
});

function handleNumber(number) {
    if (previousNum !== '' && currentNum !== '' && operator === '') {
      previousNum = '';
      currentDisplay.textContent = currentNum;
    }
  if (currentNum.length <=11) {
    currentNum += number;
    currentDisplay.textContent = currentNum;
  }
}

operators.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
  });
});

function handleOperator(op) {
  if (previousNum === '') {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === '') {
    operatorCheck(op);
  } else {
    calculate();
  operator = op;
  previousDisplay.textContent = previousNum + ' ' + operator;
  currentDisplay.textContent = '0';
  }
}

function operatorCheck(text) {
  operator = text;
  previousDisplay.textContent = previousNum + ' ' + operator;
  currentDisplay.textContent = '0';
  currentNum = '';
}

function calculate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);
  if (operator === '/') {
    if (currentNum <= 0) {
      previousNum = "ERROR";
      displayResults()
      return;
    }
    previousNum /= currentNum;
  } else if (operator === '*') {
    previousNum *= currentNum;
  } else if (operator === '-') {
    previousNum -= currentNum;
  } else if (operator === '+') {
    previousNum += currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults()
}

function roundNumber(num) {
  return Math.round(num * 100000) / 100000;
}

function displayResults() {
  if (previousNum.length <= 11) {
    currentDisplay.textContent = previousNum;
  } else {
    currentDisplay.textContent = previousNum.slice(0,11) + '...';
  }
  previousDisplay.textContent = '';
  operator = '';
  currentNum = '';
}

function clearCalculator() {
  currentNum = '';
  previousNum = '';
  operator = '';
  currentDisplay.textContent = '0';
  previousDisplay.textContent = '';
}

function deleteNumber() {
  currentNum = currentNum.slice(0,-1);
  currentDisplay.textContent = currentNum;
}

function addDecimal() {
  if (!currentNum.includes('.')) {
    currentNum += '.';
    currentDisplay.textContent = currentNum;
  }
}

function handleKeyPress(e) {
  e.preventDefault()
  if(e.key >=0 && e.key <=9) {
    handleNumber(e.key);
  }
  if (e.key === 'Enter' || (e.key === "=" && currentNum != '' && previousNum != "")) {
    calculate();
  }
  if (e.key === "+" || e.key === '-' || e.key === '/' || e.key === '*') {
    handleOperator(e.key);
  }
  if (e.key === '.') {
    addDecimal();
  }
  if (e.key === 'Backspace') {
    deleteNumber();
  }
}