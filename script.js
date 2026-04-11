/* =========================
   PREMIUM UI LOGIC
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  const glassBlocks = document.querySelectorAll(
    ".premium-glass, .hero-card, .bento-item, .quiz-container"
  );

  /* cursor-follow glass edge light */
  glassBlocks.forEach((block) => {
    block.addEventListener("mousemove", (e) => {
      const rect = block.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      block.style.setProperty("--mx", `${x}px`);
      block.style.setProperty("--my", `${y}px`);
    });

    block.addEventListener("mouseleave", () => {
      block.style.setProperty("--mx", "50%");
      block.style.setProperty("--my", "50%");
    });
  });

  /* reveal on scroll */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal-up").forEach((el) => {
    revealObserver.observe(el);
  });

  /* quiz logic */
  const quiz = document.getElementById("careerQuiz");
  const result = document.getElementById("quizResult");
  const resultTitle = document.getElementById("resultTitle");
  const resultText = document.getElementById("resultText");

  if (quiz && result && resultTitle && resultText) {
    quiz.addEventListener("submit", (e) => {
      e.preventDefault();

      const selected = quiz.querySelector(
        'input[name="q1"]:checked'
      );

      if (!selected) return;

      const value = selected.value;

      if (value === "tech") {
        resultTitle.textContent = "Software / AI Engineering";
        resultText.textContent =
          "You are naturally drawn toward systems thinking, structured logic, and building intelligent digital tools.";
      } else {
        resultTitle.textContent = "Creative Direction / Visual Systems";
        resultText.textContent =
          "You are aligned with concept building, visual storytelling, and creative systems thinking.";
      }

      result.hidden = false;

      result.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }
});
