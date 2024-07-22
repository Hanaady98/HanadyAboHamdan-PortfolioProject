/*----------------OPTIONS SECTION-------------------*/

/*--For The Values Of The Numbers And Operators Range Later--*/

const numbersRange = document.getElementById('num-range');
const operatorsRange = document.getElementById('operators-range');

/*---------------------labels------------------------*/

const firstNumber = document.getElementById('num1');
const operator = document.getElementById('operator');
const secondNumber = document.getElementById('num2');

/*-------------------input----------------------*/

const writtenAnswer = document.getElementById('answer');

/*--------------------button----------------------*/

const checkButton = document.getElementById('sub-btn');

/*----------------exercise----------------------*/

const exercise = document.querySelector('.exercise');

/*----------------------TABLE-------------------------*/

const table = document.getElementById('results');

/*-----------------------------------------*/

function calc() {

    const updateNumbers = () => {

        const numbersRange_value = parseInt(numbersRange.value);

        const number1 = Math.floor(Math.random() * numbersRange_value) + 1;
        const number2 = Math.floor(Math.random() * numbersRange_value) + 1;

        firstNumber.textContent = number1;
        secondNumber.textContent = number2;
    };

    const updateOperator = () => {
        const operatorsRange_value = operatorsRange.value;
        operator.textContent = operatorsRange_value;
    };

    // numbers
    numbersRange.onchange = updateNumbers;

    //operators
    operatorsRange.onchange = updateOperator;

    updateNumbers();
    updateOperator();
}

calc(); // the end of the calc function
/*-----------------------------------------------*/

checkButton.addEventListener('click', () => {

    const correct = correctAnswer();
    const usersAnswer = writtenAnswer.value;

    //array for the info to be displayed on each cell
    const rowData = [
        exercise.textContent,
        correct,
        usersAnswer,
        pointsCalc(correct, usersAnswer)
    ];

    //row creation
    const newRow = document.createElement('tr');

    // loop to create each item cell
    rowData.forEach(data => {
        const cellInfo = document.createElement('td');
        cellInfo.textContent = data;
        newRow.appendChild(cellInfo);
    });

    table.appendChild(newRow);
});

//functions

function correctAnswer() {

    const num1 = parseInt(firstNumber.textContent);
    const num2 = parseInt(secondNumber.textContent);
    const chosenOp = operator.textContent;


    if (chosenOp === '+') {
        return num1 + num2;
    } else if (chosenOp === '-') {
        return num1 - num2;
    } else if (chosenOp === '*') {
        return num1 * num2;
    } else if (chosenOp === '/') {
        return num1 / num2;
    }
};

//
function pointsCalc(correct, usersAnswer) {

    if (usersAnswer == correct) {
        return "10 points";
    } else {
        return "0 points";
    }
};
/*-----------------------------------------------*/