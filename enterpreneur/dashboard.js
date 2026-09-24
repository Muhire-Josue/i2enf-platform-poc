// dashboard.js — entrepreneur dashboard (Espace entrepreneur)
// Header, login check, helpers and shared demo data come from shared/app.js.

// ---- Page text, added to the shared dictionary ----
Object.assign(translations.fr, {
  dash_kicker: "Espace entrepreneur",
  dash_hello: "Bonjour, {name}",
  dash_cohort: "Cohorte {season} {year} · Semaine {week} sur {total}",
  dash_book_session: "Réserver une séance",
  dash_stat_plan: "Progression du plan",
  dash_stat_plan_note: "{done} jalons sur {total}",
  dash_stat_sessions: "Séances de mentorat",
  dash_stat_sessions_note: "Prochaine : {date}",
  dash_stat_sessions_none: "Aucune séance prévue",
  dash_stat_tasks: "Tâches à faire",
  dash_stat_tasks_note: "{n} à échéance cette semaine",
  dash_stat_workshops: "Ateliers suivis",
  dash_stat_workshops_note: "Prochain : {date}",
  dash_plan_title: "Mon plan de parcours",
  dash_plan_link: "Voir mon diagnostic →",
  dash_plan_progress: "{done} jalons complétés sur {total}",
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
  dash_session_topic: "Sujet : {topic}",
  dash_join: "Rejoindre la séance",
  dash_reschedule: "Reprogrammer",
  dash_no_session: "Aucune séance à venir.",
  dash_events_title: "Événements de la cohorte",
  dash_event1: "Atelier : la fiscalité canadienne pour les PME",
  dash_event2: "Soirée de réseautage de la cohorte",
  dash_event3: "Atelier : le marketing numérique local",
  dash_online: "En ligne",
  dash_docs_title: "Dossier d'entreprise",
  dash_docs_link: "Tout voir →",
  dash_doc_updated: "Modifié {when}",
  dash_doc_to_sign: "En attente de votre signature",
  dash_doc_signed: "Signé {when}",
  dash_signed: "Signé",
  dash_to_sign: "À signer",
});

Object.assign(translations.en, {
  dash_kicker: "Entrepreneur area",
  dash_hello: "Hello, {name}",
  dash_cohort: "{season} {year} cohort · Week {week} of {total}",
  dash_book_session: "Book a session",
  dash_stat_plan: "Plan progress",
  dash_stat_plan_note: "{done} of {total} milestones",
  dash_stat_sessions: "Mentoring sessions",
  dash_stat_sessions_note: "Next: {date}",
  dash_stat_sessions_none: "No session scheduled",
  dash_stat_tasks: "Tasks to do",
  dash_stat_tasks_note: "{n} due this week",
  dash_stat_workshops: "Workshops attended",
  dash_stat_workshops_note: "Next: {date}",
  dash_plan_title: "My journey plan",
  dash_plan_link: "View my diagnostic →",
  dash_plan_progress: "{done} of {total} milestones completed",
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
  dash_session_topic: "Topic: {topic}",
  dash_join: "Join the session",
  dash_reschedule: "Reschedule",
  dash_no_session: "No upcoming session.",
  dash_events_title: "Cohort events",
  dash_event1: "Workshop: Canadian taxation for small businesses",
  dash_event2: "Cohort networking evening",
  dash_event3: "Workshop: local digital marketing",
  dash_online: "Online",
  dash_docs_title: "Business file",
  dash_docs_link: "View all →",
  dash_doc_updated: "Updated {when}",
  dash_doc_to_sign: "Waiting for your signature",
  dash_doc_signed: "Signed {when}",
  dash_signed: "Signed",
  dash_to_sign: "To sign",
});

// ---- Dashboard-only demo data ----
const tasks = [
  { id: 't1', key: 'dash_task1', due: daysFromNow(1), doneWhen: () => isSigned('d3') },
  { id: 't2', key: 'dash_task2', due: daysFromNow(2) },
  { id: 't3', key: 'dash_task3', due: daysFromNow(5) },
  { id: 't4', key: 'dash_task4', due: daysFromNow(-1), doneByDefault: true },
];

