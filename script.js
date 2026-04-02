const cycleWords = document.querySelectorAll(".cycle-word");
let cycleIndex = 0;

if (cycleWords.length > 1) {
  setInterval(() => {
    const current = cycleWords[cycleIndex];
    const nextIndex = (cycleIndex + 1) % cycleWords.length;
    const next = cycleWords[nextIndex];

    current.classList.remove("active");
    current.classList.add("exit");

    next.classList.add("active");

    setTimeout(() => {
      current.classList.remove("exit");
    }, 650);

    cycleIndex = nextIndex;
  }, 2600);
}

const beliefWords = [
  "Truth Seeking.",
  "Open Minds.",
  "Radical Kindness.",
  "Practical Reason.",
  "Real Community."
];

const beliefEl = document.getElementById("beliefWord");
let beliefIndex = 0;

if (beliefEl) {
  setInterval(() => {
    beliefEl.style.transition =
      "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease";
    beliefEl.style.opacity = "0";
    beliefEl.style.transform = "translateY(14px)";

    setTimeout(() => {
      beliefIndex = (beliefIndex + 1) % beliefWords.length;
      beliefEl.textContent = beliefWords[beliefIndex];
      beliefEl.style.transition = "none";
      beliefEl.style.transform = "translateY(-14px)";
      beliefEl.style.opacity = "0";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          beliefEl.style.transition =
            "transform 0.42s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.42s ease";
          beliefEl.style.transform = "translateY(0)";
          beliefEl.style.opacity = "1";
        });
      });
    }, 240);
  }, 2800);
}

const photoCursor = document.getElementById("photoCursor");
const photoWraps = document.querySelectorAll("[data-photo]");

photoWraps.forEach((wrap) => {
  const img = wrap.querySelector("img");

  wrap.addEventListener("mouseenter", () => {
    if (photoCursor) photoCursor.style.opacity = "1";
  });

  wrap.addEventListener("mouseleave", () => {
    if (photoCursor) photoCursor.style.opacity = "0";
    if (img) img.style.filter = "saturate(.45) brightness(.65)";
  });

  wrap.addEventListener("mousemove", (e) => {
    if (photoCursor) {
      photoCursor.style.left = `${e.clientX}px`;
      photoCursor.style.top = `${e.clientY}px`;
    }

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
