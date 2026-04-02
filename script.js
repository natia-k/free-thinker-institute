/**
 * Free Thinker Institute - Professional Interaction Script
 * Features: Magnet letters, smooth cursor follower, and scroll-reveal
 */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const heroTitle = document.getElementById("interactive-title");
  const revealElements = document.querySelectorAll(".reveal");
  
  // --- 1. MAGNET LETTERS LOGIC ---
  if (heroTitle) {
    // Wrap every letter in a span for individual movement
    const text = heroTitle.innerText;
    heroTitle.innerHTML = text
      .split("")
      .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const chars = document.querySelectorAll(".char");

    window.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const dist = Math.hypot(mouseX - charX, mouseY - charY);

        if (dist < 100) { // Interaction radius
          const angle = Math.atan2(mouseY - charY, mouseX - charX);
          // Calculate push strength (closer = stronger push)
          const force = (100 - dist) / 100; 
          const pushX = Math.cos(angle) * (force * -20);
          const pushY = Math.sin(angle) * (force * -20);

          char.style.transform = `translate(${pushX}px, ${pushY}px)`;
          char.style.color = "var(--accent)"; // High-end blue highlight
        } else {
          char.style.transform = `translate(0, 0)`;
          char.style.color = "";
        }
      });
    });
  }

  // --- 2. SMOOTH SCROLL HEADER ---
  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleHeaderScroll);

  // --- 3. MOBILE MENU ---
  if (menuToggle && mobileMenu) {
    const toggleMenu = () => {
      const isOpen = mobileMenu.classList.toggle("open");
      menuToggle.classList.toggle("active");
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    menuToggle.addEventListener("click", toggleMenu);
    
    // Close menu when clicking links
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // --- 4. REVEAL ON SCROLL (Intersection Observer) ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- 5. SMOOTH ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = header.offsetHeight || 80;
        const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPos,
          behavior: "smooth",
        });
      }
    });
  });
});
