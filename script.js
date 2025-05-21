// === Questions Array ===
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Berlin", "Munich", "Brandenburg", "Hamburg"],
    answer: "Berlin",
  },
  {
    question: "What happens when you divide a negative number by another negative in Python?",
    options: [
      "The result is positive",
      "The result is negative",
      "It raises an error",
      "It returns zero",
    ],
    answer: "The result is positive",
  },
  {
    question: "How does Python handle strings with extremely long lengths, like 10,000 characters?",
    options: [
      "It truncates the string automatically",
      "It throws a memory error",
      "It handles them efficiently",
      "It converts to a different data type",
    ],
    answer: "It handles them efficiently",
  },
  {
    question: "What is the result of using 'is' to compare two identical integers in Python?",
    options: [
      "True for numbers outside -5 to 256",
      "False",
      "True for all cases",
      "Depends on the interpreter",
    ],
    answer: "True for numbers within -5 to 256",
  },
  {
    question: "How does the 'strip()' method handle strings with only whitespace?",
    options: [
      "Returns an empty string",
      "Throws an error",
      "Leaves the string unchanged",
      "Returns None",
    ],
    answer: "Returns an empty string",
  },
  {
    question: "What happens when you try to create a dictionary with two keys that are identical except for case in Python?",
    options: [
      "It throws an error",
      "The last key overwrites the first",
      "Both keys are allowed as they are different",
      "It ignores duplicate keys",
    ],
    answer: "The last key overwrites the first",
  },
  {
    question: "What is the behavior of a list comprehension when the iterable is empty in Python?",
    options: [
      "Returns None",
      "Throws an error",
      "Creates an empty list",
      "Loop indefinitely",
    ],
    answer: "Creates an empty list",
  },
  {
    question: "How does exception handling with 'finally' work if the code inside 'try' uses a return statement?",
    options: [
      "The finally block is skipped",
      "The finally block executes after the return",
      "It causes an error",
      "Dependent on the exception",
    ],
    answer: "The finally block executes after the return",
  },
  {
    question: "What happens when you reach Python's recursion limit with a function?",
    options: [
      "It continues until it finishes",
      "Throws a RecursionError",
      "Becomes slower but continues",
      "Crashes the program",
    ],
    answer: "Throws a RecursionError",
  },
  {
    question: "What is the output of the expression `bool([])` in Python?",
    options: ["True", "False", "None", "Error"],
    answer: "False",
  },
  {
    question: "How does floating-point arithmetic in Python handle numbers like 0.1 + 0.2?",
    options: [
      "Exactly equals 0.3",
      "Approximates closely to 0.3",
      "Results in 0.300000000004",
      "Throws a precision error",
    ],
    answer: "Results in 0.300000000004",
  },
  {
    question: "What happens when you modify an element of a list while iterating over it with a for loop?",
    options: [
      "It updates the list and continues",
      "Throws a runtime error",
      "Ignores the modification",
      "Causes undefined behavior",
    ],
    answer: "Causes undefined behavior",
  },
  {
    question: "How does Python's lambda function handle arguments if no parameters are specified?",
    options: [
      "It raises an error immediately",
      "It can still be called with no arguments",
      "It throws a TypeError when called",
      "It works as expected",
    ],
    answer: "It raises an error immediately",
  },
  {
    question: "What is the capital of Italy?",
    options: ["Roma", "Milan", "Venice", "King", "Parma"],
    answer: "Roma",
  },
  {
    question: "Who first developed a Linux kernel?",
    options: [
      "Bill Gates",
      "Linus Benedict Torvalds",
      "Mark Zuckerberg",
      "Steve Jobs",
    ],
    answer: "Linus Benedict Torvalds",
  },
];

let current = 0;
let hearts = 5;
let correctAnswers = 0;
let failedQuestions = [];
let questionOrder = [...quizData];

function loadQuestion() {
  const q = questionOrder[current];
  document.getElementById("question").innerText = q.question;
  const opts = q.options
    .map(
      (opt) =>
        `<label><input type='radio' name='opt' value='${opt}'> ${opt}</label><br>`
    )
    .join("");
  document.getElementById("options").innerHTML = opts;
}

function nextQuestion() {
  const selected = document.querySelector('input[name="opt"]:checked');
  if (selected) {
    const isCorrect = selected.value === questionOrder[current].answer;
    if (isCorrect) {
      alert("Correct!");
      correctAnswers++;
      document.getElementById("correctAnswers").innerText = correctAnswers;
      if (correctAnswers % 3 === 0 && hearts < 5) {
        hearts++;
        document.getElementById("hearts").innerText = hearts;
      }
    } else {
      alert("Wrong! The answer is " + questionOrder[current].answer);
      failedQuestions.push(questionOrder[current]);
      hearts--;
      document.getElementById("hearts").innerText = hearts;
    }

    current++;
    if (current === questionOrder.length) {
      if (failedQuestions.length > 0) {
        questionOrder = shuffleArray(failedQuestions);
        failedQuestions = [];
        current = 0;
      } else {
        alert("Quiz completed!");
        questionOrder = [...quizData];
        current = 0;
        correctAnswers = 0;
        hearts = 5;
        document.getElementById("hearts").innerText = hearts;
        document.getElementById("correctAnswers").innerText = correctAnswers;
      }
    }

    loadQuestion();
  } else {
    alert("Please select an option!");
  }
}

// Shuffle function (Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Toggle rules visibility
function toggleRules() {
  const rulesContent = document.getElementById("rulesContent");
  rulesContent.style.display =
    rulesContent.style.display === "block" ? "none" : "block";
}

// Load the first question on page load
window.onload = loadQuestion;
