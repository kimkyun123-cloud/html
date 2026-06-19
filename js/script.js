document.addEventListener('DOMContentLoaded', () => {
  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // BGM Toggle
  const bgmBtn = document.querySelector('.bgm-btn');
  if(bgmBtn) {
    let audioPath = '../bgm.mp3';
    // adjust path for index.html at root
    if(window.location.pathname.endsWith('index.html') && !window.location.pathname.includes('corporate') && !window.location.pathname.includes('portfolio')) {
      audioPath = './bgm.mp3';
    }
    
    let audio = new Audio(audioPath);
    audio.loop = true;
    let isPlaying = false;

    bgmBtn.addEventListener('click', () => {
      if(isPlaying) {
        audio.pause();
        bgmBtn.textContent = 'BGM On';
      } else {
        audio.play().catch(e => console.log('Audio play failed:', e));
        bgmBtn.textContent = 'BGM Off';
      }
      isPlaying = !isPlaying;
    });
  }

  // Accordion Logic
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
});
