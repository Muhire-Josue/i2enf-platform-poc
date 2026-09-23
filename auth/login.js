// login.js — login page behavior

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

    const errors = [];
    if (!email.value.trim() || !password.value) {
      errors.push('err_login_required');
      markInvalid(email, !email.value.trim());
      markInvalid(password, !password.value);
    } else if (!EMAIL_PATTERN.test(email.value.trim())) {
      errors.push('err_email');
      markInvalid(email, true);
    }
    if (errors.length) {
      showAlert('danger', 'err_title', errors);
      return;
    }

    const user = findUserByEmail(email.value);
    if (!user || user.password !== password.value) {
      // Same message whether the email or the password is wrong, so the form
      // doesn't reveal which emails have accounts
      markInvalid(email, true);
      markInvalid(password, true);
      showAlert('danger', 'err_login_title', ['err_login_invalid']);
      return;
    }

    setSession(user, form.remember.checked);
    showAlert('success', 'login_success_title', [`login_success_${user.role}`]);
    password.value = '';
  });
});
