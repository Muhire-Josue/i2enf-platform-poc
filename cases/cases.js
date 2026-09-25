// cases.js — staff "Dossiers": follow-up of every entrepreneur in the current cohort,
// with status flags, filters, search and a case file (activity, follow-up notes, reminder).
// Header and helpers come from shared/app.js, the staff menu from shared/staff.js.

Object.assign(translations.fr, {
  cases_title: "Dossiers des entrepreneurs",
  cases_intro: "Cohorte {season} {year} · Semaine {week} sur {total} · {n} participants",
  cases_stat_active: "Participants actifs",
  cases_stat_active_note: "Cohorte en cours",
  cases_stat_risk: "À risque",
  cases_stat_risk_note: "Intervention recommandée",
  cases_stat_watch: "À surveiller",
  cases_stat_watch_note: "Un point d'attention",
  cases_stat_progress: "Progression moyenne",
  cases_stat_progress_note: "Des plans de parcours",
  cases_all: "Tous",
  follow_ok: "En bonne voie",
  follow_watch: "À surveiller",
  follow_risk: "À risque",
  cases_search: "Nom ou entreprise",
  cases_col_entrepreneur: "Entrepreneur",
  cases_col_mentor: "Mentor",
  cases_col_progress: "Plan de parcours",
  cases_col_status: "Suivi",
  cases_open: "Ouvrir le dossier",
  cases_empty: "Aucun dossier ne correspond à votre recherche.",
  cases_last_activity: "Dernière activité {when}",
  cases_close: "Fermer",
  cases_fact_mentor: "Mentor",
  cases_fact_stage: "Stade",
  cases_fact_score: "Diagnostic",
  cases_fact_plan: "Plan",
  cases_contact: "Coordonnées",
  cases_flags: "Points d'attention",
  cases_no_flags: "Aucun point d'attention. Le parcours avance comme prévu.",
  flag_agreement: "Entente de participation non signée",
  flag_no_session: "Aucune séance de mentorat depuis {n} jours",
  flag_no_login: "Aucune connexion à la plateforme depuis {n} jours",
  flag_milestone_late: "Jalon en retard : {name}",
  cases_activity: "Activité récente",
  act_session: "Séance de mentorat avec {name}",
  act_document: "Document ajouté : {name}",
  act_milestone: "Jalon complété : {name}",
  act_signed: "Entente de participation signée",
  act_diagnostic: "Diagnostic initial complété",
  cases_notes: "Notes de suivi",
  cases_no_notes: "Aucune note pour le moment.",
  cases_note_label: "Nouvelle note",
  cases_note_ph: "Appel, courriel, rencontre… Visible seulement par l'équipe SOFIFRAN",
  cases_note_by: "{name} · {when}",
  cases_err_note: "Rédigez une note d'au moins 10 caractères.",
  cases_note_saved: "Note ajoutée au dossier.",
  cases_remind: "Envoyer un rappel",
  cases_add_note: "Ajouter la note",
  cases_reminder_title: "Rappel envoyé",
  cases_reminder_body: "L'entrepreneur a reçu un courriel avec les points d'attention de son dossier.",
  stage_ideation: "Idéation", stage_validation: "Validation", stage_startup: "Démarrage", stage_growth: "Croissance",
});

