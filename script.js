document.addEventListener("DOMContentLoaded", () => {
  // Intersection Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Header Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // BGM
  const bgmBtn = document.getElementById('bgm-btn');
  let audio = null;
  if (bgmBtn) {
    bgmBtn.addEventListener('click', () => {
      if (!audio) {
        const src = bgmBtn.getAttribute('data-audio');
        if (src) {
          audio = new Audio(src);
          audio.loop = true;
        }
      }
      if (audio) {
        if (audio.paused) {
          audio.play().catch(console.error);
          bgmBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> BGM: ON';
        } else {
          audio.pause();
          bgmBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i> BGM: OFF';
        }
      }
    });
  }

  // Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  if (lightbox && galleryItems.length > 0) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightbox.style.display = 'flex';
        }
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.style.display = 'none';
    });
  }

  // Slider
  const track = document.getElementById('card-slider');
  if (track) {
    const slides = Array.from(track.children);
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const indicator = document.querySelector('.slider-indicator');
    let currentIndex = 0;

    function updateSlider(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      if (indicator) indicator.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));

    // Touch events
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;

    track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      track.style.transition = 'none';
    });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      currentTranslate = -(currentIndex * 100) + (diff / track.offsetWidth * 100);
      track.style.transform = `translateX(${currentTranslate}%)`;
    });

    track.addEventListener('touchend', (e) => {
      isDragging = false;
      track.style.transition = 'transform 0.4s ease-out';
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      
      if (diff < -50) updateSlider(currentIndex + 1);
      else if (diff > 50) updateSlider(currentIndex - 1);
      else updateSlider(currentIndex);
    });
  }

  // Smooth scroll
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});
