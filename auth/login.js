// login.js — login page behavior
// DEMO MODE: any email and password logs in (see demoLogin in shared/mock-data.js).

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const email = document.getElementById('login-email');
  const password = document.getElementById('login-password');

  // Arriving from the registration page: confirm the account and prefill the email
  const params = new URLSearchParams(window.location.search);
  if (params.get('registered') === '1') {
    showAlert('success', 'register_success_title', ['register_success_body']);
    if (params.get('email')) email.value = params.get('email');
    password.focus();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAlerts();
    clearInvalid(form);

    // Only check that both fields are filled in
    if (!email.value.trim() || !password.value) {
      markInvalid(email, !email.value.trim());
      markInvalid(password, !password.value);
      showAlert('danger', 'err_title', ['err_login_required']);
      return;
    }

    const user = demoLogin(email.value);
    setSession(user, form.remember.checked);
    showAlert('success', 'login_success_title', [`login_success_${user.role}`]);
    form.querySelector('.auth-submit').disabled = true;

    // Short pause so the confirmation is visible, then open the user's home page
    setTimeout(() => {
      window.location.href = ROLE_HOME[user.role] || ROLE_HOME.entrepreneur;
    }, 900);
  });
});
