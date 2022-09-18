const calculator = document.querySelector('.calculator');
const screen = document.querySelector('.screen');
const keys = document.querySelector('.keys');
const lastAnswer = document.querySelector('.answer');

keys.addEventListener('click', e => {
  if (e.target.nodeName === 'BUTTON') {
    const key = e.target;
    const keyValue = key.textContent;
    // console.log(keyValue);
    const operation = key.dataset.operator;
    const rendered = screen.textContent;
    const lastKeyInput = calculator.dataset.lastKeyInput;
    if (!operation) {
      if (screen.textContent === '0') {
        screen.textContent = keyValue;
      } else {
        screen.textContent = rendered + keyValue;
      }
      calculator.dataset.lastKeyInput = 'number';
    }
    if (
      keyValue === '+' ||
      keyValue === '-' ||
      keyValue === '×' ||
      keyValue === '÷' ||
      keyValue === '%'
    ) {
      if (lastKeyInput !== 'operator' && !calculator.dataset.operator) {
        screen.textContent = rendered + keyValue;
        calculator.dataset.operator = operation;
        calculator.dataset.firstKeyValue = rendered;
        calculator.dataset.lastKeyInput = 'operator';
      }
    }

    if (keyValue === '.') {
      if (!rendered.includes('.')) {
        screen.textContent = rendered + keyValue;
      }
      if (lastKeyInput === 'operator') {
        screen.textContent = rendered + '0.';
      }
      if (operation && lastKeyInput === 'number') {
        screen.textContent = rendered + keyValue;
      }
      calculator.dataset.lastKeyInput = operation;
    }
    if (keyValue === 'AC') {
      screen.textContent = '0';
      cleanAttributes();
      calculator.dataset.lastKeyInput = operation;
    }
    if (keyValue === '=') {
      if (calculator.dataset.operator && lastKeyInput == 'number') {
        const firstNumber = calculator.dataset.firstKeyValue;
        const operator = calculator.dataset.operator;
        let index = rendered.indexOf(`${operator}`);
        let lastNumber = rendered.slice(index + 1, rendered.length);
        const answer = calculation(firstNumber, operator, lastNumber);
        screen.textContent = answer;
        lastAnswer.textContent = answer;
        cleanAttributes();
        calculator.dataset.lastKeyInput = operation;
      }
    }
  }
});

function cleanAttributes() {
  calculator.removeAttribute('data-operator');
  calculator.removeAttribute('data-first-key-value');
}

function calculation(a, operator, b) {
  let answer = '';
  if (operator === '+') {
    answer = Number(a) + Number(b);
  }
  if (operator === '-') {
    answer = Number(a) - Number(b);
  }
  if (operator === '×') {
    answer = Number(a) * Number(b);
  }
  if (operator === '÷') {
    answer = Number(a) / Number(b);
  }
  if (operator === '%') {
    answer = Number(b) * (Number(a) / 100);
  }
  return answer;
}
