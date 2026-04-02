document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("interactive-title");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  // 1. Magnet Effect (Now pushes letters away)
  if (title) {
    const text = title.innerText;
    title.innerHTML = [...text].map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    const chars = title.querySelectorAll(".char");

    window.addEventListener("mousemove", (e) => {
      chars.forEach(char => {
        const r = char.getBoundingClientRect();
        const cX = r.left + r.width / 2;
        const cY = r.top + r.height / 2;
        const dist = Math.hypot(e.clientX - cX, e.clientY - cY);

        if (dist < 100) {
          const angle = Math.atan2(e.clientY - cY, e.clientX - cX);
          const f = (100 - dist) / 100;
          char.style.transform = `translate(${Math.cos(angle) * f * -15}px, ${Math.sin(angle) * f * -15}px)`;
          char.style.color = "#1a2b6d"; // Midnight Indigo
        } else {
          char.style.transform = "translate(0,0)";
          char.style.color = "";
        }
      });
    });
  }

  // 2. Mobile Menu Logic
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  // 3. Reveal Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
