const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const nav = document.querySelector("nav");
const introLoader = document.getElementById("intro-loader");

window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.style.padding = window.scrollY > 60
    ? (window.innerWidth > 1024 ? "14px 48px" : "12px 18px")
    : (window.innerWidth > 1024 ? "18px 48px" : "14px 18px");
});

window.addEventListener("load", () => {
  setTimeout(() => {
    if (introLoader) introLoader.classList.add("hide");
  }, 1900);
});
