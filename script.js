/* =========================
   FINAL SITE INTERACTIONS
   clean + deadline ready
   ========================= */

/* smooth reveal animation */
const reveals = document.querySelectorAll(".reveal-up");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((item) => revealObserver.observe(item));

/* laser border mouse movement */
const laserCards = document.querySelectorAll(
  ".bento-item, .editorial-card, .hero-card"
);

laserCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const angle = Math.atan2(
      y - rect.height / 2,
      x - rect.width / 2
    );

    const deg = angle * (180 / Math.PI);

    card.style.setProperty("--laser-angle", `${deg}deg`);
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });
});

/* flip intention cards mobile click */
document.querySelectorAll(".intention-flip").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

/* apple scroll write */
const scrollWrites = document.querySelectorAll(".scroll-write");

window.addEventListener("scroll", () => {
  scrollWrites.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const progress = Math.max(
      0,
      Math.min(
        1,
        (windowHeight - rect.top) / (windowHeight * 0.8)
      )
    );

    el.style.setProperty("--fill-width", `${progress * 100}%`);
  });
});

/* subtle image hover effect */
document.querySelectorAll(".photo-wrap img").forEach((img) => {
  img.addEventListener("mouseenter", () => {
    img.style.filter =
      "saturate(0.65) brightness(0.72) contrast(1.02)";
  });

  img.addEventListener("mouseleave", () => {
    img.style.filter =
      "saturate(0.45) brightness(0.6) contrast(1)";
  });
});
