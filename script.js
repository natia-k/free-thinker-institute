const words = [
  "Connection.",
  "Freedom.",
  "Growth.",
  "Wisdom.",
  "Love.",
  "Truth."
];

const changingText = document.querySelector(".accent-blue");

let currentWord = 0;

if (changingText) {
  setInterval(() => {
    changingText.style.opacity = "0";
    changingText.style.transform = "translateY(18px)";

    setTimeout(() => {
      currentWord = (currentWord + 1) % words.length;
      changingText.textContent = words[currentWord];

      changingText.style.transition = "none";
      changingText.style.transform = "translateY(-18px)";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          changingText.style.transition =
            "all 0.45s cubic-bezier(0.16,1,0.3,1)";
          changingText.style.opacity = "1";
          changingText.style.transform = "translateY(0)";
        });
      });
    }, 240);
  }, 2800);
}
