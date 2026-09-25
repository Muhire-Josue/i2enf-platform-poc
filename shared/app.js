// shared/app.js — shared by every page of the member area (after login):
// the header, date helpers, and the demo data the pages share
// (mentors, sessions, documents, plan). Pages call initAppPage({ page, render }).

// ---- Text shared by member-area pages ----
Object.assign(translations.fr, {
  app_nav_home: "Tableau de bord",
  app_nav_diagnostic: "Mon diagnostic",
  app_nav_mentorship: "Mentorat",
  app_nav_file: "Dossier d'entreprise",
  app_nav_label_entrepreneur: "Espace entrepreneur",
  app_nav_label_mentor: "Espace mentor",
  app_nav_label_staff: "Espace gestion",
  app_logout: "Déconnexion",
  // Same text under the names used by headers written directly in the HTML
  dash_nav_home: "Tableau de bord",
  dash_nav_diagnostic: "Mon diagnostic",
  dash_nav_mentorship: "Mentorat",
  dash_nav_file: "Dossier d'entreprise",
  dash_logout: "Déconnexion",
  app_kicker: "Espace entrepreneur",
  app_back_dashboard: "Retour au tableau de bord",
  season_winter: "Hiver", season_spring: "Printemps", season_summer: "Été", season_fall: "Automne",
  dash_m1: "Diagnostic initial complété",
  dash_m2: "Définir la proposition de valeur",
  dash_m3: "Étude de marché locale",
  dash_m4: "Plan financier sur 12 mois",
  dash_m5: "Enregistrement de l'entreprise et numéro de TVH",
  dash_m6: "Réévaluation de mi-parcours",
  dash_m7: "Présentation finale devant le comité",
  area_business_model: "Modèle d'affaires",
  area_market: "Marché et clientèle",
  area_finance: "Finances",
  area_legal: "Aspects juridiques et fiscaux",
  area_marketing: "Marketing et ventes",
  area_management: "Gestion et compétences",
  mentor_kd_title: "Comptable (CPA) — Diallo & Associés",
  mentor_nb_title: "Stratège marketing — Studio Boréal",
  mentor_lt_title: "Avocat d'affaires — Tremblay Juridique",
  format_video: "Visioconférence",
  format_inperson: "En personne, bureau d'Ottawa",
  topic_value_prop: "Proposition de valeur",
  topic_market: "Étude de marché",
  topic_registration: "Enregistrement de l'entreprise",
  topic_financial_plan: "Plan financier sur 12 mois",
  topic_marketing: "Marketing numérique",
  topic_other: "Autre sujet",
  lang_name_fr: "Français",
  lang_name_en: "Anglais",
  duration_min: "{n} min",
});

Object.assign(translations.en, {
  app_nav_home: "Dashboard",
  app_nav_diagnostic: "My diagnostic",
  app_nav_mentorship: "Mentorship",
  app_nav_file: "Business file",
  app_nav_label_entrepreneur: "Entrepreneur area",
  app_nav_label_mentor: "Mentor area",
  app_nav_label_staff: "Staff area",
  app_logout: "Log out",
  // Same text under the names used by headers written directly in the HTML
  dash_nav_home: "Dashboard",
  dash_nav_diagnostic: "My diagnostic",
  dash_nav_mentorship: "Mentorship",
  dash_nav_file: "Business file",
  dash_logout: "Log out",
  app_kicker: "Entrepreneur area",
  app_back_dashboard: "Back to dashboard",
  season_winter: "Winter", season_spring: "Spring", season_summer: "Summer", season_fall: "Fall",
  dash_m1: "Initial diagnostic completed",
  dash_m2: "Define the value proposition",
  dash_m3: "Local market research",
  dash_m4: "12-month financial plan",
  dash_m5: "Business registration and HST number",
  dash_m6: "Mid-program reassessment",
  dash_m7: "Final pitch to the committee",
  area_business_model: "Business model",
  area_market: "Market and customers",
  area_finance: "Finance",
  area_legal: "Legal and tax",
  area_marketing: "Marketing and sales",
  area_management: "Management skills",
  mentor_kd_title: "Accountant (CPA) — Diallo & Associés",
  mentor_nb_title: "Marketing strategist — Studio Boréal",
  mentor_lt_title: "Business lawyer — Tremblay Juridique",
  format_video: "Video call",
  format_inperson: "In person, Ottawa office",
  topic_value_prop: "Value proposition",
  topic_market: "Market research",
  topic_registration: "Business registration",
  topic_financial_plan: "12-month financial plan",
  topic_marketing: "Digital marketing",
  topic_other: "Other topic",
  lang_name_fr: "French",
  lang_name_en: "English",
  duration_min: "{n} min",
});

