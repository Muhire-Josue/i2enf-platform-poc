// admin.js — staff "Vue d'ensemble": the operations home page.
// Live counts and an action queue built from what happens on the other pages
// (landing page form, application decisions, pairings, signatures, mentor notes, events).
// It updates on its own when another browser tab changes the data.
// Header and helpers come from shared/app.js, the staff menu from shared/staff.js.

Object.assign(translations.fr, {
  ad_hello: "Bonjour, {name}",
  ad_intro: "Vue d'ensemble du programme · Cohorte {season} {year} · Semaine {week} sur {total}",
  ad_stat_review: "Candidatures à examiner",
  ad_stat_review_note: "Cohorte Hiver 2027",
  ad_stat_match: "À jumeler",
  ad_stat_match_note: "Entrepreneurs sans mentor",
  ad_stat_risk: "Participants à risque",
  ad_stat_risk_note: "{n} autres à surveiller",
  ad_stat_risk_note_one: "1 autre à surveiller",
  ad_stat_event: "Prochain événement",
  ad_stat_event_note: "{title}",
  ad_todo_title: "À traiter",
  ad_todo_count: "{n} éléments",
  ad_todo_none: "Tout est à jour. Rien à traiter pour le moment.",
  ad_todo_review: "{n} nouvelles candidatures à examiner",
  ad_todo_review_one: "1 nouvelle candidature à examiner",
  ad_todo_review_sub: "La plus récente : {name}, {when}",
  ad_todo_match: "{n} entrepreneurs à jumeler avec un mentor",
  ad_todo_match_one: "1 entrepreneur à jumeler avec un mentor",
  ad_todo_match_sub: "Dont {name}",
  ad_todo_risk: "{n} participants à risque",
  ad_todo_risk_sub: "{names} · aucune séance depuis plus de 2 semaines",
  ad_todo_agreement: "Entente de participation non signée",
  ad_todo_agreement_sub: "Amélie Fortin · à signer avant le début du programme",
  ad_todo_notes: "Notes de rencontre en retard",
  ad_todo_notes_sub: "Karim Diallo · séance avec Samuel Ouellet, {when}",
  ad_todo_event: "Séance d'information : {n} inscrits sur {max}",
  ad_todo_event_sub: "{date} · relancer les candidats potentiels",
  ad_open: "Ouvrir",
  ad_review: "Examiner",
  ad_match: "Jumeler",
  ad_follow: "Suivre",
  ad_activity_title: "Activité récente",
  ad_live: "En direct",
  role_entrepreneur: "Entrepreneur",
  role_mentor: "Mentor",
  role_staff: "Personnel",
  role_public: "Site Web",
  act_new_application: "Nouvelle candidature reçue : {name}",
  act_decision_accepted: "Candidature acceptée : {name}",
  act_decision_review: "Candidature mise en évaluation : {name}",
  act_decision_declined: "Candidature refusée : {name}",
  act_matched: "{person} jumelé avec {mentor}",
  act_signed: "Amélie Fortin a signé son entente de participation",
  act_notes: "Karim Diallo a partagé ses notes de rencontre avec Samuel Ouellet",
  act_event: "Événement publié : {title}",
  act_milestone: "Marc-André Pelletier a complété le jalon « Enregistrement et TVH »",
  act_session: "Séance de mentorat complétée : Karim Diallo et Isabelle Côté",
  act_workshop: "Atelier « Du concept au modèle d'affaires » : 13 présents sur 16",
  ad_week_title: "Cette semaine",
  ad_week_link: "Calendrier →",
  ad_week_registered: "{n} inscrits sur {max}",
  ad_week_sessions: "{n} séances de mentorat prévues",
  ad_week_sessions_sub: "Avec {mentors} mentors actifs",
  ad_week_none: "Aucun événement dans les 7 prochains jours.",
  ad_cohort_title: "La cohorte en bref",
  ad_cohort_link: "Indicateurs →",
  ad_m_participants: "Participants actifs",
  ad_m_progress: "Progression moyenne des plans",
  ad_m_attendance: "Présence aux ateliers",
  ad_m_hours: "Heures de mentorat (cible : {n} h)",
  sch_ev_tax: "Atelier : la fiscalité canadienne pour les PME",
  sch_ev_info: "Séance d'information — Cohorte Hiver 2027",
  sch_ev_network: "Soirée de réseautage de la cohorte",
});

