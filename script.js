document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. HERO WORD CYCLER ---
  const cycleWords = document.querySelectorAll(".cycle-word");
  let cycleIndex = 0;
  if (cycleWords.length > 1) {
    setInterval(() => {
      const current = cycleWords[cycleIndex];
      cycleIndex = (cycleIndex + 1) % cycleWords.length;
      const next = cycleWords[cycleIndex];
      current.classList.remove("active");
      next.classList.add("active");
    }, 2400);
  }

  // --- 2. INTENTION WHEEL LOGIC (FIXED) ---
  const rim = document.getElementById('wheelRim');
  const nodes = document.querySelectorAll('.wheel-node');
  const contents = document.querySelectorAll('.wheel-center-content');

  if (rim && nodes.length) {
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const index = node.getAttribute('data-index');
        const rotation = (index - 1) * (-60); // 60 degrees per item
        
        // Rotate the main rim
        rim.style.transform = `rotate(${rotation}deg)`;
        
        // Update nodes and center text
        nodes.forEach(n => {
          const i = n.getAttribute('style').match(/--i:(\d+)/)[1];
          // This keeps the icons upright (counter-rotation) and uses the 310px radius
          n.style.transform = `rotate(calc(${i} * 60deg)) translate(310px) rotate(calc(${i} * -60deg + ${-rotation}deg))`;
          n.classList.remove('active');
        });
        
        node.classList.add('active');
        contents.forEach(c => c.classList.remove('active'));
        
        const targetContent = document.getElementById(`content-${index}`);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  }

  // --- 3. PHOTO CURSOR & IMAGE EFFECTS ---
  const photoCursor = document.getElementById("photoCursor");
  const photoWraps = document.querySelectorAll("[data-photo]");

  if (photoCursor && photoWraps.length) {
    photoWraps.forEach((wrap) => {
      const img = wrap.querySelector("img");

      wrap.addEventListener("mouseenter", () => { photoCursor.style.opacity = "1"; });
      wrap.addEventListener("mouseleave", () => { 
        photoCursor.style.opacity = "0";
        if (img) img.style.filter = "saturate(.45) brightness(.65)";
      });

      wrap.addEventListener("mousemove", (e) => {
        photoCursor.style.left = `${e.clientX}px`;
        photoCursor.style.top = `${e.clientY}px`;

        if (img) {
          const rect = wrap.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const dx = Math.abs(x - (rect.width / 2)) / (rect.width / 2);
          const dy = Math.abs(y - (rect.height / 2)) / (rect.height / 2);
          const distance = Math.min(1, Math.sqrt(dx * dx + dy * dy));
          img.style.filter = `saturate(${0.45 + (1 - distance) * 0.35}) brightness(${0.65 + (1 - distance) * 0.35})`;
        }
      });
    });
  }

  // --- 4. REVEAL ON SCROLL ---
  const revealItems = document.querySelectorAll(".reveal-up");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));

  // --- 5. NEWSLETTER ---
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
});