Object.assign(translations.en, {
  cases_title: "Entrepreneur case files",
  cases_intro: "{season} {year} cohort · Week {week} of {total} · {n} participants",
  cases_stat_active: "Active participants",
  cases_stat_active_note: "Current cohort",
  cases_stat_risk: "At risk",
  cases_stat_risk_note: "Follow-up recommended",
  cases_stat_watch: "To watch",
  cases_stat_watch_note: "One point of attention",
  cases_stat_progress: "Average progress",
  cases_stat_progress_note: "Across journey plans",
  cases_all: "All",
  follow_ok: "On track",
  follow_watch: "To watch",
  follow_risk: "At risk",
  cases_search: "Name or business",
  cases_col_entrepreneur: "Entrepreneur",
  cases_col_mentor: "Mentor",
  cases_col_progress: "Journey plan",
  cases_col_status: "Follow-up",
  cases_open: "Open case file",
  cases_empty: "No case files match your search.",
  cases_last_activity: "Last activity {when}",
  cases_close: "Close",
  cases_fact_mentor: "Mentor",
  cases_fact_stage: "Stage",
  cases_fact_score: "Diagnostic",
  cases_fact_plan: "Plan",
  cases_contact: "Contact",
  cases_flags: "Points of attention",
  cases_no_flags: "No points of attention. The journey is on track.",
  flag_agreement: "Participation agreement not signed",
  flag_no_session: "No mentoring session in {n} days",
  flag_no_login: "No sign-in to the platform in {n} days",
  flag_milestone_late: "Milestone overdue: {name}",
  cases_activity: "Recent activity",
  act_session: "Mentoring session with {name}",
  act_document: "Document added: {name}",
  act_milestone: "Milestone completed: {name}",
  act_signed: "Participation agreement signed",
  act_diagnostic: "Initial diagnostic completed",
  cases_notes: "Follow-up notes",
  cases_no_notes: "No notes yet.",
  cases_note_label: "New note",
  cases_note_ph: "Call, email, meeting… Visible to the SOFIFRAN team only",
  cases_note_by: "{name} · {when}",
  cases_err_note: "Write a note of at least 10 characters.",
  cases_note_saved: "Note added to the case file.",
  cases_remind: "Send a reminder",
  cases_add_note: "Add the note",
  cases_reminder_title: "Reminder sent",
  cases_reminder_body: "The entrepreneur received an email with the points of attention in their file.",
  stage_ideation: "Ideation", stage_validation: "Validation", stage_startup: "Startup", stage_growth: "Growth",
});

// ---- Demo data (would come from the platform's database) ----
// Same people as the other pages: Amélie, Samuel and Fatou are Karim Diallo's mentees.
const CASES = [
  { id: 'af', name: 'Amélie Fortin', email: 'entrepreneur@demo.ca', phone: '613-555-0171', business: 'La Mie Dorée', mentorId: 'kd', stage: 'startup', score: 57, progress: 43, lastDays: -2,
    // Live link: this flag clears when Amélie signs the agreement in her business file
    liveAgreement: true,
    activity: [['document', -2, "Plan d'affaires — v2.pdf"], ['session', -13, 'Karim Diallo'], ['milestone', -4, 'Étude de marché locale'], ['diagnostic', -24]] },
  { id: 'so', name: 'Samuel Ouellet', email: 'samuel.ouellet@exemple.ca', phone: '613-555-0182', business: 'Cyclo Ouellet', mentorId: 'kd', stage: 'validation', score: 48, progress: 29, lastDays: -2,
    flags: [], activity: [['session', -2, 'Karim Diallo'], ['milestone', -9, 'Définir la proposition de valeur'], ['signed', -20]] },
  { id: 'fn', name: 'Fatou Ndiaye', email: 'fatou.ndiaye@exemple.ca', phone: '613-555-0193', business: 'Saveurs du Sahel', mentorId: 'kd', stage: 'ideation', score: 38, progress: 14, lastDays: -9,
    flags: [['flag_milestone_late', { name: 'Définir la proposition de valeur' }]], activity: [['session', -9, 'Karim Diallo'], ['signed', -21], ['diagnostic', -23]] },
  { id: 'mp', name: 'Marc-André Pelletier', email: 'ma.pelletier@exemple.ca', phone: '613-555-0124', business: 'Menuiserie Pelletier', mentorId: 'lt', stage: 'growth', score: 72, progress: 71, lastDays: -1,
    flags: [], activity: [['milestone', -1, 'Enregistrement et TVH'], ['session', -5, 'Luc Tremblay'], ['document', -6, 'Bilan 2025.pdf']] },
  { id: 'ne', name: 'Nour El-Amine', email: 'nour.elamine@exemple.ca', phone: '613-555-0135', business: 'Studio Nour', mentorId: 'nb', stage: 'startup', score: 52, progress: 43, lastDays: -23,
    flags: [['flag_no_session', { n: 23 }], ['flag_no_login', { n: 19 }]], activity: [['session', -23, 'Nadia Belkacem'], ['document', -24, 'Portfolio.pdf'], ['signed', -25]] },
  { id: 'ic', name: 'Isabelle Côté', email: 'isabelle.cote@exemple.ca', phone: '613-555-0146', business: 'Côté Comptabilité', mentorId: 'kd', stage: 'validation', score: 61, progress: 57, lastDays: -4,
    flags: [], activity: [['session', -4, 'Karim Diallo'], ['milestone', -7, 'Étude de marché locale'], ['signed', -22]] },
  { id: 'km', name: 'Kevin Mbuyi', email: 'kevin.mbuyi@exemple.ca', phone: '613-555-0157', business: 'Mbuyi Transport', mentorId: 'lt', stage: 'startup', score: 44, progress: 29, lastDays: -16,
    flags: [['flag_no_session', { n: 16 }], ['flag_milestone_late', { name: 'Plan financier sur 12 mois' }]], activity: [['session', -16, 'Luc Tremblay'], ['document', -18, 'Soumission camion.pdf'], ['signed', -24]] },
  { id: 'er', name: 'Émilie Rousseau', email: 'emilie.rousseau@exemple.ca', phone: '613-555-0168', business: 'Ferme Rousseau', mentorId: 'nb', stage: 'growth', score: 68, progress: 57, lastDays: -6,
    flags: [], activity: [['session', -6, 'Nadia Belkacem'], ['milestone', -8, 'Plan financier sur 12 mois'], ['document', -10, 'Plan marketing.pdf']] },
];

