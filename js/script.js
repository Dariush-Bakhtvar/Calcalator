// const Button = document.querySelectorAll('button');
const numberic = document.querySelectorAll('.numberic');
let tempCalc = document.querySelector('.tempcalc');
const allClear = document.querySelector('#AC');
const clean = document.querySelector('#Clear');
let tempMemory = [];
numberic.forEach(item => {
    item.addEventListener('click', (e) => {

        tempCalc.innerHTML += e.target.textContent;
        tempMemory.push(tempCalc.textContent);
        console.log(tempMemory);
    });
});
allClear.addEventListener('click', () => {
    tempCalc.textContent = '';
    tempMemory = [];
    console.log(`All Clear Down ${tempMemory}`);
});
clean.addEventListener('click', () => {
    tempMemory.pop(tempMemory.length - 1);
    tempCalc.innerHTML = tempMemory;
    console.log('its ok');
});