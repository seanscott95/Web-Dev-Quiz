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

var startButton = document.querySelector("#start-btn");
var openingContainer = document.querySelector(".opening-container");
var questionContainer = document.querySelector(".question-container");

startButton.addEventListener("click", startGame);



function startGame() {
    openingContainer.classList.add("hide");
    questionContainer.classList.remove("hide");

}

function selectNextQuestion() {

}

function selectAnswer() {

}