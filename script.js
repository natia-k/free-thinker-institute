document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const title = document.getElementById("interactive-title");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const revealElements = document.querySelectorAll(".reveal");

  // 1. Interactive Letters (Magnet Effect)
  if (title) {
    const originalText = title.innerText;
    title.innerHTML = "";
    [...originalText].forEach((char) => {
      const span = document.createElement("span");
      span.className = "char";
      span.innerHTML = char === " " ? "&nbsp;" : char;
      title.appendChild(span);
    });

    const chars = title.querySelectorAll(".char");
    window.addEventListener("mousemove", (e) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - charX, e.clientY - charY);

        if (dist < 100) {
          const angle = Math.atan2(e.clientY - charY, e.clientX - charX);
          const force = (100 - dist) / 100;
          char.style.transform = `translate(${Math.cos(angle) * force * -15}px, ${Math.sin(angle) * force * -15}px)`;
          char.style.color = "var(--accent)";
        } else {
          char.style.transform = "translate(0,0)";
          char.style.color = "";
        }
      });
    });
  }

  // 2. Scroll Logic
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // 3. Mobile Menu Toggle
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
    });
  }

  // 4. Reveal on Scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));
});
