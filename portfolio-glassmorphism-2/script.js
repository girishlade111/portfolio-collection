// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursorFollower.style.left = e.clientX + 'px';
  cursorFollower.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .work__card, .project__card, .skill__pill, .contact__link, .btn').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px';
    cursor.style.height = '16px';
    cursorFollower.style.width = '56px';
    cursorFollower.style.height = '56px';
    cursorFollower.style.borderColor = 'rgba(167, 139, 250, 0.3)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
    cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.15)';
  });
});

// ===== NAV SCROLL EFFECT =====
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ===== MOBILE NAV TOGGLE =====
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  links.classList.toggle('open');
});

document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    links.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.section, .hero__content');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal--visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach((el) => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.about__stat-value');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach((c) => counterObserver.observe(c));

function animateCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.floor(target / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(interval);
    } else {
      el.textContent = current;
    }
  }, 30);
}

// ===== PARALLAX ON ORBS =====
const orbs = document.querySelectorAll('.bg-orb');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ===== TILT EFFECT ON WORK CARDS =====
document.querySelectorAll('.work__card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -6;
    const rotateY = (x - centerX) / centerX * 6;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    card.style.transition = 'transform 0.6s ease';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// ===== MARQUEE DUPLICATION =====
const track = document.querySelector('.hero__marquee-track');
if (track) {
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);
}

// ===== TYPING EFFECT FOR TAGLINE =====
const tagline = document.querySelector('.hero__tagline');
if (tagline) {
  const originalText = tagline.textContent;
  tagline.textContent = '';
  let i = 0;
  const typeInterval = setInterval(() => {
    if (i < originalText.length) {
      tagline.textContent += originalText.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, 35);
}

// ===== DETECT TOUCH DEVICES =====
if ('ontouchstart' in window) {
  document.body.classList.add('touch');
}
