// start button click starts game
// questions appear
// timer starts
// if answer is correct show correct else show wrong
// if answer is wrong penalise 10s
// go to next question
// repeat for all questions
// if either all questions answered or if timer runs out end game and go to form to input score
// after input go to highscores
// show highscores if high enough time left
// have play again button


// Linking buttons and containers to variables to use in js
var startButton = document.querySelector("#start-btn");
var openingContainer = document.querySelector(".opening-container");
var questionContainer = document.querySelector(".question-container");
var questionDiv = document.querySelector("#question");
var answerButtons = document.querySelector("#answer-btn");
var displayCorrect = document.querySelector(".display-correct");
var displayWrong = document.querySelector(".display-wrong");

// Other variables
var mixQuestions;
var questionIndex;



// Event listeners
startButton.addEventListener("click", startGame);


function startGame() {
    openingContainer.classList.add("hide");
    mixQuestions = questionsArray.sort(() => Math.random() -.5);
    questionIndex = 0
    questionContainer.classList.remove("hide");
    selectNextQuestion();


}

function selectNextQuestion() {
    refreshAnswers();
    displayQuestion(mixQuestions[questionIndex]);
    
}

function refreshAnswers() {
    while(answerButtons.firstChild) {
        answerButtons.removeChild
        (answerButtons.firstChild)
    }
}

function displayQuestion(question) {
    questionDiv.innerText = question.question;
    question.answers.forEach(element => {
        var newAnswerButtons = document.createElement("button");
        newAnswerButtons.innerText = element.text;
        newAnswerButtons.classList.add("btn");
        if (element.correct) {
            newAnswerButtons.dataset.correct = element.correct;
        }
        newAnswerButtons.addEventListener("click", chooseAnswer)
        answerButtons.appendChild(newAnswerButtons);
    });
}

function chooseAnswer(element) {
    var answerButtonChosen = element.target
    var correct = answerButtonChosen.dataset.correct
    showAnswerComment(element, correct)
    Array.from(answerButtons.children).forEach(button => {
        showAnswerComment(button, button.dataset.correct)
    })
    if (mixQuestions.length > questionIndex.length +1) {
        selectNextQuestion();
    }
}

function showAnswerComment(element, correct) {
    removeAnswerComment(element)
    if (correct) {
        displayCorrect.classList.remove("hide")
    } else {
        displayWrong.classList.remove("hide")
    }
}

function removeAnswerComment () {
    if (correct) {
        displayCorrect.classList.add("hide")
    } else {
        displayWrong.classList.add("hide")
    }
}



var questionsArray = [
    {
        question: "What colour is the sky?",
        answers: [
            {text: "Blue", correct: true},
            {text: "Orange", correct: false},
            {text: "Purple", correct: false},
            {text: "Yellow", correct: false}
        ]
    },
    {
        question: "What grows on apple trees?",
        answers: [
            {text: "Mandarins", correct: false},
            {text: "Pears", correct: false},
            {text: "Apples", correct: true},
            {text: "Mushrooms", correct: false}
        ]
    },
    {
        question: "_________, boil 'em, mash 'em, stick 'em in a stew!",
        answers: [
            {text: "iPhone's", correct: false},
            {text: "Eraser's", correct: false},
            {text: "Metal's", correct: false},
            {text: "PO-TA-TOES", correct: true}
        ]
    },
    {
        question: "What is the circumference of the Earth?",
        answers: [
            {text: "4.739M km", correct: false},
            {text: "40,075 km", correct: true},
            {text: "21,344 km", correct: false},
            {text: "10,921 km", correct: false}
        ]
    }
]



// function showAnswerComment(element, correct) {
//     removeAnswerComment(element)
//     if (correct) {
//         element.classList.add("display-correct")
//     } else {
//         element.classList.add("display-wrong")
//     }
// }
// 
// function removeAnswerComment () {
//     if (correct) {
//         element.classList.remove("display-correct")
//     } else {
//         element.classList.remove("display-wrong")
//     }
// }
