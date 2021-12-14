const btnNumber = document.querySelectorAll('[data-number]');
const btnOperation = document.querySelectorAll('[data-operation]');
const claer = document.querySelector('[data-clear]');
const allClaer = document.querySelector('[data-allclear]');
const equal = document.querySelector('[data-equal]');
const previousOp = document.querySelector('[data-previous]');
const currentOp = document.querySelector('[data-current]');

class Calcalator {
    constructor(PrevOp, CurrOp) {
        this.PrevOp = PrevOp;
        this.CurrOp = CurrOp;
        this.allClear();
    }
    allClear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.Operation = undefined;
        this.CurrOp.textContent = '';
        this.PrevOp.textContent = '';
    }
    clear() {
        this.currentOperand = `${this.currentOperand}`.slice(0, -1);
    }
    appendNumber(num) {
        if (num === '.' && this.currentOperand.includes('.')) return; // allow add once point
        this.currentOperand = `${this.currentOperand}${num}`;
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigit)) return '';
        else integerDisplay = integerDigit.toLocaleString('en', {
            maximumFractionDigits: 0
        });
        if (decimalDigit != null) return `${integerDisplay}.${decimalDigit}`;
        else return integerDisplay;
    }
    chooseOperation(operation) {
        if (this.currentOperand == '') return; // prevent to send  empty curr-Velue to prev-oprand 
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.Operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';

    }
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.Operation) {
            case '+':
                computation = current + previous;
                break;
            case '-':
                computation = current - previous;
                break;
            case '*':
                computation = current * previous;
                break;
            case '÷':
                computation = current / previous;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.Operation = undefined;
        this.previousOperand = '';

    }
    updateDisplay() {
        // this.PrevOp.textContent = this.previousOperand;
        this.CurrOp.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.Operation != null) {
            this.PrevOp.textContent = `${this.previousOperand} ${this.Operation}`;
        } else {
            this.PrevOp.textContent = '';
        }
    }
}
const calcalator = new Calcalator(previousOp, currentOp);
btnNumber.forEach(button => {
    button.addEventListener('click', () => {
        calcalator.appendNumber(button.textContent);
        calcalator.updateDisplay();

    });
});
btnOperation.forEach(button => {
    button.addEventListener('click', () => {
        calcalator.chooseOperation(button.textContent);
        calcalator.updateDisplay();
    });
});
equal.addEventListener('click', (button) => {
    calcalator.compute(button.textContent);
    calcalator.updateDisplay();
});
allClaer.addEventListener('click', () => {
    calcalator.allClear();
    calcalator.updateDisplay();
});
claer.addEventListener('click', () => {
    calcalator.clear();
    calcalator.updateDisplay();
});