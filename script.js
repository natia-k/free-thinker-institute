document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const title = document.getElementById("interactive-title");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  // 1. Magnet Letter Setup
  if (title) {
    const text = title.innerText;
    title.innerHTML = [...text].map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
    const chars = title.querySelectorAll(".char");

    window.addEventListener("mousemove", (e) => {
      const mX = e.clientX;
      const mY = e.clientY;

      chars.forEach(char => {
        const r = char.getBoundingClientRect();
        const cX = r.left + r.width / 2;
        const cY = r.top + r.height / 2;
        const dist = Math.hypot(mX - cX, mY - cY);

        if (dist < 120) {
          const angle = Math.atan2(mY - cY, mX - cX);
          const force = (120 - dist) / 120;
          const pushX = Math.cos(angle) * force * -20;
          const pushY = Math.sin(angle) * force * -20;
          
          char.style.transform = `translate(${pushX}px, ${pushY}px)`;
          char.style.color = "#1a2b6d"; // Midnight Indigo
        } else {
          char.style.transform = "translate(0, 0)";
          char.style.color = "";
        }
      });
    });
  }

  // 2. Scroll Header Logic
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Intersection Observer for Reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // 4. Mobile Menu Toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });
  }
});
