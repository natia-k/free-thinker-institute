const cycleWords = document.querySelectorAll(".cycle-word");
let cycleIndex = 0;
let cycleInterval = null;

function startCycle() {
  if (cycleWords.length <= 1) return;

  if (cycleInterval) {
    clearInterval(cycleInterval);
  }

  cycleInterval = setInterval(() => {
    const current = cycleWords[cycleIndex];
    const nextIndex = (cycleIndex + 1) % cycleWords.length;
    const next = cycleWords[nextIndex];

    if (!current || !next) return;

    current.classList.remove("active");
    current.classList.add("exit");

    next.classList.add("active");

    setTimeout(() => {
      current.classList.remove("exit");
    }, 650);

    cycleIndex = nextIndex;
  }, 2400);
}

startCycle();

const photoCursor = document.getElementById("photoCursor");
const photoWraps = document.querySelectorAll("[data-photo]");

if (photoCursor && photoWraps.length) {
  photoWraps.forEach((wrap) => {
    const img = wrap.querySelector("img");

    wrap.addEventListener("mouseenter", () => {
      photoCursor.style.opacity = "1";
    });

    wrap.addEventListener("mouseleave", () => {
      photoCursor.style.opacity = "0";

      if (img) {
        img.style.filter = "saturate(.45) brightness(.65)";
      }
    });

    wrap.addEventListener("mousemove", (e) => {
      photoCursor.style.left = `${e.clientX}px`;
      photoCursor.style.top = `${e.clientY}px`;

      if (!img) return;

      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const dx = Math.abs(x - centerX) / centerX;
      const dy = Math.abs(y - centerY) / centerY;
      const distance = Math.min(1, Math.sqrt(dx * dx + dy * dy));

      const brightness = 0.65 + (1 - distance) * 0.35;
      const saturation = 0.45 + (1 - distance) * 0.35;

      img.style.filter = `saturate(${saturation}) brightness(${brightness})`;
    });
  });
}

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = newsletterForm.querySelector("input");

    if (input && input.value.trim()) {
      input.value = "";
      input.placeholder = "Thanks for signing up";
    }
  });
}