// ---- Helpers ----
function t(key, vars = {}) {
  let text = translations[getLang()][key] || translations.fr[key] || key;
  Object.entries(vars).forEach(([k, v]) => { text = text.split(`{${k}}`).join(v); });
  return text;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const locale = () => (getLang() === 'fr' ? 'fr-CA' : 'en-CA');
const formatDate = (date, options) => new Intl.DateTimeFormat(locale(), options).format(date);
const longDay = (d) => capitalize(formatDate(d, { weekday: 'long', day: 'numeric', month: 'long' }));
const shortDay = (d) => formatDate(d, { day: 'numeric', month: 'long' });
const timeOf = (d) => formatDate(d, { hour: 'numeric', minute: '2-digit' });
const monthShort = (d) => formatDate(d, { month: 'short' }).replace('.', '');
const percent = (n) => (getLang() === 'fr' ? `${n} %` : `${n}%`);

// "demain", "dans 3 jours", "il y a 2 jours"...
function relativeDay(date) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const target = new Date(date); target.setHours(0, 0, 0, 0);
  const days = Math.round((target - today) / 86400000);
  return new Intl.RelativeTimeFormat(locale(), { numeric: 'auto' }).format(days, 'day');
}

function daysFromNow(days, hour = 9, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, minute, 0, 0);
  return d;
}

// Same as daysFromNow, but moved to Monday if it lands on a weekend
function weekdayFromNow(days, hour, minute) {
  const d = daysFromNow(days, hour, minute);
  if (d.getDay() === 6) d.setDate(d.getDate() + 2);
  if (d.getDay() === 0) d.setDate(d.getDate() + 1);
  return d;
}

// ---- Icons ----
const ICONS = {
  home: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>',
  diagnostic: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
  mentor: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>',
  folder: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>',
  logout: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>',
  clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  video: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>',
  pin: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0119 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
  topic: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z"/></svg>',
  back: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
};

// ---- Page start ----
// No sign-in in the proof of concept: every page opens directly and shows
// its area's demo person. Access control belongs to the real back end (Microsoft Entra).
let APP_SESSION = null; // the person the page is shown for

const DEMO_PERSON = {
  entrepreneur: { email: 'entrepreneur@demo.ca', role: 'entrepreneur', prenom: 'Amélie' },
  mentor: { email: 'mentor@demo.ca', role: 'mentor', prenom: 'Karim' },
  staff: { email: 'conseiller@demo.ca', role: 'staff', prenom: 'Sophie' },
};

/**
 * Start a member-area page.
 * @param {object} options
 * @param {string} options.page   - which header link is active (e.g. 'dashboard', 'mentorship', 'mentor-dashboard')
 * @param {string} [options.role] - which area the page belongs to: 'entrepreneur' (default), 'mentor' or 'staff'
 * @param {Function} options.render - draws the page; called again when the language changes
 * @param {Function} [options.setup] - runs once after the first render (event listeners)
 */
function initAppPage({ page, role = 'entrepreneur', render, setup }) {
  APP_SESSION = DEMO_PERSON[role];

  document.addEventListener('DOMContentLoaded', () => {
    const renderAll = () => {
      renderAppHeader(page, role, renderAll);
      applyTranslations();
      render();
    };
    renderAll();
    if (setup) setup();
  });
}

// Header links for each type of account ("page" is a name from PAGES in shared/mock-data.js)
const NAV_ITEMS = {
  entrepreneur: [
    { page: 'dashboard', href: 'dashboard.html', key: 'app_nav_home', icon: ICONS.home },
    { page: 'diagnostic', href: 'diagnostic.html', key: 'app_nav_diagnostic', icon: ICONS.diagnostic },
    { page: 'mentorship', href: 'mentorship.html', key: 'app_nav_mentorship', icon: ICONS.mentor },
    { page: 'business-file', href: 'business-file.html', key: 'app_nav_file', icon: ICONS.folder },
  ],
  mentor: [
    { page: 'mentor-dashboard', href: 'mentor-dashboard.html', key: 'app_nav_home', icon: ICONS.home },
  ],
};
const NAV_LABELS = { entrepreneur: 'app_nav_label_entrepreneur', mentor: 'app_nav_label_mentor' };

