const numberBtn = document.querySelectorAll('.numberic');
const result = document.querySelector('.resutl');
const tempCalc = document.querySelector('.tempcalc');
const allClear = document.querySelector('#AC');
const backSpace = document.querySelector('#backSpace');
//! Arthmathic button + - * /
const sum = document.querySelector('#sum');
const sub = document.querySelector('#sub');
const multiple = document.querySelector('#multiple');
const division = document.querySelector('#division');
const percent = document.querySelector('#percent');
const Equal = document.querySelector('#Equal');
const point = document.querySelector('#point');

let setPoint = false;
let num1, num2;
let tempOp = '';
let setResult = false;

allClear.addEventListener('click', () => {
    result.textContent = '0';
    tempCalc.textContent = '0';
    // setResult = false;
    num1 = num2 = 0;
});

backSpace.addEventListener('click', () => {
    const lenTC = tempCalc.textContent.length;
    const lenRs = result.textContent.length;
    if (lenTC > 1) tempCalc.textContent = tempCalc.textContent.substring(0, lenTC - 1);
    else tempCalc.textContent = '0';
    if (lenRs > 1) result.textContent = result.textContent.slice(0, -1);
    else result.textContent = '0';
    // if (lenRs == '0') tempCalc.textContent = '0';
});

numberBtn.forEach(item => {
    item.addEventListener('click', (e) => {
        const value = e.target.textContent;
        if (value == '.' && tempCalc.textContent == '0') tempCalc.textContent += value;
        else if (tempCalc.textContent != '0') tempCalc.textContent += value;
        else tempCalc.textContent = value;
        //** add Point befor 0 or after digit */
        if (value == '.' && result.textContent == '0') result.textContent += value;
        else if (result.textContent == '0') result.textContent = value;
        else result.textContent += value;
    });
});
sum.addEventListener('click', () => {
    num1 = parseFloat(result.textContent);
    result.textContent = '0';
    tempCalc.textContent += '+';
    tempOp = '+';
});
sub.addEventListener('click', () => {
    num1 = parseFloat(result.textContent);
    result.textContent = '0';
    tempCalc.textContent += '-';
    tempOp = '-';
});
multiple.addEventListener('click', () => {
    num1 = parseFloat(result.textContent);
    console.log(num1);
    result.textContent = '0';
    tempCalc.textContent += '*';
    tempOp = '*';
});
division.addEventListener('click', () => {
    num1 = parseFloat(result.textContent);
    console.log(num1);
    result.textContent = '0';
    tempCalc.textContent += '+';
    tempOp = '/';
});
percent.addEventListener('click', () => {
    num1 = parseFloat(result.textContent);
    console.log(num1);
    result.textContent = '0';
    tempCalc.textContent += '%';
    tempOp = '%';
});
Equal.addEventListener('click', () => {
    if (setResult == false) num2 = parseFloat(result.textContent);
    else num1 = parseFloat(result.textContent);
    // num2 = parseFloat(result.textContent);
    switch (tempOp) {
        case '+':
            result.textContent = num1 + num2;
            break;
        case '-':
            result.textContent = num1 - num2;
            break;
        case '*':
            result.textContent = num1 * num2;
            break;
        case '/':
            result.textContent = num1 / num2;
            break;
        case '%':
            result.textContent = (num1 * 0.01) * num2;
            break;
    }
    // setResult = true;
});