Object.assign(translations.en, {
  ad_hello: "Hello, {name}",
  ad_intro: "Program overview · {season} {year} cohort · Week {week} of {total}",
  ad_stat_review: "Applications to review",
  ad_stat_review_note: "Winter 2027 cohort",
  ad_stat_match: "To match",
  ad_stat_match_note: "Entrepreneurs without a mentor",
  ad_stat_risk: "Participants at risk",
  ad_stat_risk_note: "{n} more to watch",
  ad_stat_risk_note_one: "1 more to watch",
  ad_stat_event: "Next event",
  ad_stat_event_note: "{title}",
  ad_todo_title: "To handle",
  ad_todo_count: "{n} items",
  ad_todo_none: "All caught up. Nothing to handle right now.",
  ad_todo_review: "{n} new applications to review",
  ad_todo_review_one: "1 new application to review",
  ad_todo_review_sub: "Most recent: {name}, {when}",
  ad_todo_match: "{n} entrepreneurs to match with a mentor",
  ad_todo_match_one: "1 entrepreneur to match with a mentor",
  ad_todo_match_sub: "Including {name}",
  ad_todo_risk: "{n} participants at risk",
  ad_todo_risk_sub: "{names} · no session in over 2 weeks",
  ad_todo_agreement: "Participation agreement not signed",
  ad_todo_agreement_sub: "Amélie Fortin · to sign before the program starts",
  ad_todo_notes: "Overdue meeting notes",
  ad_todo_notes_sub: "Karim Diallo · session with Samuel Ouellet, {when}",
  ad_todo_event: "Information session: {n} registered of {max}",
  ad_todo_event_sub: "{date} · follow up with prospective applicants",
  ad_open: "Open",
  ad_review: "Review",
  ad_match: "Match",
  ad_follow: "Follow up",
  ad_activity_title: "Recent activity",
  ad_live: "Live",
  role_entrepreneur: "Entrepreneur",
  role_mentor: "Mentor",
  role_staff: "Staff",
  role_public: "Website",
  act_new_application: "New application received: {name}",
  act_decision_accepted: "Application accepted: {name}",
  act_decision_review: "Application moved to review: {name}",
  act_decision_declined: "Application declined: {name}",
  act_matched: "{person} matched with {mentor}",
  act_signed: "Amélie Fortin signed her participation agreement",
  act_notes: "Karim Diallo shared his meeting notes with Samuel Ouellet",
  act_event: "Event published: {title}",
  act_milestone: "Marc-André Pelletier completed the \"Registration and HST\" milestone",
  act_session: "Mentoring session completed: Karim Diallo and Isabelle Côté",
  act_workshop: "\"From concept to business model\" workshop: 13 attended of 16",
  ad_week_title: "This week",
  ad_week_link: "Calendar →",
  ad_week_registered: "{n} registered of {max}",
  ad_week_sessions: "{n} mentoring sessions scheduled",
  ad_week_sessions_sub: "With {mentors} active mentors",
  ad_week_none: "No events in the next 7 days.",
  ad_cohort_title: "The cohort at a glance",
  ad_cohort_link: "Indicators →",
  ad_m_participants: "Active participants",
  ad_m_progress: "Average plan progress",
  ad_m_attendance: "Workshop attendance",
  ad_m_hours: "Mentoring hours (target: {n} h)",
  sch_ev_tax: "Workshop: Canadian taxation for small businesses",
  sch_ev_info: "Information session — Winter 2027 cohort",
  sch_ev_network: "Cohort networking evening",
});

// ---- Shared data written by the other pages (read-only here) ----
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };
const reviews = () => read('i2enf_app_reviews', {});
const matches = () => read('i2enf_matches', {});
const agreementSigned = () => Boolean(read('i2enf_signed_entrepreneur@demo.ca', {}).d3);
const signedOn = () => read('i2enf_signed_entrepreneur@demo.ca', {}).d3;
const mentorNotes = () => read('i2enf_mentor_notes_mentor@demo.ca', []);
const createdEvents = () => read('i2enf_events', []);
const cancelledEvents = () => new Set(read('i2enf_events_cancelled', []));

