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

// ---- Where each page lives ----
// Paths are relative to the project root (the folder that contains "shared/").
// If you move pages into folders, change the paths here: every redirect and
// every link built by the scripts reads this list.
const PAGES = {
  home: 'index.html',
  login: 'auth/login.html',
  register: 'auth/register.html',
  // Entrepreneur
  dashboard: 'enterpreneur/dashboard.html',
  diagnostic: 'diagnostic/dashboard.html',
  mentorship: 'mentorship/dashboard.html',
  'book-session': 'book-session/dashboard.html',
  'business-file': 'business-files/dashboard.html',
  // Mentor
  'mentor-dashboard': 'mentor/dashboard.html',
  // Staff
  admin: 'admin/admin.html',
  applications: 'applications/dashboard.html',
  cases: 'cases/dashboard.html',
  scheduling: 'events/dashboard.html',
  matching: 'matching/dashboard.html',
  kpi: 'kpi/dashboard.html',
};

// The project root, worked out from where this file is loaded (…/shared/mock-data.js),
// so links work from any folder, on Live Server and on GitHub Pages
const SITE_ROOT = new URL('../', document.currentScript.src);
const pageUrl = (name) => new URL(PAGES[name] || name, SITE_ROOT).href;

// Home page for each type of account (names from PAGES)
const ROLE_HOME = {
  entrepreneur: 'dashboard',
  mentor: 'mentor-dashboard',
  staff: 'admin',
};

// ---- Demo login screen ----
// The proof of concept has no sign-in: nothing is checked and nothing is saved.
// The login screen only opens the area that matches the email typed
// (demo or registered account); any other email opens the entrepreneur area.
// Real sign-in will be handled by Microsoft Entra External ID.
function homeForEmail(email) {
  const known = findUserByEmail(email);
  return pageUrl(ROLE_HOME[known ? known.role : 'entrepreneur'] || 'dashboard');
}
