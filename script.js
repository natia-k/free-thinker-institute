/* =========================
   FINAL SITE INTERACTIONS
   ========================= */

const reveals = document.querySelectorAll(".reveal-up");

if (reveals.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((item) => revealObserver.observe(item));
}

const motionCards = document.querySelectorAll(
  ".bento-item, .editorial-card, .hero-card, .comm-card, .quiz-question, .what-card, .pathfinder-shell"
);

motionCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / rect.height) * -4;
    const rotateY = ((x - centerX) / rect.width) * 4;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);

    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--laser-angle", `${angle}deg`);
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "50%");
  });
});

document.querySelectorAll(".intention-flip").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const nav = document.querySelector("nav");
    const navHeight = nav ? nav.offsetHeight : 0;

    const y =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      navHeight -
      18;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  });
});

const heroCard = document.getElementById("heroCard");

if (heroCard) {
  heroCard.addEventListener("mousemove", (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    heroCard.style.setProperty("--mx", `${x}px`);
    heroCard.style.setProperty("--my", `${y}px`);
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.setProperty("--mx", "50%");
    heroCard.style.setProperty("--my", "50%");
  });
}

document
  .querySelectorAll(".photo-wrap img, .comm-feature-image")
  .forEach((img) => {
    img.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.03)";
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "";
    });
  });

const quizForm = document.getElementById("pathfinderQuiz");
const quizResult = document.getElementById("quizResult");
const quizTitle = document.getElementById("quizCareerTitle");
const quizText = document.getElementById("quizCareerText");
const resetBtn = document.getElementById("resetPathfinder");

if (quizForm && quizResult && quizTitle && quizText) {
  const careerMap = {
    software:
      "You are strongly aligned with Software Development — systems thinking, logic, and building meaningful tools.",
    ux:
      "You are strongly aligned with User Experience — understanding people and creating intuitive systems.",
    product:
      "You are strongly aligned with Product Management — strategic thinking, clarity, and decision-making.",
    sales:
      "You are strongly aligned with Sales — communication, trust-building, and momentum.",
    manualqa:
      "You are strongly aligned with Manual Quality Assurance — precision, detail, and careful thinking.",
    automatedqa:
      "You are strongly aligned with Automated Quality Assurance — systems reliability and scalable processes.",
  };

  const titles = {
    software: "Software Development",
    ux: "User Experience",
    product: "Product Management",
    sales: "Sales",
    manualqa: "Manual Quality Assurance",
    automatedqa: "Automated Quality Assurance",
  };

  quizForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(quizForm);
    const scores = {};

    for (const [, value] of formData.entries()) {
      scores[value] = (scores[value] || 0) + 1;
    }

    let bestMatch = "software";
    let highest = 0;

    for (const key in scores) {
      if (scores[key] > highest) {
        highest = scores[key];
        bestMatch = key;
      }
    }

    quizTitle.textContent = titles[bestMatch];
    quizText.textContent = careerMap[bestMatch];
    quizResult.hidden = false;

    quizResult.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      quizForm.reset();
      quizResult.hidden = true;
    });
  }
}

let pastelScrollTimer;

function handlePastelScrollShiver() {
  const shimmerEls = document.querySelectorAll(".pastel-shimmer");

  shimmerEls.forEach((el) => el.classList.add("is-scrolling"));

  clearTimeout(pastelScrollTimer);
  pastelScrollTimer = setTimeout(() => {
    shimmerEls.forEach((el) => el.classList.remove("is-scrolling"));
  }, 180);
}

window.addEventListener("scroll", handlePastelScrollShiver, {
  passive: true,
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (prefersReducedMotion.matches) {
  document.documentElement.style.scrollBehavior = "auto";
}
const communityEquation = document.querySelector(".community-equation");

if (communityEquation) {
  const equationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          communityEquation.classList.add("is-writing");
        }
      });
    },
    { threshold: 0.45 }
  );

  equationObserver.observe(communityEquation);
}
/* =========================
   HERO PANEL SUBTLE MOTION
   ========================= */

const heroDashboardPanel = document.getElementById("heroDashboardPanel");

if (heroDashboardPanel) {
  heroDashboardPanel.style.transition = "transform 0.28s ease";

  heroDashboardPanel.addEventListener("mousemove", (e) => {
    const rect = heroDashboardPanel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = (x / rect.width - 0.5) * 8;
    const py = (y / rect.height - 0.5) * 8;

    heroDashboardPanel.style.transform = `translate3d(${px}px, ${py}px, 0)`;
  });

  heroDashboardPanel.addEventListener("mouseleave", () => {
    heroDashboardPanel.style.transform = "translate3d(0,0,0)";
  });
}
// magnetic hover
const magneticItems = document.querySelectorAll(
  '.hero-dashboard-btn, .hero-dash-tile, .hero-card, .hero-box'
);

magneticItems.forEach((item) => {
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 18;
    const moveY = (y - rect.height / 2) / 18;

    item.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.01)`;

    item.style.boxShadow = `
  0 12px 28px rgba(0,0,0,0.18)
`;
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translate(0px, 0px) scale(1)';
    item.style.boxShadow = '';
  });
});
/* hero cinematic reveal */
document.addEventListener("DOMContentLoaded", () => {
  const heroCopy = document.querySelector(".hero-dashboard-copy");
  const heroPanel = document.querySelector(".hero-dashboard-panel");

  if (heroCopy) {
    requestAnimationFrame(() => {
      heroCopy.classList.add("is-revealed");
    });
  }

  if (heroPanel) {
    requestAnimationFrame(() => {
      heroPanel.classList.add("is-revealed");
    });
  }
});
/* satin glow tracking */
document.querySelectorAll('.hero-dash-tile').forEach((tile) => {
  tile.addEventListener('mousemove', (e) => {
    const rect = tile.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    tile.style.setProperty('--glow-x', `${x}%`);
    tile.style.setProperty('--glow-y', `${y}%`);
  });

  tile.addEventListener('mouseleave', () => {
    tile.style.setProperty('--glow-x', '22%');
    tile.style.setProperty('--glow-y', '22%');
  });
});
