const header = document.getElementById("siteHeader");
const glow = document.getElementById("cursorGlow");
const revealItems = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

window.addEventListener("mousemove", (e) => {
  if (!glow) return;
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

window.addEventListener("mouseleave", () => {
  if (!glow) return;
  glow.style.opacity = ".35";
});

window.addEventListener("mouseenter", () => {
  if (!glow) return;
  glow.style.opacity = ".75";
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

revealItems.forEach((item) => observer.observe(item));