// Has Amélie signed her agreement? (saved by her business file page, keyed by her email)
const agreementSigned = () => {
  try { return Boolean(JSON.parse(localStorage.getItem('i2enf_signed_entrepreneur@demo.ca') || '{}').d3); } catch { return false; }
};

function getCases() {
  return CASES.map((c) => {
    let flags = c.flags || [];
    let activity = c.activity;
    if (c.liveAgreement) {
      if (agreementSigned()) activity = [['signed', 0], ...activity];
      else flags = [['flag_agreement', {}]];
    }
    const status = flags.length >= 2 || flags.some(([k]) => k === 'flag_no_session') ? 'risk' : flags.length ? 'watch' : 'ok';
    const lastDays = c.liveAgreement && agreementSigned() ? 0 : c.lastDays;
    return { ...c, flags, activity, status, lastDays };
  });
}

// Follow-up notes are shared by the whole staff team
const NOTES_KEY = 'i2enf_case_notes';
const DEMO_NOTES = { ne: [{ by: 'Sophie Lavoie', days: -6, text: "Laissé un message vocal. Nour vit un surplus de contrats et a mis le parcours sur pause quelques semaines." }] };
const getNotes = (id) => {
  const saved = (JSON.parse(localStorage.getItem(NOTES_KEY) || '{}')[id] || []).map((n) => ({ ...n, date: new Date(n.date) }));
  const demo = (DEMO_NOTES[id] || []).map((n) => ({ ...n, date: daysFromNow(n.days, 11, 0) }));
  return [...saved, ...demo];
};
function addNote(id, text) {
  const all = JSON.parse(localStorage.getItem(NOTES_KEY) || '{}');
  const me = findUserByEmail(APP_SESSION.email);
  const author = me && me.nom ? `${me.prenom} ${me.nom}` : APP_SESSION.prenom;
  all[id] = [{ by: author, date: new Date().toISOString(), text }, ...(all[id] || [])];
  localStorage.setItem(NOTES_KEY, JSON.stringify(all));
}

const view = { status: 'all', search: '' };
let openId = null;
const FOLLOW = ['risk', 'watch', 'ok'];
const initials = (name) => name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
const followPill = (status) => `<span class="pill follow-${status}">${t(`follow_${status}`)}</span>`;
const firstFlag = (c) => (c.flags[0] ? t(c.flags[0][0], c.flags[0][1]) : t('cases_last_activity', { when: relativeDay(daysFromNow(c.lastDays)) }));

