/* =========================
   FINAL SITE INTERACTIONS
   clean + polished
   ========================= */

/* reveal on scroll */
const reveals = document.querySelectorAll(".reveal-up");

if (reveals.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.14,
    }
  );

  reveals.forEach((item) => revealObserver.observe(item));
}

/* laser / cursor motion for premium cards */
const motionCards = document.querySelectorAll(
  ".bento-item, .editorial-card, .hero-card, .comm-card, .quiz-question, .what-card"
);

motionCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / rect.height) * -6;
    const rotateY = ((x - centerX) / rect.width) * 6;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--laser-angle", `${angle}deg`);
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* intention cards mobile / click flip */
document.querySelectorAll(".intention-flip").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

/* apple-style scroll write */
const scrollWrites = document.querySelectorAll(".scroll-write");

function updateScrollWrite() {
  scrollWrites.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const progress = Math.max(
      0,
      Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.8))
    );

    el.style.setProperty("--fill-width", `${progress * 100}%`);
  });
}

window.addEventListener("scroll", updateScrollWrite, { passive: true });
window.addEventListener("load", updateScrollWrite);

/* subtle image hover polish */
document.querySelectorAll(".photo-wrap img, .comm-feature-image, .about-img").forEach((img) => {
  img.addEventListener("mouseenter", () => {
    img.style.transform = "scale(1.02)";
  });

  img.addEventListener("mouseleave", () => {
    img.style.transform = "";
  });
});

/* smooth anchor offset for sticky nav */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const nav = document.querySelector("nav");
    const navHeight = nav ? nav.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 18;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  });
});

/* hero card glow follows cursor */
const heroCard = document.getElementById("heroCard");

if (heroCard) {
  heroCard.addEventListener("mousemove", (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    heroCard.style.setProperty("--mx", `${x}px`);
    heroCard.style.setProperty("--my", `${y}px`);
  });
}

/* accessibility: reduce motion support */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReducedMotion.matches) {
  document.querySelectorAll("*").forEach((el) => {
    el.style.scrollBehavior = "auto";
  });
}
