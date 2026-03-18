/* ============================================
   GUILHERME FREIRE — PORTFOLIO
   script.js — Interactions & Animations
   ============================================ */

// ====== CUSTOM CURSOR ======
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';

  // Trail follows with slight delay (handled by CSS transition)
  cursorTrail.style.left = mouseX + 'px';
  cursorTrail.style.top = mouseY + 'px';
});

// Cursor grow on hover links/buttons
const interactives = document.querySelectorAll('a, button, .tag, .project-card, .cert-card, .soft-item');

interactives.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    cursorTrail.style.width = '48px';
    cursorTrail.style.height = '48px';
    cursorTrail.style.borderColor = 'var(--orange-2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursorTrail.style.width = '32px';
    cursorTrail.style.height = '32px';
    cursorTrail.style.borderColor = 'var(--orange)';
  });
});

// ====== NAVBAR SCROLL EFFECT ======
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ====== SCROLL REVEAL ANIMATION ======
const revealElements = document.querySelectorAll(
  '.skill-group, .soft-item, .timeline-block, .cert-card, .project-card, .contact-item'
);

revealElements.forEach(el => {
  el.classList.add('reveal');
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ====== ACTIVE NAV LINK ON SCROLL ======
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--orange)';
        }
      });
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(section => sectionObserver.observe(section));

// ====== SMOOTH SCROLL FOR NAV LINKS ======
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ====== TYPING EFFECT FOR HERO CODE BLOCK ======
const codeBlock = document.querySelector('.deco-code');
if (codeBlock) {
  codeBlock.style.opacity = '0';
  codeBlock.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    codeBlock.style.opacity = '1';
  }, 1200);
}

// ====== STAT COUNTER ANIMATION ======
function animateCounter(el, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current + '+';
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const val = parseInt(num.textContent);
        if (!isNaN(val)) animateCounter(num, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.8 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ====== PAGE LOAD FADE IN ======
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.4s ease';

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});