function renderAppHeader(activePage, role, onLangChange) {
  const header = document.getElementById('app-header');
  if (!header) { connectStaticHeader(onLangChange); return; }
  const name = APP_SESSION.prenom || '';
  const lang = getLang();
  const items = NAV_ITEMS[role] || [];

  header.innerHTML = `
    <div class="container app-header-inner">
      <a href="${pageUrl(ROLE_HOME[role] || 'home')}" class="logo">
        <span class="logo-main">I2ENF</span>
        <span class="logo-sub">SOFIFRAN</span>
      </a>
      <nav class="app-nav" aria-label="${t(NAV_LABELS[role] || 'app_nav_label_entrepreneur')}">
        ${items.map((item) => `
          <a href="${pageUrl(item.page)}" class="${item.page === activePage ? 'active' : ''}" ${item.page === activePage ? 'aria-current="page"' : ''}>
            ${item.icon}<span>${t(item.key)}</span>
          </a>`).join('')}
      </nav>
      <div class="app-header-actions">
        <div class="lang-toggle">
          <button data-lang="fr" type="button" class="${lang === 'fr' ? 'active' : ''}">FR</button>
          <button data-lang="en" type="button" class="${lang === 'en' ? 'active' : ''}">EN</button>
        </div>
        <div class="user-chip">
          <span class="user-avatar" aria-hidden="true">${escapeHtml(name.charAt(0).toUpperCase())}</span>
          <span class="user-name">${escapeHtml(name)}</span>
        </div>
        <button type="button" class="btn-logout" id="logout-btn">${ICONS.logout}<span>${t('app_logout')}</span></button>
      </div>
    </div>`;

  header.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
      onLangChange();
    });
  });
  // "Déconnexion" simply goes back to the public home page
  header.querySelector('#logout-btn').addEventListener('click', () => {
    window.location.href = pageUrl('home');
  });
}

// Pages can also write their own header in the HTML (for example with folder paths
// like ../enterpreneur/dashboard.html). Then we keep that header and only fill in
// the person's name and connect the language and "Déconnexion" buttons.
function connectStaticHeader(onLangChange) {
  const header = document.querySelector('.app-header');
  if (!header) return;
  const name = APP_SESSION.prenom || '';
  const nameEl = header.querySelector('.user-name');
  const avatarEl = header.querySelector('.user-avatar');
  if (nameEl) nameEl.textContent = name;
  if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();

  // This runs again after each language change, so connect each button only once
  header.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    if (btn.dataset.connected) return;
    btn.dataset.connected = 'true';
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
      onLangChange();
    });
  });

  // "Déconnexion": a link goes to its own page; a button goes to the public home page
  const logout = header.querySelector('#logout-btn');
  if (logout && logout.tagName !== 'A' && !logout.dataset.connected) {
    logout.dataset.connected = 'true';
    logout.addEventListener('click', () => { window.location.href = pageUrl('home'); });
  }
}

