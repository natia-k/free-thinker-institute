document.addEventListener("DOMContentLoaded", () => {
  const cycleWords = document.querySelectorAll(".cycle-word");
  let cycleIndex = 0;
  let cycleInterval = null;

  function startCycle() {
    if (cycleWords.length <= 1) return;

    if (cycleInterval) {
      clearInterval(cycleInterval);
    }

    cycleInterval = setInterval(() => {
      const current = cycleWords[cycleIndex];
      const nextIndex = (cycleIndex + 1) % cycleWords.length;
      const next = cycleWords[nextIndex];

      if (!current || !next) return;

      current.classList.remove("active");
      next.classList.add("active");

      cycleIndex = nextIndex;
    }, 2400);
  }

  startCycle();

  const photoCursor = document.getElementById("photoCursor");
  const photoWraps = document.querySelectorAll("[data-photo]");

  if (photoCursor && photoWraps.length) {
    photoWraps.forEach((wrap) => {
      const img = wrap.querySelector("img");

      wrap.addEventListener("mouseenter", () => {
        photoCursor.style.opacity = "1";
      });

      wrap.addEventListener("mouseleave", () => {
        photoCursor.style.opacity = "0";

        if (img) {
          img.style.filter = "saturate(.45) brightness(.65)";
          // --- WHEEL LOGIC ---
  const rim = document.getElementById('wheelRim');
  const nodes = document.querySelectorAll('.wheel-node');
  const contents = document.querySelectorAll('.wheel-center-content');

  if(rim && nodes.length) {
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const index = node.getAttribute('data-index');
        const rotation = (index - 1) * (-60);
        
        rim.style.transform = `rotate(${rotation}deg)`;
        
        nodes.forEach(n => {
          const i = n.getAttribute('style').match(/--i:(\d+)/)[1];
          n.style.transform = `rotate(calc(${i} * 60deg)) translate(270px) rotate(calc(${i} * -60deg + ${-rotation}deg))`;
          n.classList.remove('active');
        });
        
        node.classList.add('active');
        contents.forEach(c => c.classList.remove('active'));
        document.getElementById(`content-${index}`).classList.add('active');
      });
    });
  }
        }
      });

      wrap.addEventListener("mousemove", (e) => {
        photoCursor.style.left = `${e.clientX}px`;
        photoCursor.style.top = `${e.clientY}px`;

        if (!img) return;

        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const dx = Math.abs(x - centerX) / centerX;
        const dy = Math.abs(y - centerY) / centerY;
        const distance = Math.min(1, Math.sqrt(dx * dx + dy * dy));

        const brightness = 0.65 + (1 - distance) * 0.35;
        const saturation = 0.45 + (1 - distance) * 0.35;

        img.style.filter = `saturate(${saturation}) brightness(${brightness})`;
      });
    });
  }

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

  const revealItems = document.querySelectorAll(".reveal-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));

  const flipCards = document.querySelectorAll(".intention-flip");

  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });

    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("active");
      }
    });
  });
});