const ICON = {
  people: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21v-1a7 7 0 0114 0v1"/><path d="M16 3.1a4 4 0 010 7.8M22 21v-1a7 7 0 00-4-6.3"/></svg>',
  alert: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/></svg>',
  eye: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  trend: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg>',
  flag: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 22V4M4 4h13l-2 4 2 4H4"/></svg>',
  ok: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>',
};
const ACT_ICON = { session: ICONS.mentor, document: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>', milestone: ICONS.check, signed: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>', diagnostic: ICONS.diagnostic };

// ---- Rendering ----
function renderIntro() {
  document.getElementById('cases-intro').textContent = cohortLabel('cases_intro').replace('{n}', CASES.length);
}

function renderStats() {
  const cases = getCases();
  const count = (s) => cases.filter((c) => c.status === s).length;
  const avg = Math.round(cases.reduce((sum, c) => sum + c.progress, 0) / cases.length);
  const stats = [
    { icon: ICON.people, label: t('cases_stat_active'), value: cases.length, note: t('cases_stat_active_note') },
    { icon: ICON.alert, label: t('cases_stat_risk'), value: count('risk'), note: t('cases_stat_risk_note'), alert: count('risk') > 0 },
    { icon: ICON.eye, label: t('cases_stat_watch'), value: count('watch'), note: t('cases_stat_watch_note') },
    { icon: ICON.trend, label: t('cases_stat_progress'), value: percent(avg), note: t('cases_stat_progress_note') },
  ];
  document.getElementById('cases-stats').innerHTML = stats.map((s) => `
    <div class="cases-stat ${s.alert ? 'is-alert' : ''}">
      <span class="cases-stat-icon">${s.icon}</span>
      <div class="cases-stat-body">
        <span class="cases-stat-label">${s.label}</span>
        <span class="cases-stat-value">${s.value}</span>
        <span class="cases-stat-note">${s.note}</span>
      </div>
    </div>`).join('');
}

function renderFilters() {
  const cases = getCases();
  document.getElementById('cases-filters').innerHTML = ['all', ...FOLLOW].map((s) => {
    const n = s === 'all' ? cases.length : cases.filter((c) => c.status === s).length;
    return `<button type="button" class="cases-filter" role="tab" aria-selected="${view.status === s}" data-status="${s}">${t(s === 'all' ? 'cases_all' : `follow_${s}`)} <small>${n}</small></button>`;
  }).join('');
}

function renderList() {
  const query = view.search.trim().toLowerCase();
  // Most urgent first: at risk, then to watch, then on track
  const cases = getCases()
    .filter((c) => view.status === 'all' || c.status === view.status)
    .filter((c) => !query || c.name.toLowerCase().includes(query) || c.business.toLowerCase().includes(query))
    .sort((a, b) => FOLLOW.indexOf(a.status) - FOLLOW.indexOf(b.status));
  const list = document.getElementById('cases-list');
  if (!cases.length) { list.innerHTML = `<li class="cases-empty">${t('cases_empty')}</li>`; return; }
  list.innerHTML = cases.map((c) => `
    <li class="case-row">
      <div class="case-person">
        <span class="user-avatar">${initials(c.name)}</span>
        <div class="case-person-text"><strong>${c.name}</strong><small>${c.business} · ${t(`stage_${c.stage}`)}</small></div>
      </div>
      <div class="case-cell"><span class="case-cell-label">${t('cases_col_mentor')}</span>${mentorById(c.mentorId).name}</div>
      <div class="case-cell case-progress"><span class="case-cell-label">${t('cases_col_progress')}</span>${percent(c.progress)}<div class="progress-track"><div class="progress-fill" style="width:${c.progress}%"></div></div></div>
      <div class="case-cell case-status"><span class="case-cell-label">${t('cases_col_status')}</span>${followPill(c.status)}<small>${firstFlag(c)}</small></div>
      <button type="button" class="btn-outline btn-sm" data-open="${c.id}">${t('cases_open')}</button>
    </li>`).join('');
}