const events = [
  { key: 'dash_event1', date: weekdayFromNow(4, 18, 0), place: 'dash_online' },
  { key: 'dash_event2', date: weekdayFromNow(11, 17, 30), place: 'Ottawa' },
  { key: 'dash_event3', date: weekdayFromNow(18, 12, 0), place: 'dash_online' },
];

const WORKSHOPS_ATTENDED = 2;

// Ticked tasks are remembered per user; signing the agreement ticks its task
function getDoneTasks() {
  const saved = readStore('tasks', null);
  const done = new Set(saved || tasks.filter((task) => task.doneByDefault).map((task) => task.id));
  tasks.forEach((task) => { if (task.doneWhen && task.doneWhen()) done.add(task.id); });
  return done;
}
function setTaskDone(id, done) {
  const current = getDoneTasks();
  if (done) current.add(id); else current.delete(id);
  writeStore('tasks', [...current]);
}

const STAT_ICONS = {
  plan: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>',
  mentor: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>',
  tasks: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
  workshop: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 20h5v-2a4 4 0 00-3-3.87"/><path d="M9 20H4v-2a4 4 0 013-3.87"/><circle cx="12" cy="7" r="4"/><path d="M12 14a4 4 0 014 4v2H8v-2a4 4 0 014-4z"/></svg>',
};

// ---- Rendering ----
function renderWelcome() {
  const name = APP_SESSION.prenom || 'Entrepreneur';
  document.getElementById('welcome-title').textContent = t('dash_hello', { name });
  document.getElementById('welcome-sub').textContent = cohortLabel('dash_cohort');
}

function renderStats() {
  const done = MILESTONES.filter((m) => m.status === 'done').length;
  const doneTasks = getDoneTasks();
  const openTasks = tasks.filter((task) => !doneTasks.has(task.id));
  const dueThisWeek = openTasks.filter((task) => task.due - new Date() < 7 * 86400000).length;
  const next = getUpcomingSessions()[0];
  const stats = [
    { icon: STAT_ICONS.plan, label: t('dash_stat_plan'), value: percent(Math.round((done / MILESTONES.length) * 100)), note: t('dash_stat_plan_note', { done, total: MILESTONES.length }) },
    { icon: STAT_ICONS.mentor, label: t('dash_stat_sessions'), value: getPastSessions().length, note: next ? t('dash_stat_sessions_note', { date: shortDay(next.start) }) : t('dash_stat_sessions_none') },
    { icon: STAT_ICONS.tasks, label: t('dash_stat_tasks'), value: openTasks.length, note: t('dash_stat_tasks_note', { n: dueThisWeek }) },
    { icon: STAT_ICONS.workshop, label: t('dash_stat_workshops'), value: WORKSHOPS_ATTENDED, note: t('dash_stat_workshops_note', { date: shortDay(events[0].date) }) },
  ];
  document.getElementById('dash-stats').innerHTML = stats.map((s) => `
    <div class="stat-card">
      <span class="stat-icon">${s.icon}</span>
      <div class="stat-body">
        <span class="stat-label">${s.label}</span>
        <span class="stat-value">${s.value}</span>
        <span class="stat-note">${s.note}</span>
      </div>
    </div>`).join('');
}

