const axios = require("axios");
const BASE_URL = "https://opentdb.com/api.php"
let numberOfQuestions = 10;
let difficultyLevel = "easy";
function getQuizData() {
    return axios.get(`${BASE_URL}?amount=${numberOfQuestions}&difficulty=${difficultyLevel}`)
    .then((response) => {
        return response.data.results;
    })
    .catch((error) => {
        console.log(error);
    })
}

async function displayQuizData() {
    const quizData = await getQuizData();
    return quizData;
}

displayQuizData().then((response)=> {
    const quizData = response;
    
})
//const quizData = require('../quiz-data.js');
//console.log(quizData);
/*
const quizData = [
    {
        gradeLevel: "1st",
        question: "Who invented the light bulb?",
        a: "George Washington",
        b: "Thomas Edison",
        c: "Benjamin Franklin",
        d: "Thomas Jefferson",
        correctAnswer: "b"

    }, {
        gradeLevel: "2nd",
        question: "What was the first city to be attacked by an atomic bomb during World War II?",
        a: "Tokyo",
        b: "Nagasaki",
        c: "Pearl Harbor",
        d: "Hiroshima",
        correctAnswer: "d"

    }, {
        gradeLevel: "3rd",
        question: "Julius Caesar was emperor of which historic empire?",
        a: "Caliphate",
        b: "Ottoman",
        c: "Roman",
        d: "Mongol",
        correctAnswer: "c"
    }, {
        gradeLevel: "4th",
        question: "Who wrote the national anthem of the United States of America?",
        a: "Walt Whitman",
        b: "Thomas Cole",
        c: "Francis Scott Key",
        d: "John Adams",
        correctAnswer: "c"
    }, {
        gradeLevel: "5th",
        question: 'The words "the," "an," and "a," are known as what in English grammar?',
        a: "Adverbs",
        b: "Passive",
        c: "Adjectives",
        d: "Articles",
        correctAnswer: "d"
    }, {
        gradeLevel: "4th",
        question: 'What do you call a group of crows?',
        a: "a Gaggle",
        b: "a Hoard",
        c: "a Murder",
        d: "a Collection",
        correctAnswer: "c"
    }, {
        gradeLevel: "3rd",
        question: 'Which is the longest river in the world?',
        a: "Amazon",
        b: "Yangtze",
        c: "Yellow",
        d: "Nile",
        correctAnswer: "a"
    },
];

*/

const answerElements = document.querySelectorAll('.answer');
const questionElement = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const SubmitButton = document.getElementById('submit');
const quiz = document.getElementById('quiz');
let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswer();
    const currentQuizData = quizData[currentQuiz];
   
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;    
}

function deselectAnswer() {
    answerElements.forEach((answerElements) => {
        answerElements.checked = false;
    });
}

function getSelected() {

    const answerElements = document.querySelectorAll('.answer');
    let answer = undefined;

    answerElements.forEach((answerElements) => {
        if(answerElements.checked) {
            answer = answerElements.id;
        }
    });
    return answer;
}

SubmitButton.addEventListener("click", () => {
    const answer = getSelected();

    if(answer) {
        if(answer === quizData[currentQuiz].correctAnswer) {
            score ++;
        }
        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You scored ${score} out of ${quizData.length}!</h2> <button onClick="location.reload();">Try Again</button>`
        }
    }
});