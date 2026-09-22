// index.js — Vitrine publique page behavior

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('apply-form');
  const success = document.getElementById('apply-success');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
      nom: form.nom.value,
      courriel: form.courriel.value,
      stade: form.stade.value,
      description: form.description.value,
    };

    saveApplication(data); // shared/mock-data.js — writes to localStorage,
                            // ready for the staff review queue to read once built

    form.hidden = true;
    success.hidden = false;
  });

  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
      updateDotLabels();
    });
  });

  initTestimonials();
});

// ---- Testimonials slider ----

let updateDotLabels = () => {};

function initTestimonials() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonial-track');
  const slides = Array.from(track.children);
  const dotsWrap = slider.querySelector('.testimonial-dots');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer = null;

  // Avatar fallback: show initials if the image URL is missing or fails to load
  slider.querySelectorAll('.testimonial-avatar img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    if (!src.startsWith('http')) { img.remove(); return; }
    // The image may have already failed before this script ran
    if (img.complete && img.naturalWidth === 0) { img.remove(); return; }
    img.addEventListener('error', () => img.remove());
  });

  // Build one dot per slide
  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.addEventListener('click', () => { goTo(i); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  updateDotLabels = () => {
    const label = translations[getLang()].testimonials_goto;
    dots.forEach((dot, i) => dot.setAttribute('aria-label', `${label} ${i + 1}`));
  };
  updateDotLabels();

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, d) => {
      dot.classList.toggle('active', d === index);
      dot.setAttribute('aria-current', d === index ? 'true' : 'false');
    });
    slides.forEach((slide, s) => slide.setAttribute('aria-hidden', s === index ? 'false' : 'true'));
  }

  function start() {
    if (reduceMotion) return;
    stop();
    timer = setInterval(() => goTo(index + 1), 6000);
  }
  function stop() { clearInterval(timer); }
  function restart() { stop(); start(); }

  slider.querySelectorAll('.testimonial-arrow').forEach((btn) => {
    btn.addEventListener('click', () => {
      goTo(btn.dataset.dir === 'next' ? index + 1 : index - 1);
      restart();
    });
  });

  // Pause while the user is reading or interacting
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('focusin', stop);
  slider.addEventListener('focusout', start);

  goTo(0);
  start();
}
