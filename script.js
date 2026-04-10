document.addEventListener("DOMContentLoaded", () => {
  const laserCards = document.querySelectorAll(".laser-card, .bento-item, .editorial-card");

  laserCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
      card.style.setProperty("--laser-angle", `${angle}deg`);
    });
  });

  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      btn.style.transform = `translate(${dx * 0.12}px, ${dy * 0.12}px) scale(1.03)`;
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
      document.querySelectorAll(".expand-card").forEach((c) => c.classList.remove("open"));
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

  document.querySelectorAll("[data-photo]").forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img || window.innerWidth <= 900) return;

    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const moveX = (x - 0.5) * 14;
      const moveY = (y - 0.5) * 10;

      img.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
      img.style.filter = "grayscale(0.02) saturate(0.92) brightness(1.02) contrast(1.03)";
    });

    wrap.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1) translate(0, 0)";
      img.style.filter = "grayscale(0.06) saturate(0.84) brightness(0.94) contrast(1.02)";
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
    { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
  );

  document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));

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

  const pathfinderForm = document.getElementById("pathfinderQuiz");
  const quizResult = document.getElementById("quizResult");
  const quizCareerTitle = document.getElementById("quizCareerTitle");
  const quizCareerText = document.getElementById("quizCareerText");
  const resetPathfinder = document.getElementById("resetPathfinder");

  const pathwayContent = {
    software: {
      title: "Software Development",
      text: "You are drawn to structure, logic, and building things that work. This path often suits people who enjoy solving problems clearly, learning systems deeply, and turning ideas into functioning products."
    },
    product: {
      title: "Product Management",
      text: "You think in terms of direction, priorities, and decision-making. This path often fits people who can connect vision, users, and execution while keeping teams aligned around what matters most."
    },
    ux: {
      title: "User Experience",
      text: "You are attentive to people, behavior, and how things feel in use. This path often suits those who care about clarity, empathy, research, and designing systems that are intuitive and humane."
    },
    sales: {
      title: "Sales",
      text: "You bring energy to communication, trust-building, and helping people move toward decisions. This path often fits people who are relational, persuasive, and motivated by creating value through connection."
    },
    manualqa: {
      title: "Manual Quality Assurance",
      text: "You notice what others miss. This path often suits people who are careful, observant, and strong at reviewing details, testing behavior, and protecting quality through disciplined attention."
    },
    automatedqa: {
      title: "Automated Quality Assurance",
      text: "You care about reliability, repeatability, and building better systems. This path often fits those who like technical structure and want to improve software quality through automation and scalable testing."
    }
  };

  if (pathfinderForm && quizResult && quizCareerTitle && quizCareerText) {
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
        if (scores[value] !== undefined) scores[value] += 1;
      }

      const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
      const topKey = sorted[0][0];
      const secondKey = sorted[1][0];
      let finalKey = topKey;

      if (topKey === "manualqa" && secondKey === "automatedqa") finalKey = "automatedqa";
      if (topKey === "product" && secondKey === "sales") finalKey = "product";
      if (topKey === "sales" && secondKey === "product") finalKey = "sales";

      quizCareerTitle.textContent = pathwayContent[finalKey].title;
      quizCareerText.textContent = pathwayContent[finalKey].text;
      quizResult.hidden = false;
      quizResult.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    if (resetPathfinder) {
      resetPathfinder.addEventListener("click", () => {
        pathfinderForm.reset();
        quizResult.hidden = true;
      });
    }
  }

  const heroCard = document.getElementById("heroCard");
  if (heroCard) {
    heroCard.addEventListener("mousemove", (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = ((y / rect.height) - 0.5) * -10;

      heroCard.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      heroCard.style.setProperty("--mx", `${x}px`);
      heroCard.style.setProperty("--my", `${y}px`);
    });

    heroCard.addEventListener("mouseleave", () => {
      heroCard.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
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
      const tx = (x - 0.5) * 28;
      const ty = (y - 0.5) * 20;
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
});
