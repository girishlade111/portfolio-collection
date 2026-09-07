/* ═══════════════════════════════════════════════
   GIRISH LADE PORTFOLIO — script.js
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Scroll Reveal ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // Stagger siblings inside the same parent
            const siblings = Array.from(
              entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
            );
            const delay = siblings.indexOf(entry.target) * 80;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, Math.min(delay, 400));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));
  }

  /* ── Nav: scroll class + active link ── */
  function initNav() {
    const nav = document.querySelector('.nav');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
      // Scrolled class
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // Active link highlighting
      let current = '';
      sections.forEach((sec) => {
        const top = sec.offsetTop - 100;
        if (window.scrollY >= top) current = sec.id;
      });

      links.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger mobile menu ── */
  function initHamburger() {
    const btn = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!btn || !navLinks) return;

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      btn.classList.toggle('open', !open);
      navLinks.classList.toggle('mobile-open', !open);
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !navLinks.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      }
    });
  }

  /* ── Smooth scroll for anchor links ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ── Orb parallax on mouse move ── */
  function initParallax() {
    const orbs = document.querySelectorAll('.orb');
    let raf;

    document.addEventListener('mousemove', (e) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = (e.clientX - cx) / cx;
        const dy = (e.clientY - cy) / cy;

        orbs.forEach((orb, i) => {
          const strength = (i + 1) * 12;
          orb.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
        });
      });
    });
  }

  /* ── Project card hover glow follow ── */
  function initCardGlow() {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', x + '%');
        card.style.setProperty('--my', y + '%');
      });
    });
  }

  /* ── Counter animation for hero stats ── */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-num');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const raw = el.textContent.trim();
          // Only animate numeric values
          const num = parseInt(raw, 10);
          if (isNaN(num) || raw === '∞') return;

          let start = 0;
          const duration = 1200;
          const startTime = performance.now();

          function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * num);
            if (progress < 1) requestAnimationFrame(step);
          }

          requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => io.observe(c));
  }

  /* ── Typing effect for code block role line ── */
  function initTypingEffect() {
    const roleEl = document.querySelector('.token-str');
    if (!roleEl) return;
    // subtle shimmer — just add class after load
    setTimeout(() => roleEl.classList.add('typed'), 1200);
  }

  /* ── Reduce motion preference ── */
  function respectReduceMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('visible');
      });
      document.querySelectorAll('.orb').forEach((orb) => {
        orb.style.animation = 'none';
      });
    }
  }

  /* ── Init ── */
  function init() {
    respectReduceMotion();
    initReveal();
    initNav();
    initHamburger();
    initSmoothScroll();
    initParallax();
    initCardGlow();
    initCounters();
    initTypingEffect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
