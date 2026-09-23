// register.js — registration page behavior

const PASSWORD_RULE = /^(?=.*[A-Za-zÀ-ÿ])(?=.*\d).{8,}$/;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const roleFieldsets = form.querySelectorAll('.role-fields');
  const demoConsent = document.getElementById('demo-consent');
  const demoFields = document.getElementById('demographics-fields');

  // Show only the section that matches the selected account type
  function showRoleFields() {
    const role = form.role.value;
    roleFieldsets.forEach((fs) => { fs.hidden = fs.dataset.role !== role; });
    clearInvalid(form);
  }
  form.querySelectorAll('input[name="role"]').forEach((r) => r.addEventListener('change', showRoleFields));
  showRoleFields();

  // Demographic questions appear only after the separate, optional consent
  demoConsent.addEventListener('change', () => { demoFields.hidden = !demoConsent.checked; });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAlerts();
    clearInvalid(form);

    const role = form.role.value;
    const errors = new Set();
    const val = (name) => (form.elements[name].value || '').trim();

    // Required fields: common to everyone, then per account type
    const required = ['prenom', 'nom', 'email', 'telephone', 'password', 'passwordConfirm'];
    if (role === 'entrepreneur') required.push('secteur', 'stade', 'statut', 'ville');
    if (role === 'mentor') required.push('organisation', 'experience', 'disponibilite');
    if (role === 'staff') required.push('codeInvitation', 'rolePersonnel');

    required.forEach((name) => {
      if (!val(name)) {
        errors.add('err_required');
        markInvalid(form.elements[name], true);
      }
    });

    if (val('email') && !EMAIL_PATTERN.test(val('email'))) {
      errors.add('err_email');
      markInvalid(form.email, true);
    } else if (val('email') && findUserByEmail(val('email'))) {
      errors.add('err_email_taken');
      markInvalid(form.email, true);
    }

    if (val('telephone') && val('telephone').replace(/\D/g, '').length < 10) {
      errors.add('err_phone');
      markInvalid(form.telephone, true);
    }

    if (val('password') && !PASSWORD_RULE.test(form.password.value)) {
      errors.add('err_password_rule');
      markInvalid(form.password, true);
    }
    if (form.password.value && form.passwordConfirm.value && form.password.value !== form.passwordConfirm.value) {
      errors.add('err_password_match');
      markInvalid(form.passwordConfirm, true);
    }

    const checked = (name) => Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((c) => c.value);

    if (role === 'mentor') {
      if (!checked('expertise').length) {
        errors.add('err_expertise');
        markInvalid(document.getElementById('expertise-group'), true);
      }
      if (!checked('mentorLangues').length) {
        errors.add('err_mentor_languages');
        markInvalid(document.getElementById('mentor-lang-group'), true);
      }
    }

    if (role === 'staff' && val('codeInvitation') && val('codeInvitation').toUpperCase() !== STAFF_INVITE_CODE) {
      errors.add('err_invite_code');
      markInvalid(form.codeInvitation, true);
    }

    if (!form.consent.checked) {
      errors.add('err_consent');
      form.consent.closest('.check-field').classList.add('field-invalid-label');
    } else {
      form.consent.closest('.check-field').classList.remove('field-invalid-label');
    }

    if (errors.size) {
      showAlert('danger', 'err_title', Array.from(errors));
      return;
    }

    // Build the account, keeping only the fields for the chosen type
    const user = {
      role,
      prenom: val('prenom'),
      nom: val('nom'),
      email: val('email').toLowerCase(),
      telephone: val('telephone'),
      langue: val('langue'),
      password: form.password.value, // mock only: see note in shared/mock-data.js
      consentements: { confidentialite: true, nouvelles: form.newsletter.checked },
    };

    if (role === 'entrepreneur') {
      Object.assign(user, {
        entreprise: val('entreprise'),
        secteur: val('secteur'),
        stade: val('stade'),
        statut: val('statut'),
        ville: val('ville'),
        rappels: form.rappels.value,
      });
      if (demoConsent.checked) {
        user.demographie = { genre: val('genre'), nouvelArrivant: val('nouvelArrivant') };
        user.consentements.demographie = true;
      }
    }
    if (role === 'mentor') {
      Object.assign(user, {
        organisation: val('organisation'),
        expertise: checked('expertise'),
        experience: val('experience'),
        disponibilite: val('disponibilite'),
        langues: checked('mentorLangues'),
      });
    }
    if (role === 'staff') {
      user.staffRole = val('rolePersonnel');
    }

    registerUser(user);
    showAlert('success', 'register_success_title', ['register_redirect']);
    form.querySelector('.auth-submit').disabled = true;

    setTimeout(() => {
      window.location.href = `login.html?registered=1&email=${encodeURIComponent(user.email)}`;
    }, 1600);
  });
});
