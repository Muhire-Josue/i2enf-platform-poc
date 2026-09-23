// dashboard.js — entrepreneur dashboard (Espace entrepreneur)
// Demo data is dated relative to today, so the dashboard always looks current
// during a presentation, whatever day it's recorded.

// ---- Page text, added to the shared dictionary in shared/i18n.js ----
Object.assign(translations.fr, {
  dash_nav_home: "Tableau de bord",
  dash_nav_diagnostic: "Mon diagnostic",
  dash_nav_mentorship: "Mentorat",
  dash_nav_file: "Dossier d'entreprise",
  dash_logout: "Déconnexion",
  dash_kicker: "Espace entrepreneur",
  dash_hello: "Bonjour, {name}",
  dash_cohort: "Cohorte {season} {year} · Semaine {week} sur {total}",
  season_winter: "Hiver", season_spring: "Printemps", season_summer: "Été", season_fall: "Automne",
  dash_book_session: "Réserver une séance",
  dash_stat_plan: "Progression du plan",
  dash_stat_plan_note: "{done} jalons sur {total}",
  dash_stat_sessions: "Séances de mentorat",
  dash_stat_sessions_note: "Prochaine : {date}",
  dash_stat_tasks: "Tâches à faire",
  dash_stat_tasks_note: "{n} à échéance cette semaine",
  dash_stat_workshops: "Ateliers suivis",
  dash_stat_workshops_note: "Prochain : {date}",
  dash_plan_title: "Mon plan de parcours",
  dash_plan_link: "Voir mon diagnostic →",
  dash_plan_progress: "{done} jalons complétés sur {total}",
  dash_m1: "Diagnostic initial complété",
  dash_m2: "Définir la proposition de valeur",
  dash_m3: "Étude de marché locale",
  dash_m4: "Plan financier sur 12 mois",
  dash_m5: "Enregistrement de l'entreprise et numéro de TVH",
  dash_m6: "Réévaluation de mi-parcours",
  dash_m7: "Présentation finale devant le comité",
  dash_done_on: "Complété le {date}",
  dash_due_on: "Échéance : {date}",
  dash_planned_on: "Prévu le {date}",
  dash_in_progress: "En cours",
  dash_tasks_title: "À faire",
  dash_tasks_open: "{n} à faire",
  dash_task1: "Signer l'entente de participation",
  dash_task2: "Préparer vos questions pour la séance de mentorat",
  dash_task3: "Téléverser vos prévisions de ventes",
  dash_task4: "Remplir le sondage de fin de module",
  dash_due: "Échéance : {when}",
  dash_session_kicker: "Prochaine séance de mentorat",
  dash_session_video: "Visioconférence",
  dash_session_topic: "Sujet : {topic}",
  dash_session_topic_value: "Plan financier sur 12 mois",
  dash_mentor_expertise: "Finances et fiscalité",
  dash_join: "Rejoindre la séance",
  dash_reschedule: "Reprogrammer",
  dash_events_title: "Événements de la cohorte",
  dash_event1: "Atelier : la fiscalité canadienne pour les PME",
  dash_event2: "Soirée de réseautage de la cohorte",
  dash_event3: "Atelier : le marketing numérique local",
  dash_online: "En ligne",
  dash_docs_title: "Dossier d'entreprise",
  dash_docs_link: "Tout voir →",
  dash_doc_updated: "Modifié {when}",
  dash_doc_to_sign: "En attente de votre signature",
  dash_to_sign: "À signer",
});