// Names used on the Candidatures and Jumelage pages
const DEMO_APPS = { demo1: 'Mariam Haddad', demo2: 'Thomas Lefebvre', demo3: 'Louis-Philippe Gagné', demo4: 'Aïcha Traoré', demo5: 'Julien Bélanger', demo6: 'Sofia Morales' };
const DEMO_NEW = ['demo1', 'demo2', 'demo3']; // demo applications that start as "new"
const DEMO_APP_DAYS = { demo1: -1, demo2: -2, demo3: -4 };
const MATCH_PEOPLE = { jb: { name: 'Julien Bélanger', app: 'demo5' }, yb: { name: 'Yasmine Benali' }, og: { name: 'Olivier Gagnon' } };
const MENTOR_NAMES = { kd: 'Karim Diallo', nb: 'Nadia Belkacem', lt: 'Luc Tremblay', gp: 'Geneviève Proulx', ra: 'Rachid Amrani' };
const AT_RISK = ['Nour El-Amine', 'Kevin Mbuyi']; // from the case files page

// Upcoming events (same as the events page)
function events() {
  const cancelled = cancelledEvents();
  const base = [
    { id: 'e1', titleKey: 'sch_ev_tax', start: weekdayFromNow(4, 18, 0), capacity: 20, registered: 14 },
    { id: 'e2', titleKey: 'sch_ev_info', start: weekdayFromNow(6, 12, 0), capacity: 50, registered: 23 },
    { id: 'e3', titleKey: 'sch_ev_network', start: weekdayFromNow(11, 17, 30), capacity: 40, registered: 18 },
  ];
  const created = createdEvents().map((e) => ({ ...e, start: new Date(e.start) }));
  return [...base, ...created].filter((e) => !cancelled.has(e.id) && e.start > new Date()).sort((a, b) => a.start - b.start);
}
const eventTitle = (e) => (e.titleKey ? t(e.titleKey) : e.title);

// Applications still waiting for a first look
function applicationsToReview() {
  const r = reviews();
  const site = getApplications().map((a) => ({ id: a.id, name: a.nom, date: new Date(a.submittedAt) }));
  const demo = DEMO_NEW.map((id) => ({ id, name: DEMO_APPS[id], date: daysFromNow(DEMO_APP_DAYS[id], 10, 15) }));
  return [...site, ...demo].filter((a) => !r[a.id]).sort((a, b) => b.date - a.date);
}

// Accepted entrepreneurs without a mentor
function peopleToMatch() {
  const r = reviews();
  const m = matches();
  const demo = Object.entries(MATCH_PEOPLE)
    .filter(([, p]) => !p.app || !r[p.app] || r[p.app].status === 'accepted')
    .map(([id, p]) => ({ id, name: p.name }));
  const site = getApplications().filter((a) => r[a.id] && r[a.id].status === 'accepted').map((a) => ({ id: a.id, name: a.nom }));
  return [...site, ...demo].filter((p) => !m[p.id]);
}

const notesPending = () => !mentorNotes().some((n) => n.id === 'pn1');

// Mentor notes don't record when they were shared, so remember when they first appeared
function notesSharedOn() {
  const key = 'i2enf_notes_first_seen';
  if (!localStorage.getItem(key)) localStorage.setItem(key, new Date().toISOString());
  return new Date(localStorage.getItem(key));
}

// ---- Icons ----
const AD_ICONS = {
  inbox: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/></svg>',
  pair: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20v-1a5 5 0 015-5h1M22 20v-1a5 5 0 00-5-5h-1"/></svg>',
  alert: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></svg>',
  calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  pen: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>',
  notes: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
  flag: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></svg>',
  check: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>',
};

const dateBlock = (d) => `<span class="event-date"><span class="event-day">${d.getDate()}</span><span class="event-month">${monthShort(d)}</span></span>`;

// ---- Rendering ----
function renderHead() {
  document.getElementById('ad-week-link').href = pageUrl('scheduling');
  document.getElementById('ad-cohort-link').href = pageUrl('kpi');
  document.getElementById('ad-hello').textContent = t('ad_hello', { name: APP_SESSION.prenom || '' });
  document.getElementById('ad-intro').textContent = cohortLabel('ad_intro');
}

