const initialFlashcards = [
  { question: "What is JavaScript?", answer: "A programming language for interactive web pages." },
  { question: "What does HTML stand for?", answer: "HyperText Markup Language." },
  { question: "What is CSS used for?", answer: "For styling and layout of web pages." }
];

let flashcards = [];
let currentIndex = 0;

const container = document.getElementById("flashcard-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const counter = document.getElementById("card-counter");
const form = document.getElementById("add-card-form");
const qInput = document.getElementById("question-input");
const aInput = document.getElementById("answer-input");

function loadFlashcards() {
  const saved = localStorage.getItem("flashcards");
  flashcards = saved ? JSON.parse(saved) : [...initialFlashcards];
  saveFlashcards();
}

function saveFlashcards() {
  localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function renderCard() {
  container.innerHTML = "";

  if (flashcards.length === 0) {
    container.innerHTML = "<p>No flashcards. Add one below!</p>";
    counter.textContent = "0 / 0";
    return;
  }

  const card = document.createElement("div");
  card.className = "flashcard";

  card.innerHTML = `
    <div class="flashcard-face flashcard-front">
      <p>${flashcards[currentIndex].question}</p>
    </div>
    <div class="flashcard-face flashcard-back">
      <p>${flashcards[currentIndex].answer}</p>
    </div>
  `;

  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });

  container.appendChild(card);
  counter.textContent = `${currentIndex + 1} / ${flashcards.length}`;
}

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
  renderCard();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % flashcards.length;
  renderCard();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const q = qInput.value.trim();
  const a = aInput.value.trim();
  if (!q || !a) return;

  flashcards.push({ question: q, answer: a });
  saveFlashcards();

  qInput.value = "";
  aInput.value = "";

  currentIndex = flashcards.length - 1;
  renderCard();
});

loadFlashcards();
renderCard();