Object.assign(translations.en, {
  dash_nav_home: "Dashboard",
  dash_nav_diagnostic: "My diagnostic",
  dash_nav_mentorship: "Mentorship",
  dash_nav_file: "Business file",
  dash_logout: "Log out",
  dash_kicker: "Entrepreneur area",
  dash_hello: "Hello, {name}",
  dash_cohort: "{season} {year} cohort · Week {week} of {total}",
  season_winter: "Winter", season_spring: "Spring", season_summer: "Summer", season_fall: "Fall",
  dash_book_session: "Book a session",
  dash_stat_plan: "Plan progress",
  dash_stat_plan_note: "{done} of {total} milestones",
  dash_stat_sessions: "Mentoring sessions",
  dash_stat_sessions_note: "Next: {date}",
  dash_stat_tasks: "Tasks to do",
  dash_stat_tasks_note: "{n} due this week",
  dash_stat_workshops: "Workshops attended",
  dash_stat_workshops_note: "Next: {date}",
  dash_plan_title: "My journey plan",
  dash_plan_link: "View my diagnostic →",
  dash_plan_progress: "{done} of {total} milestones completed",
  dash_m1: "Initial diagnostic completed",
  dash_m2: "Define the value proposition",
  dash_m3: "Local market research",
  dash_m4: "12-month financial plan",
  dash_m5: "Business registration and HST number",
  dash_m6: "Mid-program reassessment",
  dash_m7: "Final pitch to the committee",
  dash_done_on: "Completed {date}",
  dash_due_on: "Due {date}",
  dash_planned_on: "Planned for {date}",
  dash_in_progress: "In progress",
  dash_tasks_title: "To do",
  dash_tasks_open: "{n} to do",
  dash_task1: "Sign the participation agreement",
  dash_task2: "Prepare your questions for the mentoring session",
  dash_task3: "Upload your sales forecast",
  dash_task4: "Complete the end-of-module survey",
  dash_due: "Due {when}",
  dash_session_kicker: "Next mentoring session",
  dash_session_video: "Video call",
  dash_session_topic: "Topic: {topic}",
  dash_session_topic_value: "12-month financial plan",
  dash_mentor_expertise: "Finance and taxation",
  dash_join: "Join the session",
  dash_reschedule: "Reschedule",
  dash_events_title: "Cohort events",
  dash_event1: "Workshop: Canadian taxation for small businesses",
  dash_event2: "Cohort networking evening",
  dash_event3: "Workshop: local digital marketing",
  dash_online: "Online",
  dash_docs_title: "Business file",
  dash_docs_link: "View all →",
  dash_doc_updated: "Updated {when}",
  dash_doc_to_sign: "Waiting for your signature",
  dash_to_sign: "To sign",
});

// ---- Only signed-in entrepreneurs can see this page ----
const session = getSession();
if (!session) {
  window.location.replace('login.html');
} else if (session.role !== 'entrepreneur') {
  window.location.replace(ROLE_HOME[session.role] || 'login.html');
}

