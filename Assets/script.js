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
var answerButtons = document.querySelector("#answer-btns");
var displayCorrect = document.querySelector(".display-correct");
var displayWrong = document.querySelector(".display-wrong");
var timer = document.querySelector(".timer");

// Other variables
var mixQuestions;
var questionIndex;
var secondsLeft = 60;



// Event listeners
startButton.addEventListener("click", startGame);


function startGame() {
    setTime();
    openingContainer.classList.add("hide");
    mixQuestions = questionsArray.sort(() => Math.random() -.5);
    questionIndex = 0;
    questionContainer.classList.remove("hide");
    
    selectNextQuestion();


}

function selectNextQuestion() {
    refreshAnswers();
    displayQuestion(mixQuestions[questionIndex]);
}

function refreshAnswers() {
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function displayQuestion(x) {
    questionDiv.innerText = x.question;
    x.answers.forEach(answers => {
        var newAnswerButtons = document.createElement("button");
        newAnswerButtons.innerText = answers.text;
        newAnswerButtons.classList.add("btn");
        if (answers.correct) {
            newAnswerButtons.setAttribute("answer", "correct")
        } else {
            newAnswerButtons.setAttribute("answer", "wrong")
        }
        newAnswerButtons.addEventListener("click", (event) => {
            questionIndex++;
            clickedAnswer(event);
        })
        answerButtons.appendChild(newAnswerButtons);
    });
}

function clickedAnswer(event) {
    var button = event.target;
    if  (button.matches("button")) {
        var getAttribute = button.getAttribute("answer")
        if (getAttribute === "correct") {
            displayCorrect.classList.remove("hide");
            displayWrong.classList.add("hide");
        } else {
            displayWrong.classList.remove("hide");
            displayCorrect.classList.add("hide");
            secondsLeft = secondsLeft - 10;
        }
    }
    if (mixQuestions.length > questionIndex.length +1) {      //is this the problem for not going to next q?
        selectNextQuestion();
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

// Timer countdown from 60 seconds

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;
        
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            inputHighscore();
        }
    }, 1000);
}


function inputHighscore() {

}
// var questionsArray = [
//     {
//         question: "What colour is the sky?",
//         answers: [
//             {text: "Blue"},
//             {text: "Orange"},
//             {text: "Purple"},
//             {text: "Yellow"}
//         ]
//     },
//     {
//         question: "What grows on apple trees?",
//         answers: [
//             {text: "Mandarins"},
//             {text: "Pears"},
//             {text: "Apples"},
//             {text: "Mushrooms"}
//         ]
//     },
//     {
//         question: "_________, boil 'em, mash 'em, stick 'em in a stew!",
//         answers: [
//             {text: "iPhone's"},
//             {text: "Eraser's"},
//             {text: "Metal's"},
//             {text: "PO-TA-TOES"}
//         ]
//     },
//     {
//         question: "What is the circumference of the Earth?",
//         answers: [
//             {text: "4.739M km", correct: false},
//             {text: "40,075 km", correct: true},
//             {text: "21,344 km", correct: false},
//             {text: "10,921 km", correct: false}
//         ]
//     }
// ]











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



// function chooseAnswer(event) {
//     var answerButtonClicked = event.target
//     var correct = answerButtonClicked.dataset.correct
//     showAnswerComment(displayCorrect, correct) //******* 2229
//     Array.from(answerButtons.children).forEach(button => {
//         showAnswerComment(button, button.dataset.correct)
//     })
//     if (mixQuestions.length > questionIndex.length +1) {
//         selectNextQuestion();
//     }
// }
// 
// function showAnswerComment(element, correct) {
//     removeAnswerComment(element)
//     if (correct) {
//         displayCorrect.classList.remove("hide")
//     } else {
//         displayWrong.classList.remove("hide")
//     }
// }
// 
// function removeAnswerComment () {
//     if (correct) {
//         displayCorrect.classList.add("hide")
//     } else {
//         displayWrong.classList.add("hide")
//     }
// }
// 



// function displayQuestion(question) {
//     questionDiv.innerText = question.question;
//     question.answers.forEach(answer => {
//         const newAnswerButtons = document.createElement("button");
//         newAnswerButtons.innerText = answer.text;
//         newAnswerButtons.classList.add("btn");
//         if (answer.correct) {
//             newAnswerButtons.dataset.correct = answer.correct;
//         }
//         newAnswerButtons.addEventListener("click", () => {
//             questionIndex++;
//             clickedAnswer();
//         })
//         answerButtons.appendChild(newAnswerButtons);
//     });
// }
// 


//
// function clickedAnswer(event) {
//     var answerButtonClicked = event.target //First error .target, undefined?, wrong type?
//     const correct = answerButtonClicked. // Second error undefined  reading dataset, 
//     showAnswerComment(displayCorrectWrong, correct) 
//     Array.from(answerButtons.children).forEach(button => {
//         showAnswerComment(button, button.dataset.correct)
//     })
//     if (mixQuestions.length > questionIndex.length +1) {
//         selectNextQuestion();
//     }
// }















