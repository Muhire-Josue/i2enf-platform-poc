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
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
});