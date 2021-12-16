const btnNumber = document.querySelectorAll('[data-number]');
const oprerandKey = document.querySelectorAll('[data-operation]');
const clear = document.querySelector('[data-clear]');
const allclear = document.querySelector('[data-allclear]');
const equal = document.querySelector('[data-equal');
const previouseOperand = document.querySelector('[data-previous');
const currentOperand = document.querySelector('[data-current');

class Calcalator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.allClear();
    }
    allClear() {
        this.prevOp = '';
        this.currOp = '';
        this.Operation = undefined;
        this.previous.textContent = '';
        this.current.textContent = '';
    }
    clear() {
        this.currOp = `${this.currOp}`.slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currOp.includes('.')) return; /// prevent to add multi point
        this.currOp += `${number}`;
    }
    chooseOperation(operation) {
        if (this.currOp == '') return; // prevent to add empty string to prvOp
        if (this.prevOp !== ' ') this.compute();
        this.Operation = operation;
        this.prevOp = this.currOp;
        this.currOp = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.prevOp);
        const curr = parseFloat(this.currOp);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.Operation) {
            case '+':
                if (prev < 1 && curr < 1) computation = (prev * 10 + curr * 10) / 10;
                else computation = prev + curr;
                break;
            case '-':
                computation = prev - curr;
                break;
            case '*':
                computation = prev * curr;
                break;
            case '÷':
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currOp = computation;
        this.Operation = undefined;
        this.prevOp = '';
    }
    updateDisplay() {
        this.current.textContent = this.currOp;
        if (this.Operation !== undefined) this.previous.textContent = `${this.prevOp}${this.Operation}`;
        else this.previous.textContent = this.prevOp;
    }
}
const calcalator = new Calcalator(previouseOperand, currentOperand);
btnNumber.forEach(button => {
    button.addEventListener('click', () => {
        calcalator.appendNumber(button.textContent);
        calcalator.updateDisplay();
    });
});
allclear.addEventListener('click', () => {
    calcalator.allClear();
});
clear.addEventListener('click', () => {
    calcalator.clear();
    calcalator.updateDisplay();

});
oprerandKey.forEach(button => {
    button.addEventListener('click', () => {
        calcalator.chooseOperation(button.textContent);
        calcalator.updateDisplay();
    });
});
equal.addEventListener('click', () => {
    calcalator.compute();
    calcalator.updateDisplay();
});