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

function chooseAnswer() {

}

var questionsArray = [
    {
        question: "What colour is the sky?:",
        answers: [
            {text: "Blue", correct: true},
            {text: "Orange", correct: false},
            {text: "Purple", correct: false},
            {text: "Yellow", correct: false}
        ]
    }
]