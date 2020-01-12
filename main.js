const display = document.querySelector('.result');
const keyboard = document.querySelector('.keyboard');

keyboard.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const arr = Array.from(event.target.parentNode.children);
        arr.forEach(button => button.classList.remove('highlighted'));

        const buttonValue = event.target.textContent;
        const displayedNumber = display.textContent;
        const action = event.target.dataset.action;

        if (!action) {
            if (displayedNumber === '0' || keyboard.dataset.recentKeyType === 'operator' || keyboard.dataset.recentKeyType === 'calculate') {
                display.textContent = buttonValue;
            } else {
                display.textContent = displayedNumber + buttonValue;
            }
            keyboard.dataset.recentKeyType = 'number';
        }

        if (action === 'decimal-point') {
            if (!displayedNumber.includes('.')) display.textContent = displayedNumber + '.';
            if (keyboard.dataset.recentKeyType === 'operator' || keyboard.dataset.recentKeyType === 'calculate') display.textContent = '0.';
            keyboard.dataset.recentKeyType = 'decimal-point';
        }

        if (action === 'delete-all') {
            keyboard.dataset.recentKeyType = '';
            keyboard.dataset.firstArgument = '';
            keyboard.dataset.operator = '';
            keyboard.dataset.modifierValue = '';
            display.textContent = '0';
        }

        if (action === 'add' ||
            action === 'subtract' ||
            action === 'divide' ||
            action === 'multiply') {
            const firstArgument = keyboard.dataset.firstArgument;
            const secondArgument = displayedNumber;
            const operator = keyboard.dataset.operator;
            if (firstArgument && operator && keyboard.dataset.recentKeyType !== 'operator' && keyboard.dataset.recentKeyType !== 'calculate') {
                const calculatedValue = calculate(firstArgument, secondArgument, operator);
                display.textContent = calculatedValue;
                keyboard.dataset.firstArgument = calculatedValue;
            } else {
                keyboard.dataset.firstArgument = displayedNumber;
            }
            event.target.classList.add('highlighted');
            keyboard.dataset.recentKeyType = 'operator';
            keyboard.dataset.firstArgument = displayedNumber;
            keyboard.dataset.operator = action;
        }

        if (action === 'calculate') {
            let firstArgument = keyboard.dataset.firstArgument;
            let secondArgument = displayedNumber;
            const operator = keyboard.dataset.operator;
            if (firstArgument) {
                if (keyboard.dataset.recentKeyType === 'calculate') {
                    firstArgument = displayedNumber;
                    secondArgument = keyboard.dataset.modifierValue;
                }
                display.textContent = calculate(firstArgument, secondArgument, operator);
            }
            keyboard.dataset.recentKeyType = 'calculate';
            keyboard.dataset.modifierValue = secondArgument;
        }
    }
})

const calculate = (a, b, operation) => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (operation === 'add') return x + y;
    if (operation === 'subtract') return x - y;
    if (operation === 'multiply') return x * y;
    if (operation === 'divide') return x / y;
}