const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            {text: "Hyper Text Markup Language", correct: true},
            {text: "High Tech Markup Language", correct: false},
            {text: "Hyperlink Text Markup Language", correct: false},
            {text: "Home Tool Markup Language", correct: false}
        ]
    },

    {
        question: "Which technology is primarily responsible for the styling of web pages?",
        answers: [
            {text: "JavaScript", correct: false},
            {text: "CSS", correct: true},
            {text: "HTML", correct: false},
            {text: "Python", correct: false}
        ]
    },

    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Creative Style Sheets", correct: false},
            {text: "Computer Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Custom Style Sheets", correct: false}
        ]
    },

    {
        question: "Which programming language is mainly used for adding interactivity to websites?",
        answers: [
            {text: "HTML", correct: false},
            {text: "CSS", correct: false},
            {text: "JavaScript", correct: true},
            {text: "Python", correct: false}
        ]
    },

    {
        question: "What is the purpose of a front-end web development framework like React or Angular?",
        answers: [
            {text: "To manage databases and server-side logic", correct: false},
            {text: "To create a visually appealing user interface", correct: true},
            {text: "To handle server-side routing", correct: false},
            {text: "To interact with web servers", correct: false}
        ]
    },

    {
        question: "Which part of web development is responsible for handling data storage and retrieval?",
        answers: [
            {text: "Front-end development", correct: false},
            {text: "Back-end development", correct: true},
            {text: "Full-stack development", correct: false},
            {text: "Middleware development", correct: false}
        ]
    },

    
    {
        question: "What is the primary function of a web server in the context of web development?",
        answers: [
            {text: "Rendering web pages on the client’s browser", correct: false},
            {text: "Executing JavaScript code", correct: false},
            {text: "Storing user data", correct: false},
            {text: "Handling HTTP requests and serving web pages", correct: true}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML =questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

// var myTest = document.getElementById("answer-buttons").firstChild;
// console.log(myTest);


function resetState() {
    nextButton.style.display = "none";

    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;

    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = "You Scored " + score + " out of " + questions.length + "!"; /* `You scored ${score} out of ${questions.length}!`; */
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
