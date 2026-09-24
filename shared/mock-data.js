// shared/mock-data.js — local data layer simulating the shared database.
// In the real product this is the central database every area reads/writes;
// here it's localStorage, so pages can demo the "no double entry" architecture
// (e.g. a public application shows up in the staff review queue) without a backend.

function saveApplication(data) {
  const applications = JSON.parse(localStorage.getItem('i2enf_applications') || '[]');
  applications.push({
    id: 'app_' + Date.now(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
    ...data,
  });
  localStorage.setItem('i2enf_applications', JSON.stringify(applications));
}

function getApplications() {
  return JSON.parse(localStorage.getItem('i2enf_applications') || '[]');
}

// ---- User accounts (mock) ----
// PROOF OF CONCEPT ONLY: passwords are kept in plain text in localStorage so
// the demo works without a server. The real platform uses Microsoft Entra
// External ID for sign-in and MFA, so the application never stores passwords.

const DEMO_PASSWORD = 'Demo2026!';
const DEMO_USERS = [
  { role: 'entrepreneur', prenom: 'Amélie', nom: 'Fortin', email: 'entrepreneur@demo.ca', password: DEMO_PASSWORD },
  { role: 'mentor', prenom: 'Karim', nom: 'Diallo', email: 'mentor@demo.ca', password: DEMO_PASSWORD },
  { role: 'staff', staffRole: 'conseiller', prenom: 'Sophie', nom: 'Lavoie', email: 'conseiller@demo.ca', password: DEMO_PASSWORD },
];

// Staff accounts can only be created with an invitation code issued by SOFIFRAN
const STAFF_INVITE_CODE = 'SOFIFRAN-2026';

function getUsers() {
  const stored = localStorage.getItem('i2enf_users');
  if (!stored) {
    localStorage.setItem('i2enf_users', JSON.stringify(DEMO_USERS));
    return [...DEMO_USERS];
  }
  return JSON.parse(stored);
}

function findUserByEmail(email) {
  const target = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === target) || null;
}

function registerUser(user) {
  const users = getUsers();
  users.push({ ...user, id: 'user_' + Date.now(), createdAt: new Date().toISOString() });
  localStorage.setItem('i2enf_users', JSON.stringify(users));
}

function setSession(user, remember) {
  const session = JSON.stringify({ email: user.email, role: user.role, prenom: user.prenom });
  // "Remember me" keeps the session after the browser closes
  (remember ? localStorage : sessionStorage).setItem('i2enf_session', session);
}

// ---- Demo login ----
// For the presentation, any email and password logs in. Known accounts (demo
// or registered) open their own area; any other email opens the entrepreneur
// area. Real sign-in is handled by Microsoft Entra External ID.

// Home page for each type of account
const ROLE_HOME = {
  entrepreneur: '../enterpreneur/dashboard.html',
  mentor: '../mentor/mentor-dashboard.html',
  staff: '../staff/applications.html',
};

function demoLogin(email) {
  const known = findUserByEmail(email);
  if (known) return known;
  // Unknown email: sign in as an entrepreneur, using the email to make a first name
  const first = email.trim().split('@')[0].split(/[._\-0-9]+/).filter(Boolean)[0] || 'Entrepreneur';
  return {
    role: 'entrepreneur',
    prenom: first.charAt(0).toUpperCase() + first.slice(1).toLowerCase(),
    email: email.trim().toLowerCase(),
  };
}

function getSession() {
  const raw = sessionStorage.getItem('i2enf_session') || localStorage.getItem('i2enf_session');
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  sessionStorage.removeItem('i2enf_session');
  localStorage.removeItem('i2enf_session');
}
