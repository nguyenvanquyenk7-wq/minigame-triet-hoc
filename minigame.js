
const questions = [
    {
        question: "Câu 1: Triết học nghiên cứu vấn đề cơ bản nào?",
        answers: [
            "Mối quan hệ giữa vật chất và ý thức",
            "Các hiện tượng thời tiết",
            "Các quy luật sinh học",
            "Các hoạt động kinh tế"
        ],
        correct: 0
    },
    {
        question: "Câu 2: Vấn đề cơ bản của triết học gồm mấy mặt?",
        answers: ["Một mặt", "Hai mặt", "Ba mặt", "Bốn mặt"],
        correct: 1
    },
    {
        question: "Câu 3: Theo chủ nghĩa duy vật, cái nào có trước?",
        answers: ["Ý thức", "Tư duy", "Vật chất", "Cảm xúc"],
        correct: 2
    },
    {
        question: "Câu 4: Theo chủ nghĩa duy tâm, yếu tố nào giữ vai trò quyết định?",
        answers: [
            "Tự nhiên",
            "Vật chất",
            "Lao động",
            "Ý thức hoặc tinh thần"
        ],
        correct: 3
    },
    {
        question: "Câu 5: Ai là những người sáng lập triết học Mác?",
        answers: [
            "C. Mác và Ph. Ăngghen",
            "Lênin và Stalin",
            "Hêghen và Phoiơbắc",
            "Platon và Aristotle"
        ],
        correct: 0
    },
    {
        question: "Câu 6: Theo Lênin, vật chất tồn tại như thế nào?",
        answers: [
            "Phụ thuộc hoàn toàn vào ý thức",
            "Tồn tại khách quan, độc lập với ý thức",
            "Chỉ tồn tại trong suy nghĩ",
            "Chỉ tồn tại trong trí tưởng tượng"
        ],
        correct: 1
    },
    {
        question: "Câu 7: Ý thức có nguồn gốc nào theo triết học Mác - Lênin?",
        answers: [
            "Chỉ có nguồn gốc xã hội",
            "Chỉ có nguồn gốc tự nhiên",
            "Nguồn gốc tự nhiên và nguồn gốc xã hội",
            "Không có nguồn gốc"
        ],
        correct: 2
    },
    {
        question: "Câu 8: Phép biện chứng duy vật nghiên cứu điều gì?",
        answers: [
            "Chỉ những sự vật đứng yên",
            "Chỉ các sự kiện lịch sử",
            "Chỉ hoạt động kinh tế",
            "Mối liên hệ phổ biến và sự phát triển"
        ],
        correct: 3
    },
    {
        question: "Câu 9: Thực tiễn có vai trò gì đối với nhận thức?",
        answers: [
            "Là cơ sở, động lực, mục đích và tiêu chuẩn kiểm tra chân lý",
            "Không liên quan đến nhận thức",
            "Chỉ là kết quả của suy nghĩ",
            "Chỉ là hoạt động sản xuất"
        ],
        correct: 0
    },
    {
        question: "Câu 10: Theo triết học Mác - Lênin, vật chất và ý thức có quan hệ thế nào?",
        answers: [
            "Ý thức quyết định hoàn toàn vật chất",
            "Vật chất quyết định ý thức, ý thức tác động trở lại vật chất",
            "Hai yếu tố không liên quan",
            "Vật chất và ý thức hoàn toàn giống nhau"
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const messageElement = document.getElementById("message");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const resultElement = document.getElementById("result");
const gameElement = document.querySelector(".game");

function loadQuestion() {
    answered = false;

    const q = questions[currentQuestion];

    questionNumber.textContent =
        `Câu ${currentQuestion + 1}/${questions.length}`;

    scoreElement.textContent = `⭐ Điểm: ${score}`;
    questionElement.textContent = q.question;
    messageElement.textContent = "Hãy chọn một đáp án!";
    progressBar.style.width =
        `${currentQuestion / questions.length * 100}%`;

    answersElement.innerHTML = "";
    nextBtn.disabled = true;
    nextBtn.textContent = "Câu tiếp theo ➜";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.className = "answer-btn";
        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {
            checkAnswer(index, button);
        });

        answersElement.appendChild(button);
    });
}

function checkAnswer(index, button) {
    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];
    const buttons = answersElement.querySelectorAll("button");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (index === q.correct) {
        score++;
        button.classList.add("correct");
        messageElement.textContent = "🎉 Chính xác! Bạn được +1 điểm.";
    } else {
        button.classList.add("wrong");
        buttons[q.correct].classList.add("correct");

        messageElement.textContent =
            `❌ Chưa đúng! Đáp án đúng là: ${q.answers[q.correct]}`;
    }

    scoreElement.textContent = `⭐ Điểm: ${score}`;

    progressBar.style.width =
        `${(currentQuestion + 1) / questions.length * 100}%`;

    nextBtn.disabled = false;

    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "Xem kết quả 🏆";
    }
}

nextBtn.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    gameElement.hidden = true;
    resultElement.hidden = false;

    let message = "";

    if (score >= 8) {
        message = "Xuất sắc! Bạn nắm khá tốt kiến thức cơ bản.";
    } else if (score >= 5) {
        message = "Khá tốt! Hãy ôn lại các câu chưa đúng nhé.";
    } else {
        message = "Bạn hãy ôn tập thêm rồi thử sức lần nữa nhé!";
    }

    resultElement.innerHTML = `
        <h2>🏆 Hoàn thành trò chơi!</h2>
        <h3>Điểm của bạn: ${score}/${questions.length}</h3>
        <p>${message}</p>
        <button id="restartBtn">🔄 Chơi lại</button>
    `;

    document.getElementById("restartBtn").addEventListener("click", restartGame);
}

function restartGame() {
    currentQuestion = 0;
    score = 0;

    resultElement.hidden = true;
    gameElement.hidden = false;

    loadQuestion();
}

loadQuestion();
