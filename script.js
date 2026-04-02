const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const cursorGlow = document.getElementById("cursorGlow");
const revealElements = document.querySelectorAll(".reveal");
const orbs = document.querySelectorAll(".bg-orb");
const magneticElements = document.querySelectorAll(".magnetic");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu a");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;
let ticking = false;

/* header scroll */
function handleHeaderScroll() {
  if (window.scrollY > 16) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

/* mobile menu */
function closeMenu() {
  mobileMenu.classList.remove("open");
  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function openMenu() {
  mobileMenu.classList.add("open");
  menuToggle.classList.add("active");
  menuToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* reveal on scroll */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* cursor glow */
function animateGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;

  if (cursorGlow) {
    cursorGlow.style.transform = `translate(${glowX}px, ${glowY}px)`;
  }

  requestAnimationFrame(animateGlow);
}

window.addEventListener("mousemove", (event) => {
  document.body.classList.add("has-mouse");
  mouseX = event.clientX;
  mouseY = event.clientY;
});

window.addEventListener("mouseleave", () => {
  document.body.classList.remove("has-mouse");
});

animateGlow();

/* parallax orbs */
function updateParallax() {
  const scrollY = window.scrollY;

  orbs.forEach((orb) => {
    const speed = parseFloat(orb.dataset.speed || "0.1");
    const offset = scrollY * speed;
    orb.style.transform = `translate3d(0, ${offset}px, 0)`;
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  handleHeaderScroll();

  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

/* magnetic buttons */
magneticElements.forEach((element) => {
  element.addEventListener("mousemove", (event) => {
    const rect = element.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;

    element.style.transform = `translate(${relX * 0.08}px, ${relY * 0.08}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "translate(0, 0)";
  });
});

/* smooth anchor close for mobile */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();

    const headerOffset = header ? header.offsetHeight : 84;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* initial */
handleHeaderScroll();
updateParallax();
