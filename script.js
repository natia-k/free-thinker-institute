const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.querySelectorAll(".reveal").forEach((el, i) => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    setTimeout(() => el.classList.add("visible"), i * 100);
  }
});

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  nav.style.padding = window.scrollY > 60
    ? (window.innerWidth > 1024 ? "18px 80px" : "14px 28px")
    : (window.innerWidth > 1024 ? "28px 80px" : "20px 28px");
});

function scrollToHashWithOffset() {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (!target) return;

  const navHeight = nav ? nav.offsetHeight : 100;
  const extraOffset = window.innerWidth > 1024 ? 30 : 20;
  const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - extraOffset;

  window.scrollTo({
    top,
    behavior: "auto"
  });
}

window.addEventListener("load", () => {
  setTimeout(scrollToHashWithOffset, 50);
});

window.addEventListener("hashchange", () => {
  setTimeout(scrollToHashWithOffset, 0);
});
