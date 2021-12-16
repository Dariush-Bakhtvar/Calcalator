const btnNumber = document.querySelectorAll('[data-number]');
const operandKey = document.querySelectorAll('[data-operation]');
const allClear = document.querySelector('[data-allClear]');
const Clear = document.querySelector('[data-clear]');
const equal = document.querySelector('[data-equal]');
const previousOperand = document.querySelector('.previousOp');
const currentOperand = document.querySelector('.currentOp');

class Calcalator {
    constructor(previous, current) {
        this.previous = previous;
        this.current = current;
        this.allClear();
    }
    allClear() {
        this.currentOp = '';
        this.previousOp = '';
        this.Operation = undefined;
        this.previous.textContent = '';
        this.current.textContent = '';
    }
    claer() {
        this.currentOp = `${this.currentOp}`.slice(0, -1);
    }
    appendNumber(number) {
        if (number == '.' && this.currentOp.includes('.')) return;
        this.currentOp += `${number}`;
    }
    chooseOperation(operation) {
        if (this.currentOp == '') return; //pervent to add empty as value perious op
        if (this.previousOp != '') this.compute();
        this.Operation = operation;
        this.previousOp = this.currentOp;
        this.currentOp = '';
        console.log(this.previousOp, this.currentOp);
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOp);
        const curr = parseFloat(this.currentOp);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.Operation) {
            case '+':
                if (prev < 1 && curr < 1) computation = (prev * 10 + curr * 10) / 10;
                computation = prev + curr;
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
            case '%':
                computation = (prev * 0.01) * curr;
                break;
            default:
                return;
        }
        this.currentOp = computation; // get new value 
        this.previousOp = '';
        this.Operation = undefined;
    }
    updateDisplay() {
        this.current.textContent = this.currentOp;
        if (this.Operation != undefined) this.previous.textContent = `${this.previousOp}${this.Operation}`;
        else this.previous.textContent = this.previousOp;
    }
}
// class Calcalator {
//     constructor(previous, current) {
//         this.previous = previous;
//         this.current = current;
//         this.allClear();
//     }
//     allClear() {
//         this.prevOp = '';
//         this.currOp = '';
//         this.Operation = undefined;
//         this.previous.textContent = '';
//         this.current.textContent = '';
//     }
//     clear() {
//         this.currOp = `${this.currOp}`.slice(0, -1);
//     }
//     appendNumber(number) {
//         if (number === '.' && this.currOp.includes('.')) return; /// prevent to add multi point
//         this.currOp += `${number}`;
//     }
//     chooseOperation(operation) {
//         if (this.currOp == '') return; // prevent to add empty string to prvOp
//         if (this.prevOp !== ' ') this.compute();
//         this.Operation = operation;
//         this.prevOp = this.currOp;
//         this.currOp = '';
//     }
//     compute() {
//         let computation;
//         const prev = parseFloat(this.prevOp);
//         const curr = parseFloat(this.currOp);
//         if (isNaN(prev) || isNaN(curr)) return;
//         switch (this.Operation) {
//             case '+':
//                 if (prev < 1 && curr < 1) computation = (prev * 10 + curr * 10) / 10;
//                 else computation = prev + curr;
//                 break;
//             case '-':
//                 computation = prev - curr;
//                 break;
//             case '*':
//                 computation = prev * curr;
//                 break;
//             case '÷':
//                 computation = prev / curr;
//                 break;
//             default:
//                 return;
//         }
//         this.currOp = computation;
//         this.Operation = undefined;
//         this.prevOp = '';
//     }
//     updateDisplay() {
//         this.current.textContent = this.currOp;
//         if (this.Operation !== undefined) this.previous.textContent = `${this.prevOp}${this.Operation}`;
//         else this.previous.textContent = this.prevOp;
//     }
// }
const calcalator = new Calcalator(previousOperand, currentOperand);
btnNumber.forEach(button => {
    button.addEventListener('click', () => {
        calcalator.appendNumber(button.textContent);
        calcalator.updateDisplay();


    });
});
operandKey.forEach(button => {
    button.addEventListener('click', () => {
        calcalator.chooseOperation(button.textContent);
        calcalator.updateDisplay();
    });
});
allClear.addEventListener('click', () => {
    calcalator.allClear();
    calcalator.updateDisplay();
});
Clear.addEventListener('click', () => {
    calcalator.claer();
    calcalator.updateDisplay();
});
equal.addEventListener('click', () => {
    calcalator.compute();
    calcalator.updateDisplay();
});