function renderCase() {
  const c = getCases().find((x) => x.id === openId);
  const flags = c.flags.length
    ? c.flags.map(([key, vars]) => `<li>${ICON.flag}<span>${t(key, vars)}</span></li>`).join('')
    : `<li class="flag-none">${ICON.ok}<span>${t('cases_no_flags')}</span></li>`;
  const activity = c.activity.map(([type, days, name]) => `
    <li><span>${ACT_ICON[type]}</span><span>${t(`act_${type}`, { name: name || '' })}<small>${capitalize(relativeDay(daysFromNow(days)))}</small></span></li>`).join('');

  document.getElementById('case-body').innerHTML = `
    <div class="case-head">
      <span class="user-avatar">${initials(c.name)}</span>
      <div><h2 id="case-name">${c.name}</h2><small>${c.business}</small></div>
      ${followPill(c.status)}
    </div>
    <dl class="case-facts">
      <div><dt>${t('cases_fact_mentor')}</dt><dd>${mentorById(c.mentorId).name}</dd></div>
      <div><dt>${t('cases_fact_stage')}</dt><dd>${t(`stage_${c.stage}`)}</dd></div>
      <div><dt>${t('cases_fact_score')}</dt><dd>${c.score} / 100</dd></div>
      <div><dt>${t('cases_fact_plan')}</dt><dd>${percent(c.progress)}</dd></div>
    </dl>
    <div class="case-block">
      <h3>${t('cases_contact')}</h3>
      <div class="case-contact"><a href="mailto:${c.email}">${c.email}</a><a href="tel:+1${c.phone.replace(/\D/g, '')}">${c.phone}</a></div>
    </div>
    <div class="case-block"><h3>${t('cases_flags')}</h3><ul class="case-flags">${flags}</ul></div>
    <div class="case-block"><h3>${t('cases_activity')}</h3><ul class="case-activity">${activity}</ul></div>`;

  const notes = getNotes(c.id);
  document.getElementById('case-notes').innerHTML = notes.length
    ? notes.map((n) => `<li><small>${t('cases_note_by', { name: escapeHtml(n.by), when: relativeDay(n.date) })}</small>${escapeHtml(n.text)}</li>`).join('')
    : `<li class="note-empty">${t('cases_no_notes')}</li>`;
}

function render() {
  renderIntro();
  renderStats();
  renderFilters();
  renderList();
  if (openId && document.getElementById('case-dialog').open) renderCase();
}

// ---- Case file actions ----
function caseMessage(id, key) {
  ['case-error', 'case-saved'].forEach((el) => { document.getElementById(el).hidden = true; });
  if (!key) return;
  const box = document.getElementById(id);
  box.textContent = t(key);
  box.hidden = false;
}

function openCase(id) {
  openId = id;
  document.getElementById('case-note').value = '';
  document.getElementById('case-note').classList.remove('field-invalid');
  caseMessage(null);
  renderCase();
  document.getElementById('case-dialog').showModal();
}

function saveNote() {
  const field = document.getElementById('case-note');
  const text = field.value.trim();
  if (text.length < 10) {
    field.classList.add('field-invalid');
    field.focus();
    return caseMessage('case-error', 'cases_err_note');
  }
  addNote(openId, text);
  field.value = '';
  field.classList.remove('field-invalid');
  renderCase();
  caseMessage('case-saved', 'cases_note_saved');
}

function setup() {
  document.getElementById('cases-filters').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-status]');
    if (!chip) return;
    view.status = chip.dataset.status;
    renderFilters();
    renderList();
  });
  document.getElementById('cases-search').addEventListener('input', (e) => { view.search = e.target.value; renderList(); });
  document.getElementById('cases-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (btn) openCase(btn.dataset.open);
  });
  document.getElementById('case-add-note').addEventListener('click', saveNote);
  document.getElementById('case-note').addEventListener('input', (e) => { e.target.classList.remove('field-invalid'); caseMessage(null); });
  document.getElementById('case-remind').addEventListener('click', () => {
    document.getElementById('case-dialog').close();
    showAlert('success', 'cases_reminder_title', ['cases_reminder_body']);
  });
  document.getElementById('case-dialog').addEventListener('close', () => { openId = null; });
}

initAppPage({ page: 'cases', role: 'staff', render, setup });