function renderStats() {
  const toReview = applicationsToReview().length;
  const toMatch = peopleToMatch().length;
  const watch = 1 + (agreementSigned() ? 0 : 1); // Fatou (late milestone) + Amélie while unsigned
  const next = events()[0];
  const stats = [
    { href: pageUrl('applications'), icon: AD_ICONS.inbox, label: t('ad_stat_review'), value: toReview, note: t('ad_stat_review_note'), cls: toReview ? 'is-alert' : '' },
    { href: pageUrl('matching'), icon: AD_ICONS.pair, label: t('ad_stat_match'), value: toMatch, note: t('ad_stat_match_note'), cls: toMatch ? 'is-alert' : '' },
    { href: pageUrl('cases'), icon: AD_ICONS.alert, label: t('ad_stat_risk'), value: AT_RISK.length, note: watch === 1 ? t('ad_stat_risk_note_one') : t('ad_stat_risk_note', { n: watch }), cls: 'is-risk' },
    { href: pageUrl('scheduling'), icon: AD_ICONS.calendar, label: t('ad_stat_event'), value: next ? shortDay(next.start) : '—', note: next ? eventTitle(next) : '' },
  ];
  document.getElementById('ad-stats').innerHTML = stats.map((s) => `
    <a href="${s.href}" class="ad-stat ${s.cls || ''}">
      <span class="ad-stat-icon">${s.icon}</span>
      <span class="ad-stat-body">
        <span class="ad-stat-label">${s.label}</span>
        <span class="ad-stat-value">${escapeHtml(s.value)}</span>
        <span class="ad-stat-note">${escapeHtml(s.note)}</span>
      </span>
    </a>`).join('');
}

function todoItems() {
  const items = [];
  const apps = applicationsToReview();
  if (apps.length) items.push({ level: 'high', icon: AD_ICONS.inbox, href: pageUrl('applications'), action: 'ad_review',
    title: apps.length === 1 ? t('ad_todo_review_one') : t('ad_todo_review', { n: apps.length }),
    sub: t('ad_todo_review_sub', { name: escapeHtml(apps[0].name), when: relativeDay(apps[0].date) }) });
  items.push({ level: 'urgent', icon: AD_ICONS.alert, href: pageUrl('cases'), action: 'ad_follow',
    title: t('ad_todo_risk', { n: AT_RISK.length }), sub: t('ad_todo_risk_sub', { names: AT_RISK.join(', ') }) });
  const people = peopleToMatch();
  if (people.length) items.push({ level: 'high', icon: AD_ICONS.pair, href: pageUrl('matching'), action: 'ad_match',
    title: people.length === 1 ? t('ad_todo_match_one') : t('ad_todo_match', { n: people.length }),
    sub: t('ad_todo_match_sub', { name: escapeHtml(people[0].name) }) });
  if (!agreementSigned()) items.push({ level: 'normal', icon: AD_ICONS.pen, href: pageUrl('cases'), action: 'ad_open',
    title: t('ad_todo_agreement'), sub: t('ad_todo_agreement_sub') });
  if (notesPending()) items.push({ level: 'normal', icon: AD_ICONS.notes, href: pageUrl('cases'), action: 'ad_open',
    title: t('ad_todo_notes'), sub: t('ad_todo_notes_sub', { when: relativeDay(daysFromNow(-2)) }) });
  const info = events().find((e) => e.id === 'e2');
  if (info && info.registered / info.capacity < 0.6) items.push({ level: 'normal', icon: AD_ICONS.calendar, href: pageUrl('scheduling'), action: 'ad_open',
    title: t('ad_todo_event', { n: info.registered, max: info.capacity }), sub: t('ad_todo_event_sub', { date: longDay(info.start) }) });
  return items;
}

function renderTodo() {
  const items = todoItems();
  document.getElementById('ad-todo-count').textContent = t('ad_todo_count', { n: items.length });
  document.getElementById('ad-todo').innerHTML = items.length
    ? items.map((i) => `
      <li class="ad-todo-item is-${i.level}">
        <span class="ad-todo-icon">${i.icon}</span>
        <span class="ad-todo-text"><strong>${i.title}</strong><small>${i.sub}</small></span>
        <a href="${i.href}" class="${i.level === 'urgent' ? 'btn-primary' : 'btn-outline'} btn-sm">${t(i.action)}</a>
      </li>`).join('')
    : `<li class="ad-empty">${AD_ICONS.check}${t('ad_todo_none')}</li>`;
}

