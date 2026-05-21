/* ========================================
   Crystal Clear & Blue Innovation - Scripts
   BATECH (주)비에이텍
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Water Droplet Generator ----
  function createDroplets(container, count = 15) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      drop.classList.add('droplet');
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (4 + Math.random() * 6) + 's';
      drop.style.animationDelay = Math.random() * 8 + 's';
      drop.style.width = (5 + Math.random() * 6) + 'px';
      drop.style.height = (7 + Math.random() * 8) + 'px';
      container.appendChild(drop);
    }
  }
  const waveBg = document.querySelector('.wave-bg');
  createDroplets(waveBg, 20);

  // ---- Header Scroll Effect ----
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- Mobile Nav Toggle ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ---- BGM Control ----
  const bgmBtn = document.querySelector('.bgm-btn');
  const bgmAudio = document.getElementById('bgm-audio');
  if (bgmBtn && bgmAudio) {
    let isPlaying = false;
    bgmAudio.volume = 0.3;
    bgmBtn.addEventListener('click', () => {
      if (isPlaying) {
        bgmAudio.pause();
        bgmBtn.innerHTML = '<i class="fa-solid fa-music"></i> BGM OFF';
      } else {
        bgmAudio.play().catch(() => {});
        bgmBtn.innerHTML = '<i class="fa-solid fa-music"></i> BGM ON';
      }
      isPlaying = !isPlaying;
    });
  }

  // ---- Scroll Reveal Animation ----
  const revealEls = document.querySelectorAll('.section, .glass, .product-card, .cert-badge, .timeline-item');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
  });

  // ---- Accordion (Portfolio) ----
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const body = item.querySelector('.accordion-body');
      const isActive = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-item').forEach(ai => {
        ai.classList.remove('active');
        ai.querySelector('.accordion-body').style.maxHeight = null;
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // ---- Swiper Init (Card News) ----
  if (typeof Swiper !== 'undefined' && document.querySelector('.cardnews-swiper')) {
    new Swiper('.cardnews-swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.cardnews-swiper .swiper-pagination', clickable: true },
      navigation: { nextEl: '.cardnews-swiper .swiper-button-next', prevEl: '.cardnews-swiper .swiper-button-prev' },
      breakpoints: {
        640: { slidesPerView: 1 },
        968: { slidesPerView: 2 }
      }
    });
  }

  // ---- Swiper Init (General) ----
  if (typeof Swiper !== 'undefined' && document.querySelector('.swiper:not(.cardnews-swiper)')) {
    document.querySelectorAll('.swiper:not(.cardnews-swiper)').forEach(el => {
      new Swiper(el, {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
        navigation: { nextEl: el.querySelector('.swiper-button-next'), prevEl: el.querySelector('.swiper-button-prev') },
        breakpoints: {
          640: { slidesPerView: 2 },
          968: { slidesPerView: 3 }
        }
      });
    });
  }

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks) navLinks.classList.remove('active');
      }
    });
  });

});
