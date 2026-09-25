// login.js — demo login screen.
// No sign-in in the proof of concept: nothing is checked and nothing is saved.
// "Se connecter" opens the area that matches the email (see homeForEmail in shared/mock-data.js).

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const email = document.getElementById('login-email');

  // Arriving from the registration page: confirm the account and prefill the email
  const params = new URLSearchParams(window.location.search);
  if (params.get('registered') === '1') {
    showAlert('success', 'register_success_title', ['register_success_body']);
    if (params.get('email')) email.value = params.get('email');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = homeForEmail(email.value);
  });
});