// shared/auth.js — behavior shared by the login and registration pages

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function markInvalid(field, invalid) {
  if (field) field.classList.toggle('field-invalid', invalid);
}

function clearInvalid(form) {
  form.querySelectorAll('.field-invalid').forEach((el) => el.classList.remove('field-invalid'));
}

document.addEventListener('DOMContentLoaded', () => {
  // Language toggle
  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });

  // Show / hide password
  document.querySelectorAll('.password-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const showing = input.type === 'text';
      input.type = showing ? 'password' : 'text';
      btn.classList.toggle('showing', !showing);
      btn.setAttribute('data-i18n-aria-label', showing ? 'auth_show_password' : 'auth_hide_password');
      applyTranslations();
    });
  });

  // Remove the red outline as soon as the user fixes a field
  document.querySelectorAll('.auth-form').forEach((form) => {
    form.addEventListener('input', (e) => markInvalid(e.target, false));
    form.addEventListener('change', (e) => markInvalid(e.target, false));
  });
});