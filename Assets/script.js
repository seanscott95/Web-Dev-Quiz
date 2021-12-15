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
var viewHighscores = document.querySelector("#view-highscores");

// Other variables
var mixQuestions;
var questionIndex;
var secondsLeft = 60;
var highScores = JSON.parse(localStorage.getItem("highscore")) || [];



// The event listener and function to start the game once the start button is clicked
startButton.addEventListener("click", startGame);

// Starts timer and goes to questions container 
function startGame() {    
    openingContainer.classList.add("hide");
    //sorts out questions randomly
    mixQuestions = questionsArray.sort(() => Math.random() -.5);
    questionIndex = 0;
    questionContainer.classList.remove("hide");
    setTime();
}

// Selects next question from the question array if there is one
function selectNextQuestion() {
    refreshAnswers();
    displayQuestion(mixQuestions[questionIndex]);
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
        question: "The condition in an if/else statement is enclosed witin _______:",
        answers: [
            {text: "Parenthesis", correct: true},
            {text: "Quotes", correct: false},
            {text: "Curly brackets", correct: false},
            {text: "Square brackets", correct: false}
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _______:",
        answers: [
            {text: "Numbers and strings", correct: false},
            {text: "Other arrays", correct: false},
            {text: "Booleans", correct: true},
            {text: "All of the above", correct: false}
        ]
    },
    {
        question: "String values must be enclosed within ______ when being asssigned to variables:",
        answers: [
            {text: "Commas", correct: false},
            {text: "Parenthesis", correct: false},
            {text: "Curly brackets", correct: false},
            {text: "Quotes", correct: true}
        ]
    },
    {
        question: "Commonly used datatypes DO NOT include:",
        answers: [
            {text: "Strings", correct: false},
            {text: "Alerts", correct: true},
            {text: "Booleans", correct: false},
            {text: "Numbers", correct: false}
        ]
    }
]

// Timer countdown from 60 seconds
function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft;
        
        if (secondsLeft === 0 || questionIndex === mixQuestions.length) {            // if (secondsLeft === 0 || mixQuestions is out???)
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
    selectNextQuestion();
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

// 
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
    }).join("");
    
    localStorage.setItem("highscore", JSON.stringify(highScores));
}

viewHighscores.addEventListener("click", () => {
    openingContainer.classList.add("hide");
    questionContainer.classList.add("hide");
    inputScoreContainer.classList.add("hide");
    highscoreContainer.classList.remove("hide");
    highScores.sort((a,b) => b.score - a.score);
    
    orderedListItems.innerHTML = highScores.map(eachHighscore => {
        return "<li>" + eachHighscore.name + " - " + eachHighscore.score;
    }).join("");
    
    localStorage.setItem("highscore", JSON.stringify(highScores));
});

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