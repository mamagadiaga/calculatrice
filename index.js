const quizData = [
  {
    question: "Quelle est la capitale de la France ?",
    options: ["Paris", "Londres", "Berlin", "Rome"],
    answer: 0
  },
  {
    question: "Quelle est la plus grande planète du système solaire ?",
    options: ["Terre", "Mars", "Jupiter", "Saturne"],
    answer: 2
  },
  // Ajoutez plus de questions ici
];

const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let timer;

function displayQuestion(questionIndex) {
  const currentQuizQuestion = quizData[questionIndex];
  questionElement.textContent = currentQuizQuestion.question;

  optionsElement.innerHTML = '';
  currentQuizQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement('button');
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => checkAnswer(index));
    optionsElement.appendChild(optionElement);
  });
}

function checkAnswer(userAnswer) {
  if (userAnswer === quizData[currentQuestion].answer) {
    score++;
    feedbackElement.textContent = "Bonne réponse!";
  } else {
    feedbackElement.textContent = "Mauvaise réponse.";
  }
  displayNextQuestion();
}

function displayNextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion(currentQuestion);
  } else {
    endQuiz();
  }
}

function displayPrevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion(currentQuestion);
  }
}

function endQuiz() {
  clearInterval(timer);
  questionElement.textContent = "Fin du quiz!";
  optionsElement.innerHTML = '';
  feedbackElement.textContent = '';
  scoreElement.textContent = `Score final: ${score}/${quizData.length}`;
}

function startTimer(duration) {
  let time = duration;
  timer = setInterval(() => {
    timerElement.textContent = `Temps restant: ${time}s`;
    time--;
    if (time < 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

displayQuestion(currentQuestion);
startTimer(60); // 60 secondes pour répondre à chaque question

prevButton.addEventListener('click', displayPrevQuestion);
nextButton.addEventListener('click', displayNextQuestion);
