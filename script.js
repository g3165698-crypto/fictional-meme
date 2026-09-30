let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// Сұрақ қосу функциясы
function addQuestion() {
    const qText = document.getElementById("question-input").value;
    const opt1 = document.getElementById("option1").value;
    const opt2 = document.getElementById("option2").value;
    const opt3 = document.getElementById("option3").value;
    const correct = parseInt(document.getElementById("correct-answer").value);

    if(!qText || !opt1 || !opt2 || !opt3) {
        alert("Өтініш, барлық өрістерді толтырыңыз!");
        return;
    }

    questions.push({
        question: qText,
        options: [opt1, opt2, opt3],
        answer: correct
    });

    // Өрістерді тазалау
    document.getElementById("question-input").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    
    document.getElementById("question-count").innerText = `Қосылған сұрақтар саны: ${questions.length}`;
}

// Тестті бастау
function startQuiz() {
    if(questions.length === 0) {
        alert("Әуелі ең болмаса 1 сұрақ қосыңыз!");
        return;
    }
    document.getElementById("creator-box").classList.add("hide");
    document.getElementById("quiz-box").classList.remove("hide");
    showQuestion();
}

// Сұрақты көрсету
function showQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById("quiz-question").innerText = `${currentQuestionIndex + 1}. ${q.question}`;
    
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
    document.getElementById("next-btn").classList.add("hide");

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => selectAnswer(btn, index);
        optionsContainer.appendChild(btn);
    });
}

// Жауапты таңдау
function selectAnswer(selectedBtn, index) {
    const correctIndex = questions[currentQuestionIndex].answer;
    const buttons = document.querySelectorAll("#options-container button");

    buttons.forEach(btn => btn.disabled = true); // Барлық батырманы бұғаттау

    if(index === correctIndex) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        buttons[correctIndex].classList.add("correct");
    }

    document.getElementById("next-btn").classList.remove("hide");
}

// Келесі сұраққа өту
function nextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Нәтижені көрсету
function showResult() {
    document.getElementById("quiz-box").classList.add("hide");
    document.getElementById("result-box").classList.remove("hide");
    document.getElementById("score-text").innerText = `Сіз ${questions.length} сұрақтың ${score} сұрағына дұрыс жауап бердіңіз!`;
}

// Қайта жүктеу
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-box").classList.add("hide");
    document.getElementById("creator-box").classList.remove("hide");
}