// Everything that happened, newest first: live actions from the other pages + demo history
function activity() {
  const list = [];
  getApplications().forEach((a) => list.push({ date: new Date(a.submittedAt), role: 'public', icon: AD_ICONS.inbox, text: t('act_new_application', { name: escapeHtml(a.nom) }) }));
  const siteNames = Object.fromEntries(getApplications().map((a) => [a.id, a.nom]));
  Object.entries(reviews()).forEach(([id, r]) => {
    const name = DEMO_APPS[id] || siteNames[id];
    if (name && r.updated) list.push({ date: new Date(r.updated), role: 'staff', icon: AD_ICONS.check, text: t(`act_decision_${r.status}`, { name: escapeHtml(name) }) });
  });
  Object.entries(matches()).forEach(([id, m]) => {
    const person = (MATCH_PEOPLE[id] && MATCH_PEOPLE[id].name) || siteNames[id];
    if (person) list.push({ date: new Date(m.date), role: 'staff', icon: AD_ICONS.pair, text: t('act_matched', { person: escapeHtml(person), mentor: MENTOR_NAMES[m.mentorId] || '' }) });
  });
  if (agreementSigned()) list.push({ date: new Date(signedOn()), role: 'entrepreneur', icon: AD_ICONS.pen, text: t('act_signed') });
  const note = mentorNotes().find((n) => n.id === 'pn1');
  if (note) list.push({ date: notesSharedOn(), role: 'mentor', icon: AD_ICONS.notes, text: t('act_notes') });
  createdEvents().forEach((e) => list.push({ date: new Date(Number(String(e.id).split('_')[1]) || Date.now()), role: 'staff', icon: AD_ICONS.calendar, text: t('act_event', { title: escapeHtml(e.title) }) }));
  // Demo history so the feed is never empty
  list.push({ date: daysFromNow(-1, 15, 20), role: 'entrepreneur', icon: AD_ICONS.flag, text: t('act_milestone') });
  list.push({ date: daysFromNow(-4, 11, 0), role: 'mentor', icon: AD_ICONS.pair, text: t('act_session') });
  list.push({ date: daysFromNow(-8, 19, 40), role: 'staff', icon: AD_ICONS.calendar, text: t('act_workshop') });
  return list.sort((a, b) => b.date - a.date).slice(0, 7);
}

let seenFeed = null;
function renderFeed() {
  const items = activity();
  const keys = items.map((i) => i.text + i.date.getTime());
  document.getElementById('ad-feed').innerHTML = items.map((i, idx) => `
    <li class="${seenFeed && !seenFeed.has(keys[idx]) ? 'is-new' : ''}">
      <span class="ad-feed-icon">${i.icon}</span>
      <span class="ad-feed-text">
        <span>${i.text}<span class="ad-feed-role">${t(`role_${i.role}`)}</span></span>
        <small>${capitalize(relativeDay(i.date))} · ${timeOf(i.date)}</small>
      </span>
    </li>`).join('');
  seenFeed = new Set(keys);
}

function renderWeek() {
  const weekEnd = daysFromNow(7, 23, 59);
  const soon = events().filter((e) => e.start <= weekEnd);
  const rows = soon.map((e) => `
    <li>${dateBlock(e.start)}
      <span class="ad-week-body">
        <strong>${escapeHtml(eventTitle(e))}</strong>
        <small>${capitalize(formatDate(e.start, { weekday: 'long' }))} · ${timeOf(e.start)} · ${t('ad_week_registered', { n: e.registered, max: e.capacity })}</small>
        <span class="progress-track"><span class="progress-fill" style="display:block;width:${Math.min(100, Math.round((e.registered / e.capacity) * 100))}%"></span></span>
      </span>
    </li>`);
  rows.push(`
    <li><span class="event-date ad-icon-block">${ICONS.mentor}</span>
      <span class="ad-week-body"><strong>${t('ad_week_sessions', { n: 6 })}</strong><small>${t('ad_week_sessions_sub', { mentors: 3 })}</small></span>
    </li>`);
  document.getElementById('ad-week').innerHTML = soon.length ? rows.join('') : `<li><small>${t('ad_week_none')}</small></li>${rows.pop()}`;
}

function renderMetrics() {
  const metrics = [
    ['ad_m_participants', '8', 100],
    ['ad_m_progress', percent(43), 43],
    ['ad_m_attendance', percent(84), 84],
    [t('ad_m_hours', { n: 60 }), '31 h', Math.round((31 / 60) * 100)],
  ];
  document.getElementById('ad-metrics').innerHTML = metrics.map(([label, value, pct]) => `
    <li>
      <span class="ad-metric-top"><span>${label.startsWith('ad_') ? t(label) : label}</span><strong>${value}</strong></span>
      <span class="progress-track"><span class="progress-fill" style="display:block;width:${pct}%"></span></span>
    </li>`).join('');
}

function render() {
  renderHead();
  renderStats();
  renderTodo();
  renderFeed();
  renderWeek();
  renderMetrics();
}

function setup() {
  // Another tab changed the data (a form sent, a signature, a pairing...): refresh right away
  window.addEventListener('storage', (e) => {
    if (e.key && e.key.startsWith('i2enf_') && e.key !== 'i2enf_lang') render();
  });
}

initAppPage({ page: 'admin', role: 'staff', render, setup });