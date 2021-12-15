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

//TODO LIST:
// fix timer that goes into neg
// set up last question button to go to score input
// set up text on score input page for your final score + secondsLeft
// set up input button to go to highscore page and input score to ol that orders higher times above lower ones



// Linking buttons and containers to variables to use in js
var startButton = document.querySelector("#start-btn");
var openingContainer = document.querySelector(".opening-container");
var questionContainer = document.querySelector(".question-container");
var questionDiv = document.querySelector("#question");
var answerButtons = document.querySelector("#answer-btns");
var displayCorrect = document.querySelector(".display-correct");
var displayWrong = document.querySelector(".display-wrong");
var timer = document.querySelector(".timer");
var inputInitials = document.querySelector("#input");
var submitInitialsButton = document.querySelector(".submit-initials");
var orderedListItems = document.querySelector(".ol-El");
var goBackButton = document.querySelector(".go-back");
var clearHighscoresButton = document.querySelector(".clear-highscores");
var displayResult = document.querySelector(".result");
var inputScoreContainer = document.querySelector(".input-score-container");
var highscoreContainer = document.querySelector(".highscore-container");

// Other variables
var mixQuestions;
var questionIndex;
var secondsLeft = 1; //change back to 60
var maxHighscoreList = 10;



// The event listener and function to start the game once the start button is clicked
startButton.addEventListener("click", startGame);

function startGame() {
    setTime();
    openingContainer.classList.add("hide");
    mixQuestions = questionsArray.sort(() => Math.random() -.5);
    questionIndex = 0;
    questionContainer.classList.remove("hide");
    selectNextQuestion();
}

// Selects next question from the question array
// untested
function selectNextQuestion() {
    if (mixQuestions.length === 0) {
        endGame();
    } else {
        refreshAnswers();
        displayQuestion();
    }
}

// Removes orginal answer buttons
function refreshAnswers() {
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Displays each question and answer to their respective elements - question div and answer buttons
function displayQuestion(x) {
    questionDiv.innerText = x.question;
    x.answers.forEach(answers => {
        // Creates new buttons to apply answer text too
        var newAnswerButtons = document.createElement("button");
        newAnswerButtons.innerText = answers.text;
        newAnswerButtons.classList.add("btn");
        // Sets appropiate attribute for correct/wrong answer
        if (answers.correct) {
            newAnswerButtons.setAttribute("answer", "correct");
        } else {
            newAnswerButtons.setAttribute("answer", "wrong");
        }
        newAnswerButtons.addEventListener("click", (event) => {
            questionIndex++;
            clickedAnswer(event);
        })
        answerButtons.appendChild(newAnswerButtons);
    });
}

// When an answer button is clicked this checks the attribute and displays appropiate correct/wrong div
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
            // 10 seconds taken off if answer was wrong
            secondsLeft = secondsLeft - 10;
        }
    }
    // if // reaches last index then stop, increasing here or nextqfun end game
    selectNextQuestion();
};

// Array of different questions to be cycled through
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
        
        if (secondsLeft === 0) {            // if (secondsLeft === 0 || mixQuestions is out???)
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Goes to input initials page and shows score
function endGame() {
    questionContainer.classList.add("hide");
    inputScoreContainer.classList.remove("hide");
    displayResult.innerText = "Your score was " + secondsLeft;

    submitInitialsButton.addEventListener("click", () => {
        renderHighscores();
        inputScoreContainer.classList.add("hide");
        highscoreContainer.classList.remove("hide");
        
    })
}


var highScores = JSON.parse(localStorage.getItem("highscore")) || [];

function renderHighscores() {
    var score = {
        score: secondsLeft,
        name: inputInitials.value
    }
    highScores.push(score);
    // if b is higher than a than put b
    highScores.sort((a,b) => b.score - a.score);
    
    orderedListItems.innerHTML = highScores.map(eachHighscore => {
        return "<li>" + eachHighscore.name + " - " + eachHighscore.score;
    }
    ).join("");

    
    localStorage.setItem("highscore", JSON.stringify(highScores));
}





// Reloads webpage which leads back to the start
goBackButton.addEventListener("click", () => {
    location.reload();
});

// Refreshs page clearing highscores also clearing localStorage of highscores
clearHighscoresButton.addEventListener("click", () => {
    while (orderedListItems.firstChild)
    orderedListItems.removeChild(orderedListItems.firstChild);
    localStorage.clear();
})

// for (i=0; i < localStorage.length; i++) {
//    if (localStorage.key(i).indexOf("highscore") !== -1) {



//   eachHighscore = document.createElement("li");
//   eachHighscore.innerText = highScores.score + " - " + highScores.name;
//   orderedListItems.appendChild(eachHighscore);


// function displayQuestion(x) {
//     questionDiv.innerText = x.question;
//     x.answers.forEach(answers => {
//         // Creates new buttons to apply answer text too
//         var newAnswerButtons = document.createElement("button");
//         newAnswerButtons.innerText = answers.text;
//         newAnswerButtons.classList.add("btn");
//         // Sets appropiate attribute for correct/wrong answer
//         if (answers.correct) {
//             newAnswerButtons.setAttribute("answer", "correct")
//         } else {
//             newAnswerButtons.setAttribute("answer", "wrong")
//         }
//         newAnswerButtons.addEventListener("click", (event) => {
//             questionIndex++;
//             clickedAnswer(event);
//         })
//         answerButtons.appendChild(newAnswerButtons);
//     });
// }
// 
// function clickedAnswer(event) {
//     var button = event.target;
//     if  (button.matches("button")) {
//         var getAttribute = button.getAttribute("answer")
//         if (getAttribute === "correct") {
//             displayCorrect.classList.remove("hide");
//             displayWrong.classList.add("hide");
//         } else {
//             displayWrong.classList.remove("hide");
//             displayCorrect.classList.add("hide");
//             // 10 seconds taken off if answer was wrong
//             secondsLeft = secondsLeft - 10;
//         }
//     }
//     selectNextQuestion();
// };
// 
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















