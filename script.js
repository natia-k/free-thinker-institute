/* ── HERO WORD CYCLE ── */
const heroWords = ["Love.", "Freedom.", "Growth.", "Courage.", "Wisdom."];
let hIdx = 0;
const heroEl = document.getElementById("hero-cycle");

if (heroEl) {
  setInterval(() => {
    heroEl.style.opacity = "0";
    heroEl.style.transform = "translateY(-100%)";

    setTimeout(() => {
      hIdx = (hIdx + 1) % heroWords.length;
      heroEl.textContent = heroWords[hIdx];
      heroEl.style.transition = "none";
      heroEl.style.transform = "translateY(100%)";
      heroEl.style.opacity = "0";

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          heroEl.style.transition =
            "transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.45s";
          heroEl.style.transform = "translateY(0)";
          heroEl.style.opacity = "1";
        })
      );
    }, 350);
  }, 2400);
}

/* ── STATEMENT CYCLE ── */
const stWords = [
  "Practical Reason.",
  "Open Minds.",
  "Truth Seeking.",
  "Radical Kindness.",
  "Critical Thought.",
  "Real Community."
];

let sIdx = 0;
const stEl = document.getElementById("st-word");

if (stEl) {
  setInterval(() => {
    stEl.style.opacity = "0";
    stEl.style.transform = "translateY(-14px)";

    setTimeout(() => {
      sIdx = (sIdx + 1) % stWords.length;
      stEl.textContent = stWords[sIdx];
      stEl.style.transition = "none";
      stEl.style.transform = "translateY(14px)";
      stEl.style.opacity = "0";

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          stEl.style.transition =
            "transform 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.45s";
          stEl.style.transform = "translateY(0)";
          stEl.style.opacity = "1";
        })
      );
    }, 320);
  }, 2700);
}

/* ── SCROLL REVEAL ── */
const srEls = document.querySelectorAll(".sr");

if (srEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.07 }
  );

  srEls.forEach((el) => io.observe(el));
}
