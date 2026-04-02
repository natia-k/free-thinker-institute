const heroWords = ["Love.", "Freedom.", "Growth.", "Courage.", "Wisdom."];
let hIdx = 0;
const heroEl = document.getElementById("hero-cycle");

if (heroEl) {
  setInterval(() => {
    heroEl.style.transition =
      "transform 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.38s ease";
    heroEl.style.opacity = "0";
    heroEl.style.transform = "translateY(18px)";

    setTimeout(() => {
      hIdx = (hIdx + 1) % heroWords.length;
      heroEl.textContent = heroWords[hIdx];
      heroEl.style.transition = "none";
      heroEl.style.transform = "translateY(-18px)";
      heroEl.style.opacity = "0";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          heroEl.style.transition =
            "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease";
          heroEl.style.transform = "translateY(0)";
          heroEl.style.opacity = "1";
        });
      });
    }, 260);
  }, 3000);
}

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
    stEl.style.transition =
      "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease";
    stEl.style.opacity = "0";
    stEl.style.transform = "translateY(14px)";

    setTimeout(() => {
      sIdx = (sIdx + 1) % stWords.length;
      stEl.textContent = stWords[sIdx];
      stEl.style.transition = "none";
      stEl.style.transform = "translateY(-14px)";
      stEl.style.opacity = "0";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          stEl.style.transition =
            "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease";
          stEl.style.transform = "translateY(0)";
          stEl.style.opacity = "1";
        });
      });
    }, 240);
  }, 2800);
}

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
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  srEls.forEach((el) => io.observe(el));
}

const revealEls = document.querySelectorAll(".reveal-up");

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}
