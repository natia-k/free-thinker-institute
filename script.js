document.addEventListener("DOMContentLoaded", () => {
  const laserCards = document.querySelectorAll(".laser-card, .bento-item, .editorial-card");

  laserCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle =
        Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;

      card.style.setProperty("--laser-angle", `${angle}deg`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.removeProperty("--laser-angle");
    });
  });

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      btn.style.transform = `translate(${dx * 0.08}px, ${
        dy * 0.08
      }px) scale(1.02)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  document.querySelectorAll(".intention-flip").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        card.classList.toggle("active");
      }
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("active");
      }
    });
  });

  document.querySelectorAll(".expand-card").forEach((card) => {
    const toggle = () => {
      const wasOpen = card.classList.contains("open");

      document
        .querySelectorAll(".expand-card")
        .forEach((c) => c.classList.remove("open"));

      if (!wasOpen) card.classList.add("open");
    };

    card.addEventListener("click", toggle);

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  document
    .querySelectorAll(".reveal-up")
    .forEach((el) => observer.observe(el));

  const form = document.querySelector(".newsletter-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");

      if (input && input.value.trim()) {
        input.value = "";
        input.placeholder = "Thanks for signing up";
      }
    });
  }

  const heroCard = document.getElementById("heroCard");

  if (heroCard) {
    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;

      heroCard.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-4px)
      `;

      heroCard.style.setProperty("--mx", `${x}px`);
      heroCard.style.setProperty("--my", `${y}px`);
    });

    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg)";
      heroCard.style.setProperty("--mx", "50%");
      heroCard.style.setProperty("--my", "50%");
    });
  }

  const hero = document.querySelector(".hero");
  const heroGlow = document.querySelector(".hero-title-glow");

  if (hero && heroGlow && window.innerWidth > 900) {
    hero.addEventListener("mousemove", (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tx = (x - 0.5) * 22;
      const ty = (y - 0.5) * 18;

      heroGlow.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });

    hero.addEventListener("mouseleave", () => {
      heroGlow.style.transform = "translate3d(0, 0, 0)";
    });
  }

  const scrollWriteEls = document.querySelectorAll(".scroll-write");

  const updateScrollWrite = () => {
    scrollWriteEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      let progress = (windowH - rect.top) / (windowH * 0.9);
      progress = Math.max(0, Math.min(1, progress));

      el.style.setProperty("--fill-width", `${progress * 100}%`);
    });
  };

  updateScrollWrite();
  window.addEventListener("scroll", updateScrollWrite, { passive: true });
  window.addEventListener("resize", updateScrollWrite);

  const pathfinderForm = document.getElementById("pathfinderQuiz");
  const quizResult = document.getElementById("quizResult");
  const quizCareerTitle = document.getElementById("quizCareerTitle");
  const quizCareerText = document.getElementById("quizCareerText");
  const resetPathfinder = document.getElementById("resetPathfinder");

  const pathwayContent = {
    software: {
      title: "Software Development",
      text: "You are drawn to structure, logic, and building systems that work beautifully."
    },
    product: {
      title: "Product Management",
      text: "You naturally connect vision, people, and strategic execution."
    },
    ux: {
      title: "User Experience",
      text: "You think deeply about human behavior and intuitive systems."
    },
    sales: {
      title: "Sales",
      text: "You thrive in communication, trust-building, and value creation."
    },
    manualqa: {
      title: "Manual Quality Assurance",
      text: "You notice details others miss and care about precision."
    },
    automatedqa: {
      title: "Automated Quality Assurance",
      text: "You enjoy building scalable systems that protect quality."
    }
  };

  if (
    pathfinderForm &&
    quizResult &&
    quizCareerTitle &&
    quizCareerText
  ) {
    pathfinderForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(pathfinderForm);

      const scores = {
        software: 0,
        product: 0,
        ux: 0,
        sales: 0,
        manualqa: 0,
        automatedqa: 0
      };

      for (const value of formData.values()) {
        if (scores[value] !== undefined) scores[value]++;
      }

      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const topKey = sorted[0][0];

      quizCareerTitle.textContent = pathwayContent[topKey].title;
      quizCareerText.textContent = pathwayContent[topKey].text;
      quizResult.hidden = false;

      quizResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    if (resetPathfinder) {
      resetPathfinder.addEventListener("click", () => {
        pathfinderForm.reset();
        quizResult.hidden = true;
      });
    }
  }
});
