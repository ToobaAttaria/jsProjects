const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const equal = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const del = document.querySelector('.del');

function result() {

    if(currentOperand.value!=""){
        try {
            const res = parseFloat(eval(currentOperand.value).toFixed(3));
            previousOperand.innerHTML = currentOperand.value;
            currentOperand.value = res;
        } catch {
            currentOperand.value = "Error";
        }

    }

}

currentOperand.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        result();
    }
});

equal.addEventListener('click', result);

clear.addEventListener('click', () => {
    previousOperand.innerHTML = "";
    currentOperand.value = "";
});

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentOperand.value += btn.textContent;
    });

});

del.addEventListener('click', () => {
    currentOperand.value=currentOperand.value.slice(0,-1)
})