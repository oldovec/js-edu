function eval() {
    // Do not use eval!!!
    return;
}

const priorities = {
    '^': 3,
    '/': 2,
    '*': 2,
    '+': 1,
    '-': 1,
    '(': 0,
    ')': 0
};

function expressionCalculator(expr) {

    const reversePolishNotationArray = reversePolishNotation(expr);

    let step = 0;
    let result = 0;
    while (reversePolishNotationArray.length !== 1) {
        if (priorities[reversePolishNotationArray[step]] !== undefined) {
            const num1 = Number(reversePolishNotationArray[step - 2]);
            const num2 = Number(reversePolishNotationArray[step - 1]);
            const expOperator = reversePolishNotationArray[step];
            if (isNaN(num1) || isNaN(num2)) {
                throw new Error('ExpressionError: Wrong expression');
            } else {
                // TODO: Consider to use object function for each operator
                if (expOperator === '+') {
                    result = num1 + num2;
                }
                if (expOperator === '-') {
                    result = num1 - num2;
                }
                if (expOperator === '*') {
                    result = num1 * num2;
                }
                if (expOperator === '/') {
                    if (num2 === 0) {
                        throw new Error('TypeError: Division by zero.');
                    }
                    result = num1 / num2;
                }
                reversePolishNotationArray[step - 2] = result;
                reversePolishNotationArray.splice(step - 1, 2);
                step -= 2;
            }
        }
        step++;
    }

    return result;
}

function reversePolishNotation(expr) {

    let numberStr = '';
    const reversePolishNotationArray = [];
    const operands = [];
    for (let i = 0; i < expr.length; i++) {
        const symbol = expr.charAt(i);
        const numberSymbol = parseInt(symbol, 10);
        if (!isNaN(numberSymbol)) {
            numberStr += symbol;
        } else {
            if (numberStr !== '') {
                reversePolishNotationArray.push(numberStr);
                numberStr = '';
            }

            if (symbol !== ' ') {
                if (symbol === '(') {
                    operands.push(symbol);
                }
                if (symbol === '+' || symbol === '-') {
                    if (operands.length > 0 && priorities[symbol] <= priorities[operands[operands.length - 1]]) {
                        const priorSymb = priorities[symbol];
                        const priorStackOp = priorities[operands[operands.length - 1]];
                        while (operands.length !== 0 && priorities[symbol] <= priorities[operands[operands.length - 1]]) {
                            reversePolishNotationArray.push(operands.pop());
                        }
                    }
                    operands.push(symbol);
                }

                if (symbol === '/' || symbol === '*') {
                    if (operands.length > 0 && priorities[symbol] <= priorities[operands[operands.length - 1]]) {
                        reversePolishNotationArray.push(operands.pop());
                    }
                    operands.push(symbol);
                }

                if (symbol === ')') {
                    while (operands.length !== 0 && operands[operands.length - 1] !== '(') {
                        reversePolishNotationArray.push(operands.pop());
                    }
                    if (operands[operands.length - 1] === '(') {
                        // Push out '(' symbol
                        operands.pop();
                    } else {
                        throw new Error('ExpressionError: Brackets must be paired');
                    }
                }
            }
        }

        if (i === expr.length - 1) {
            if (numberStr !== '') {
                reversePolishNotationArray.push(numberStr);
                numberStr = '';
            }

            while (operands.length !== 0) {
                if (operands[operands.length - 1] === '(') {
                    throw new Error('ExpressionError: Brackets must be paired');
                }
                reversePolishNotationArray.push(operands.pop());
            }
        }
    }

    return reversePolishNotationArray;
}

module.exports = {
    expressionCalculator
}