// ---- Per-person storage (demo) ----
const userKey = (name) => `i2enf_${name}_${APP_SESSION ? APP_SESSION.email : 'demo'}`;
function readStore(name, fallback) {
  try {
    const raw = localStorage.getItem(userKey(name));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeStore(name, value) {
  localStorage.setItem(userKey(name), JSON.stringify(value));
}

// ---- Demo data shared by the member-area pages ----
// Dates are relative to today, so the demo always looks current.

const PROGRAM_WEEKS = 12;
const COHORT_START = daysFromNow(-24);

function cohortLabel(template) {
  const month = new Date().getMonth();
  const season = month <= 1 || month === 11 ? 'season_winter' : month <= 4 ? 'season_spring' : month <= 7 ? 'season_summer' : 'season_fall';
  const week = Math.min(PROGRAM_WEEKS, Math.floor((new Date() - COHORT_START) / (7 * 86400000)) + 1);
  return t(template, { season: t(season), year: new Date().getFullYear(), week, total: PROGRAM_WEEKS });
}

// Journey plan created by the initial diagnostic
const MILESTONES = [
  { key: 'dash_m1', desc: 'm1_desc', area: null, status: 'done', date: daysFromNow(-24) },
  { key: 'dash_m2', desc: 'm2_desc', area: 'area_business_model', status: 'done', date: daysFromNow(-15) },
  { key: 'dash_m3', desc: 'm3_desc', area: 'area_market', status: 'done', date: daysFromNow(-4) },
  { key: 'dash_m4', desc: 'm4_desc', area: 'area_finance', status: 'current', date: weekdayFromNow(6, 9, 0) },
  { key: 'dash_m5', desc: 'm5_desc', area: 'area_legal', status: 'upcoming', date: weekdayFromNow(20, 9, 0) },
  { key: 'dash_m6', desc: 'm6_desc', area: null, status: 'upcoming', date: weekdayFromNow(38, 9, 0) },
  { key: 'dash_m7', desc: 'm7_desc', area: null, status: 'upcoming', date: weekdayFromNow(60, 9, 0) },
];

// Mentors: the assigned mentor plus experts in the mentor pool
const MENTORS = [
  { id: 'kd', name: 'Karim Diallo', initials: 'KD', titleKey: 'mentor_kd_title', expertise: ['area_finance', 'area_legal'], languages: ['fr', 'en'], assigned: true },
  { id: 'nb', name: 'Nadia Belkacem', initials: 'NB', titleKey: 'mentor_nb_title', expertise: ['area_marketing', 'area_market'], languages: ['fr'] },
  { id: 'lt', name: 'Luc Tremblay', initials: 'LT', titleKey: 'mentor_lt_title', expertise: ['area_legal', 'area_business_model'], languages: ['fr', 'en'] },
];
const mentorById = (id) => MENTORS.find((m) => m.id === id);

const SESSION_TOPICS = ['topic_financial_plan', 'topic_registration', 'topic_marketing', 'topic_market', 'topic_value_prop', 'topic_other'];

// Mentoring sessions: demo history + whatever the user books
function defaultSessions() {
  return [
    { id: 's-past-1', mentorId: 'kd', start: weekdayFromNow(-20, 14, 0), duration: 60, format: 'video', topic: 'topic_value_prop', notes: 'notes_1' },
    { id: 's-past-2', mentorId: 'kd', start: weekdayFromNow(-13, 14, 0), duration: 60, format: 'video', topic: 'topic_market', notes: 'notes_2' },
    { id: 's-past-3', mentorId: 'lt', start: weekdayFromNow(-6, 10, 30), duration: 30, format: 'inperson', topic: 'topic_registration', notes: 'notes_3' },
    { id: 's-next-1', mentorId: 'kd', start: weekdayFromNow(2, 14, 0), duration: 60, format: 'video', topic: 'topic_financial_plan' },
    { id: 's-next-2', mentorId: 'nb', start: weekdayFromNow(9, 11, 0), duration: 60, format: 'video', topic: 'topic_marketing' },
  ];
}

const sessionEnd = (s) => new Date(s.start.getTime() + s.duration * 60000);

function getSessions() {
  const booked = readStore('booked', []).map((s) => ({ ...s, start: new Date(s.start) }));
  const cancelled = new Set(readStore('cancelled', []));
  return [...defaultSessions(), ...booked]
    .filter((s) => !cancelled.has(s.id))
    .sort((a, b) => a.start - b.start);
}
const getUpcomingSessions = () => getSessions().filter((s) => sessionEnd(s) > new Date());
const getPastSessions = () => getSessions().filter((s) => sessionEnd(s) <= new Date()).reverse();
const getSessionById = (id) => getSessions().find((s) => s.id === id);

function bookSession(details) {
  const booked = readStore('booked', []);
  const id = `s_${Date.now()}`;
  booked.push({ ...details, id, start: details.start.toISOString() });
  writeStore('booked', booked);
  return id;
}

function cancelSession(id) {
  const cancelled = readStore('cancelled', []);
  if (!cancelled.includes(id)) cancelled.push(id);
  writeStore('cancelled', cancelled);
}

// Open time slots for a mentor on a given day, avoiding the user's other sessions
const SLOT_TIMES = [[9, 0], [10, 30], [13, 0], [14, 30], [16, 0]];
function availableSlots(mentorId, day, duration, ignoreSessionId) {
  const others = getSessions().filter((s) => s.id !== ignoreSessionId);
  const soonest = new Date(Date.now() + 2 * 3600000);
  return SLOT_TIMES
    // Demo: some slots are already taken (varies by day and mentor)
    .filter((_, i) => (day.getDate() * 7 + day.getMonth() * 13 + i * 5 + mentorId.charCodeAt(0)) % 3 !== 0)
    .map(([h, m]) => { const d = new Date(day); d.setHours(h, m, 0, 0); return d; })
    .filter((start) => start > soonest)
    .filter((start) => {
      const end = new Date(start.getTime() + duration * 60000);
      return !others.some((s) => start < sessionEnd(s) && end > s.start);
    });
}

// The next weekdays, starting tomorrow
function bookableDays(count = 10) {
  const days = [];
  const d = new Date(); d.setHours(0, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) days.push(new Date(d));
  }
  return days;
}

// Business file documents: demo files + uploads, signatures, deletions
function defaultDocuments() {
  return [
    { id: 'd1', name: "Plan d'affaires — v2.pdf", category: 'plan', size: 1843200, updated: daysFromNow(-2), by: 'self' },
    { id: 'd2', name: 'Prévisions financières.xlsx', category: 'finance', size: 412000, updated: daysFromNow(-5), by: 'self' },
    { id: 'd3', name: 'Entente de participation.pdf', category: 'agreement', size: 286000, updated: daysFromNow(-6), by: 'staff', toSign: true },
    { id: 'd4', name: 'Rapport du diagnostic initial.pdf', category: 'plan', size: 952000, updated: daysFromNow(-24), by: 'staff' },
    { id: 'd5', name: 'Étude de marché — sondage clients.pdf', category: 'plan', size: 1320000, updated: daysFromNow(-9), by: 'self' },
    { id: 'd6', name: 'Notes de mentorat — séance 2.pdf', category: 'mentoring', size: 164000, updated: daysFromNow(-13), by: 'mentor' },
    { id: 'd7', name: 'Statuts constitutifs.pdf', category: 'legal', size: 540000, updated: daysFromNow(-30), by: 'self' },
  ];
}

function getDocuments() {
  const uploads = readStore('uploads', []).map((d) => ({ ...d, updated: new Date(d.updated) }));
  const signed = readStore('signed', {});
  const deleted = new Set(readStore('deleted', []));
  return [...uploads, ...defaultDocuments()]
    .filter((d) => !deleted.has(d.id))
    .map((d) => (signed[d.id] ? { ...d, toSign: false, signedOn: new Date(signed[d.id]) } : d))
    .sort((a, b) => b.updated - a.updated);
}

function addDocument(file, category) {
  const uploads = readStore('uploads', []);
  uploads.push({ id: `u_${Date.now()}_${uploads.length}`, name: file.name, category, size: file.size, updated: new Date().toISOString(), by: 'self', uploaded: true });
  writeStore('uploads', uploads);
}

function signDocument(id) {
  const signed = readStore('signed', {});
  signed[id] = new Date().toISOString();
  writeStore('signed', signed);
}
const isSigned = (id) => Boolean(readStore('signed', {})[id]);

function deleteDocument(id) {
  const deleted = readStore('deleted', []);
  deleted.push(id);
  writeStore('deleted', deleted);
}

function fileType(name) {
  const ext = name.split('.').pop().toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (['xls', 'xlsx', 'csv'].includes(ext)) return 'xlsx';
  if (['doc', 'docx'].includes(ext)) return 'docx';
  if (['png', 'jpg', 'jpeg'].includes(ext)) return 'img';
  return 'other';
}

function formatSize(bytes) {
  const mb = bytes / 1048576;
  const value = mb >= 1 ? mb.toFixed(1) : Math.max(1, Math.round(bytes / 1024));
  const unit = mb >= 1 ? (getLang() === 'fr' ? 'Mo' : 'MB') : (getLang() === 'fr' ? 'Ko' : 'KB');
  return `${getLang() === 'fr' ? String(value).replace('.', ',') : value}\u00a0${unit}`;
}