// ---- Helpers ----
function t(key, vars = {}) {
  let text = translations[getLang()][key] || translations.fr[key] || key;
  Object.entries(vars).forEach(([k, v]) => { text = text.replace(`{${k}}`, v); });
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

// ---- Demo data (would come from the platform's database) ----
const PROGRAM_WEEKS = 12;
const cohortStart = daysFromNow(-24);

const milestones = [
  { key: 'dash_m1', status: 'done', date: daysFromNow(-24) },
  { key: 'dash_m2', status: 'done', date: daysFromNow(-15) },
  { key: 'dash_m3', status: 'done', date: daysFromNow(-4) },
  { key: 'dash_m4', status: 'current', date: daysFromNow(6) },
  { key: 'dash_m5', status: 'upcoming', date: daysFromNow(20) },
  { key: 'dash_m6', status: 'upcoming', date: daysFromNow(38) },
  { key: 'dash_m7', status: 'upcoming', date: daysFromNow(60) },
];

const tasks = [
  { id: 't1', key: 'dash_task1', due: daysFromNow(1) },
  { id: 't2', key: 'dash_task2', due: daysFromNow(2) },
  { id: 't3', key: 'dash_task3', due: daysFromNow(5) },
  { id: 't4', key: 'dash_task4', due: daysFromNow(-1), doneByDefault: true },
];

const nextSession = {
  mentor: 'Karim Diallo',
  initials: 'KD',
  start: weekdayFromNow(2, 14, 0),
  end: weekdayFromNow(2, 15, 0),
};

const events = [
  { key: 'dash_event1', date: weekdayFromNow(4, 18, 0), place: 'dash_online' },
  { key: 'dash_event2', date: weekdayFromNow(11, 17, 30), place: 'Ottawa' },
  { key: 'dash_event3', date: weekdayFromNow(18, 12, 0), place: 'dash_online' },
];

const documents = [
  { name: "Plan d'affaires — v2.pdf", type: 'pdf', updated: daysFromNow(-2) },
  { name: 'Prévisions financières.xlsx', type: 'xlsx', updated: daysFromNow(-5) },
  { name: 'Entente de participation.pdf', type: 'pdf', toSign: true },
];

const SESSIONS_COMPLETED = 3;
const WORKSHOPS_ATTENDED = 2;

// Ticked tasks are remembered per user
const tasksStorageKey = () => `i2enf_tasks_${session ? session.email : 'demo'}`;
function getDoneTasks() {
  const saved = localStorage.getItem(tasksStorageKey());
  if (saved) return JSON.parse(saved);
  return tasks.filter((task) => task.doneByDefault).map((task) => task.id);
}
function setTaskDone(id, done) {
  const current = new Set(getDoneTasks());
  if (done) current.add(id); else current.delete(id);
  localStorage.setItem(tasksStorageKey(), JSON.stringify([...current]));
}

function cohortLabel() {
  // Season named after the current period of the program
  const month = new Date().getMonth();
  const season = month <= 1 || month === 11 ? 'season_winter' : month <= 4 ? 'season_spring' : month <= 7 ? 'season_summer' : 'season_fall';
  const week = Math.min(PROGRAM_WEEKS, Math.floor((new Date() - cohortStart) / (7 * 86400000)) + 1);
  return t('dash_cohort', { season: t(season), year: new Date().getFullYear(), week, total: PROGRAM_WEEKS });
}

// ---- Icons ----
const ICONS = {
  plan: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>',
  mentor: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>',
  tasks: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
  workshop: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 20h5v-2a4 4 0 00-3-3.87"/><path d="M9 20H4v-2a4 4 0 013-3.87"/><circle cx="12" cy="7" r="4"/><path d="M12 14a4 4 0 014 4v2H8v-2a4 4 0 014-4z"/></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>',
  clock: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  video: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/></svg>',
  topic: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z"/></svg>',
};

// ---- Rendering ----
function renderHeader() {
  const name = session.prenom || 'Entrepreneur';
  document.getElementById('user-name').textContent = name;
  document.getElementById('user-initials').textContent = name.charAt(0).toUpperCase();
  document.getElementById('welcome-title').textContent = t('dash_hello', { name });
  document.getElementById('welcome-sub').textContent = cohortLabel();
}

function renderStats() {
  const done = milestones.filter((m) => m.status === 'done').length;
  const doneTasks = new Set(getDoneTasks());
  const openTasks = tasks.filter((task) => !doneTasks.has(task.id));
  const dueThisWeek = openTasks.filter((task) => task.due - new Date() < 7 * 86400000).length;
  const stats = [
    { icon: ICONS.plan, label: t('dash_stat_plan'), value: `${Math.round((done / milestones.length) * 100)} %`, note: t('dash_stat_plan_note', { done, total: milestones.length }) },
    { icon: ICONS.mentor, label: t('dash_stat_sessions'), value: SESSIONS_COMPLETED, note: t('dash_stat_sessions_note', { date: shortDay(nextSession.start) }) },
    { icon: ICONS.tasks, label: t('dash_stat_tasks'), value: openTasks.length, note: t('dash_stat_tasks_note', { n: dueThisWeek }) },
    { icon: ICONS.workshop, label: t('dash_stat_workshops'), value: WORKSHOPS_ATTENDED, note: t('dash_stat_workshops_note', { date: shortDay(events[0].date) }) },
  ];
  document.getElementById('dash-stats').innerHTML = stats.map((s) => `
    <div class="stat-card">
      <span class="stat-icon">${s.icon}</span>
      <div class="stat-body">
        <span class="stat-label">${s.label}</span>
        <span class="stat-value">${getLang() === 'en' ? String(s.value).replace(' %', '%') : s.value}</span>
        <span class="stat-note">${s.note}</span>
      </div>
    </div>`).join('');
}

function renderMilestones() {
  const done = milestones.filter((m) => m.status === 'done').length;
  const pct = Math.round((done / milestones.length) * 100);
  document.getElementById('plan-progress-label').textContent = t('dash_plan_progress', { done, total: milestones.length });
  document.getElementById('plan-progress-pct').textContent = getLang() === 'en' ? `${pct}%` : `${pct} %`;
  document.getElementById('plan-progress-fill').style.width = `${pct}%`;

  document.getElementById('milestones').innerHTML = milestones.map((m) => {
    const dateText = m.status === 'done' ? t('dash_done_on', { date: shortDay(m.date) })
      : m.status === 'current' ? t('dash_due_on', { date: shortDay(m.date) })
      : t('dash_planned_on', { date: shortDay(m.date) });
    return `
      <li class="milestone ${m.status}">
        <span class="milestone-marker">${m.status === 'done' ? ICONS.check : ''}</span>
        <div class="milestone-body">
          <span class="milestone-title">${t(m.key)}${m.status === 'current' ? `<span class="pill pill-current">${t('dash_in_progress')}</span>` : ''}</span>
          <span class="milestone-date">${dateText}</span>
        </div>
      </li>`;
  }).join('');
}

function renderTasks() {
  const doneTasks = new Set(getDoneTasks());
  const open = tasks.filter((task) => !doneTasks.has(task.id)).length;
  document.getElementById('tasks-count').textContent = t('dash_tasks_open', { n: open });

  document.getElementById('tasks').innerHTML = tasks.map((task) => {
    const isDone = doneTasks.has(task.id);
    const soon = !isDone && task.due - new Date() < 2 * 86400000;
    return `
      <li>
        <label class="task ${isDone ? 'is-done' : ''}">
          <input type="checkbox" data-task="${task.id}" ${isDone ? 'checked' : ''}>
          <span class="task-body">
            <span class="task-title">${t(task.key)}</span>
            <span class="task-due ${soon ? 'soon' : ''}">${t('dash_due', { when: relativeDay(task.due) })}</span>
          </span>
        </label>
      </li>`;
  }).join('');
}

function renderSession() {
  const s = nextSession;
  document.getElementById('next-session').innerHTML = `
    <div class="session-top">
      <span class="kicker kicker-light">${t('dash_session_kicker')}</span>
      <span class="session-countdown">${capitalize(relativeDay(s.start))}</span>
    </div>
    <div class="session-date">${longDay(s.start)}</div>
    <div class="session-meta">
      <span>${ICONS.clock}${timeOf(s.start)} – ${timeOf(s.end)}</span>
      <span>${ICONS.video}${t('dash_session_video')}</span>
      <span>${ICONS.topic}${t('dash_session_topic', { topic: t('dash_session_topic_value') })}</span>
    </div>
    <div class="session-mentor">
      <span class="user-avatar">${s.initials}</span>
      <div><strong>${s.mentor}</strong><small>${t('dash_mentor_expertise')}</small></div>
    </div>
    <div class="session-actions">
      <a href="mentorship.html" class="btn-primary">${t('dash_join')}</a>
      <a href="mentorship.html" class="btn-outline-light">${t('dash_reschedule')}</a>
    </div>`;
}

function renderEvents() {
  document.getElementById('events').innerHTML = events.map((ev) => {
    const place = ev.place.startsWith('dash_') ? t(ev.place) : ev.place;
    return `
      <li class="event">
        <span class="event-date">
          <span class="event-day">${ev.date.getDate()}</span>
          <span class="event-month">${formatDate(ev.date, { month: 'short' }).replace('.', '')}</span>
        </span>
        <div class="event-body">
          <span class="event-title">${t(ev.key)}</span>
          <span class="event-meta">${capitalize(formatDate(ev.date, { weekday: 'long' }))} · ${timeOf(ev.date)} · ${place}</span>
        </div>
      </li>`;
  }).join('');
}

function renderDocuments() {
  document.getElementById('documents').innerHTML = documents.map((doc) => `
    <li class="document">
      <span class="doc-icon ${doc.type}">${doc.type.toUpperCase()}</span>
      <div class="doc-body">
        <span class="doc-name">${escapeHtml(doc.name)}</span>
        <span class="doc-meta">${doc.toSign ? t('dash_doc_to_sign') : t('dash_doc_updated', { when: relativeDay(doc.updated) })}</span>
      </div>
      ${doc.toSign ? `<span class="pill pill-sign">${t('dash_to_sign')}</span>` : ''}
    </li>`).join('');
}

function renderAll() {
  renderHeader();
  renderStats();
  renderMilestones();
  renderTasks();
  renderSession();
  renderEvents();
  renderDocuments();
}

// ---- Start ----
document.addEventListener('DOMContentLoaded', () => {
  if (!session || session.role !== 'entrepreneur') return;
  renderAll();

  // Language toggle: static text via data-i18n, dynamic parts re-rendered
  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setLang(btn.getAttribute('data-lang'));
      renderAll();
    });
  });

  // Tick / untick tasks
  document.getElementById('tasks').addEventListener('change', (e) => {
    if (!e.target.matches('input[data-task]')) return;
    setTaskDone(e.target.dataset.task, e.target.checked);
    renderTasks();
    renderStats();
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    clearSession();
    window.location.href = 'index.html';
  });
});