function renderMilestones() {
  const done = MILESTONES.filter((m) => m.status === 'done').length;
  const pct = Math.round((done / MILESTONES.length) * 100);
  document.getElementById('plan-progress-label').textContent = t('dash_plan_progress', { done, total: MILESTONES.length });
  document.getElementById('plan-progress-pct').textContent = percent(pct);
  document.getElementById('plan-progress-fill').style.width = `${pct}%`;

  document.getElementById('milestones').innerHTML = MILESTONES.map((m) => {
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
  const doneTasks = getDoneTasks();
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
  const card = document.getElementById('next-session');
  const s = getUpcomingSessions()[0];
  if (!s) {
    card.innerHTML = `
      <span class="kicker kicker-light">${t('dash_session_kicker')}</span>
      <p class="session-date">${t('dash_no_session')}</p>
      <div class="session-actions"><a href="book-session.html" class="btn-primary">${t('dash_book_session')}</a></div>`;
    return;
  }
  const mentor = mentorById(s.mentorId);
  card.innerHTML = `
    <div class="session-top">
      <span class="kicker kicker-light">${t('dash_session_kicker')}</span>
      <span class="session-countdown">${capitalize(relativeDay(s.start))}</span>
    </div>
    <div class="session-date">${longDay(s.start)}</div>
    <div class="session-meta">
      <span>${ICONS.clock}${timeOf(s.start)} – ${timeOf(sessionEnd(s))}</span>
      <span>${s.format === 'video' ? ICONS.video : ICONS.pin}${t(`format_${s.format}`)}</span>
      <span>${ICONS.topic}${t('dash_session_topic', { topic: t(s.topic) })}</span>
    </div>
    <div class="session-mentor">
      <span class="user-avatar">${mentor.initials}</span>
      <div><strong>${mentor.name}</strong><small>${t(mentor.titleKey)}</small></div>
    </div>
    <div class="session-actions">
      <a href="mentorship.html" class="btn-primary">${t('dash_join')}</a>
      <a href="book-session.html?reschedule=${encodeURIComponent(s.id)}" class="btn-outline-light">${t('dash_reschedule')}</a>
    </div>`;
}

function renderEvents() {
  document.getElementById('events').innerHTML = events.map((ev) => {
    const place = ev.place.startsWith('dash_') ? t(ev.place) : ev.place;
    return `
      <li class="event">
        <span class="event-date">
          <span class="event-day">${ev.date.getDate()}</span>
          <span class="event-month">${monthShort(ev.date)}</span>
        </span>
        <div class="event-body">
          <span class="event-title">${t(ev.key)}</span>
          <span class="event-meta">${capitalize(formatDate(ev.date, { weekday: 'long' }))} · ${timeOf(ev.date)} · ${place}</span>
        </div>
      </li>`;
  }).join('');
}

function renderDocuments() {
  // Documents waiting for a signature first, then the most recent activity (edit or signature)
  const lastActivity = (d) => d.signedOn || d.updated;
  const docs = getDocuments().sort((a, b) => lastActivity(b) - lastActivity(a));
  const shown = [...docs.filter((d) => d.toSign), ...docs.filter((d) => !d.toSign)].slice(0, 3);
  document.getElementById('documents').innerHTML = shown.map((doc) => {
    const type = fileType(doc.name);
    const meta = doc.toSign ? t('dash_doc_to_sign')
      : doc.signedOn ? t('dash_doc_signed', { when: relativeDay(doc.signedOn) })
      : t('dash_doc_updated', { when: relativeDay(doc.updated) });
    const pill = doc.toSign ? `<span class="pill pill-sign">${t('dash_to_sign')}</span>`
      : doc.signedOn ? `<span class="pill pill-done">${t('dash_signed')}</span>` : '';
    return `
    <li class="document">
      <span class="doc-icon ${type}">${type === 'other' ? 'DOC' : type.toUpperCase()}</span>
      <div class="doc-body">
        <span class="doc-name">${escapeHtml(doc.name)}</span>
        <span class="doc-meta">${meta}</span>
      </div>
      ${pill}
    </li>`;
  }).join('');
}

function render() {
  renderWelcome();
  renderStats();
  renderMilestones();
  renderTasks();
  renderSession();
  renderEvents();
  renderDocuments();
}

function setup() {
  // Tick / untick tasks
  document.getElementById('tasks').addEventListener('change', (e) => {
    if (!e.target.matches('input[data-task]')) return;
    setTaskDone(e.target.dataset.task, e.target.checked);
    renderTasks();
    renderStats();
  });
}

initAppPage({ page: 'dashboard', render, setup });