const header = document.querySelector(".site-header");
const glow = document.getElementById("cursorGlow");
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  if (!header) return;
  if (window.scrollY > 12) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

if (glow) {
  window.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    glow.style.opacity = ".8";
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.14
});

reveals.forEach((item) => observer.observe(item));
