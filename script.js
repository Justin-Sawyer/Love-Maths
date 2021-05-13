/* The main game "loop", called when the script is first loaded
and after the user's answer has been processed */

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type") === "submit") {
                // alert("You clicked submit!")
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                // alert(`You clicked ${gameType}`);
                runGame(gameType)
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");
});

function runGame(gameType) {
    // Creates two numbers with a value of between 1 and 25

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    let num1 = Math.round(Math.random() * 25) + 1;
    let num2 = Math.round(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else {
        alert(`Unknown game type ${gameType}`);
        throw `Unknown game type ${gameType}, aborting!`;
    }

}

// Called when the user clicks the Submit button or presses Enter

function checkAnswer() {
    /* Checks the answer against the first element in the returned 
    calculateRightAnswer array */

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateRightAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];

    if (isCorrect) {
        alert("Well done! Correct Answer! :)");
        incrementScore();
    } else {
        alert(`Aww... You answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}.`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);

}

function calculateRightAnswer() {
    /* Gets the operands (the numbers) and the operator (plus, minus sign etc.)
    directly from the DOM */

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"];
    } else {
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}, aborting!`;
    }
}

function incrementScore() {
    // Gets the current score from the DOM and increments it

    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
}

function incrementWrongAnswer() {
    // Gets the current tally of incorrect answers from the DOM and increments it

    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
}

// Displays the questions.

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;

    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;

    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;

    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    operand1 = operand1*operand2;
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;

    document.getElementById("operator").textContent = "/";
}

