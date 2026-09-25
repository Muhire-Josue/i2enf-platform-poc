// applications.js — staff home page: applications received through the website,
// with filters, search, review (eligibility checklist, internal note, decision) and CSV export.
// Header and helpers come from shared/app.js, the staff menu from shared/staff.js,
// and website applications from shared/mock-data.js.

Object.assign(translations.fr, {
  apps_kicker: "Espace personnel",
  apps_title: "Candidatures",
  apps_intro: "Cohorte Hiver 2027 · Date limite : 15 novembre 2026 ({days})",
  apps_days_left: "dans {n} jours",
  apps_closed: "fermée",
  apps_export: "Exporter en CSV",
  apps_stat_total: "Candidatures reçues",
  apps_stat_total_note: "{n} cette semaine",
  apps_stat_new: "À examiner",
  apps_stat_new_note: "Nouvelles candidatures",
  apps_stat_review: "En évaluation",
  apps_stat_review_note: "Entrevue ou vérification",
  apps_stat_accepted: "Acceptées",
  apps_stat_accepted_note: "Invitations envoyées",
  apps_all: "Toutes",
  status_new: "Nouvelle",
  status_review: "En évaluation",
  status_accepted: "Acceptée",
  status_declined: "Refusée",
  apps_search: "Nom ou courriel",
  apps_col_applicant: "Candidat",
  apps_col_stage: "Stade",
  apps_col_received: "Reçue",
  apps_col_status: "Statut",
  apps_from_site: "Site Web",
  apps_new_badge: "Nouveau",
  apps_examine: "Examiner",
  apps_empty: "Aucune candidature ne correspond à votre recherche.",
  apps_close: "Fermer",
  apps_fact_stage: "Stade",
  apps_fact_received: "Reçue le",
  apps_fact_source: "Source",
  apps_source_site: "Formulaire du site",
  apps_source_event: "Séance d'information",
  apps_source_partner: "Référence d'un partenaire",
  apps_project: "Description du projet",
  apps_no_description: "Aucune description fournie.",
  apps_criteria: "Critères d'admissibilité",
  apps_note: "Note interne",
  apps_note_ph: "Visible seulement par l'équipe SOFIFRAN",
  apps_decline: "Refuser",
  apps_to_review: "Mettre en évaluation",
  apps_accept: "Accepter la candidature",
  apps_err_criteria: "Cochez les quatre critères d'admissibilité avant d'accepter.",
  apps_err_reason: "Indiquez la raison du refus dans la note interne.",
  apps_saved_accepted_title: "Candidature acceptée",
  apps_saved_accepted_body: "Un courriel d'invitation a été envoyé pour créer le compte et commencer le diagnostic.",
  apps_saved_review_title: "Candidature en évaluation",
  apps_saved_review_body: "Elle reste dans la liste des candidatures à suivre.",
  apps_saved_declined_title: "Candidature refusée",
  apps_saved_declined_body: "Un courriel expliquant la décision a été envoyé, avec des ressources utiles.",
  apps_export_title: "Export généré",
  apps_export_body: "Le fichier CSV contient les candidatures affichées.",
  apps_csv_name: "Nom", apps_csv_email: "Courriel", apps_csv_stage: "Stade", apps_csv_date: "Reçue le", apps_csv_status: "Statut", apps_csv_source: "Source",
});

Object.assign(translations.en, {
  apps_kicker: "Staff area",
  apps_title: "Applications",
  apps_intro: "Winter 2027 cohort · Deadline: November 15, 2026 ({days})",
  apps_days_left: "in {n} days",
  apps_closed: "closed",
  apps_export: "Export to CSV",
  apps_stat_total: "Applications received",
  apps_stat_total_note: "{n} this week",
  apps_stat_new: "To review",
  apps_stat_new_note: "New applications",
  apps_stat_review: "In review",
  apps_stat_review_note: "Interview or checks",
  apps_stat_accepted: "Accepted",
  apps_stat_accepted_note: "Invitations sent",
  apps_all: "All",
  status_new: "New",
  status_review: "In review",
  status_accepted: "Accepted",
  status_declined: "Declined",
  apps_search: "Name or email",
  apps_col_applicant: "Applicant",
  apps_col_stage: "Stage",
  apps_col_received: "Received",
  apps_col_status: "Status",
  apps_from_site: "Website",
  apps_new_badge: "New",
  apps_examine: "Review",
  apps_empty: "No applications match your search.",
  apps_close: "Close",
  apps_fact_stage: "Stage",
  apps_fact_received: "Received",
  apps_fact_source: "Source",
  apps_source_site: "Website form",
  apps_source_event: "Information session",
  apps_source_partner: "Partner referral",
  apps_project: "Project description",
  apps_no_description: "No description provided.",
  apps_criteria: "Eligibility criteria",
  apps_note: "Internal note",
  apps_note_ph: "Visible to the SOFIFRAN team only",
  apps_decline: "Decline",
  apps_to_review: "Move to review",
  apps_accept: "Accept the application",
  apps_err_criteria: "Check all four eligibility criteria before accepting.",
  apps_err_reason: "Add the reason for declining in the internal note.",
  apps_saved_accepted_title: "Application accepted",
  apps_saved_accepted_body: "An invitation email was sent to create the account and start the diagnostic.",
  apps_saved_review_title: "Application in review",
  apps_saved_review_body: "It stays in the list of applications to follow up on.",
  apps_saved_declined_title: "Application declined",
  apps_saved_declined_body: "An email explaining the decision was sent, with useful resources.",
  apps_export_title: "Export ready",
  apps_export_body: "The CSV file contains the applications shown.",
  apps_csv_name: "Name", apps_csv_email: "Email", apps_csv_stage: "Stage", apps_csv_date: "Received", apps_csv_status: "Status", apps_csv_source: "Source",
});

// ---- Data ----
const DEADLINE = new Date(2026, 10, 15, 23, 59);
const STATUSES = ['new', 'review', 'accepted', 'declined'];
const CRITERIA = ['eligibility_1', 'eligibility_2', 'eligibility_3', 'eligibility_4'];

// Demo applications (would come from the platform's database)
const DEMO_APPLICATIONS = [
  { id: 'demo1', nom: 'Mariam Haddad', courriel: 'mariam.haddad@exemple.ca', stageKey: 'apply_stage_idea', source: 'event', days: -1, status: 'new',
    description: "Épicerie zéro déchet dans le quartier Vanier : produits en vrac, contenants consignés et fournisseurs locaux." },
  { id: 'demo2', nom: 'Thomas Lefebvre', courriel: 'thomas.lefebvre@exemple.ca', stageKey: 'apply_stage_startup', source: 'site', days: -2, status: 'new',
    description: "Application de réservation en ligne pour les salons de coiffure indépendants, en français et en anglais." },
  { id: 'demo3', nom: 'Louis-Philippe Gagné', courriel: 'lp.gagne@exemple.ca', stageKey: 'apply_stage_startup', source: 'partner', days: -4, status: 'new',
    description: "Service de déneigement et d'entretien paysager résidentiel à Orléans. Deux camions, clientèle de 40 maisons." },
  { id: 'demo4', nom: 'Aïcha Traoré', courriel: 'aicha.traore@exemple.ca', stageKey: 'apply_stage_validation', source: 'site', days: -6, status: 'review', criteria: [true, true, true, false],
    description: "Plateforme de tutorat en ligne en français pour les élèves du secondaire des écoles francophones de l'Ontario." },
  { id: 'demo5', nom: 'Julien Bélanger', courriel: 'julien.belanger@exemple.ca', stageKey: 'apply_stage_growth', source: 'partner', days: -10, status: 'accepted', criteria: [true, true, true, true],
    description: "Microbrasserie artisanale qui souhaite ouvrir une salle de dégustation et distribuer dans l'est de l'Ontario." },
  { id: 'demo6', nom: 'Sofia Morales', courriel: 'sofia.morales@exemple.ca', stageKey: 'apply_stage_idea', source: 'site', days: -13, status: 'declined', criteria: [false, true, true, true],
    note: "Réside à Montréal, hors de la région desservie. Orientée vers un programme du Québec.",
    description: "Atelier de couture et de retouches avec cours du soir pour débutants." },
];

// Decisions made on this page (shared by all staff, so not tied to one account)
const REVIEWS_KEY = 'i2enf_app_reviews';
const getReviews = () => JSON.parse(localStorage.getItem(REVIEWS_KEY) || '{}');
function saveReview(id, review) {
  const reviews = getReviews();
  reviews[id] = { ...review, updated: new Date().toISOString() };
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

// Website applications (from the landing page form) + demo ones, with any decisions applied
function getAllApplications() {
  const fromSite = getApplications().map((a) => ({
    id: a.id, nom: a.nom, courriel: a.courriel, stageText: a.stade, description: a.description,
    source: 'site', date: new Date(a.submittedAt), status: 'new', fromSite: true,
  }));
  const demo = DEMO_APPLICATIONS.map((a) => ({ ...a, date: daysFromNow(a.days, 10, 15) }));
  const reviews = getReviews();
  return [...fromSite, ...demo]
    .map((a) => ({ ...a, ...(reviews[a.id] || {}) }))
    .sort((a, b) => b.date - a.date);
}

const view = { status: 'all', search: '' };
let openId = null;

const initials = (name) => name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
const stageLabel = (a) => (a.stageKey ? t(a.stageKey) : a.stageText || '—');
const statusPill = (status) => `<span class="pill status-${status}">${t(`status_${status}`)}</span>`;

function visibleApplications() {
  const query = view.search.trim().toLowerCase();
  return getAllApplications()
    .filter((a) => view.status === 'all' || a.status === view.status)
    .filter((a) => !query || a.nom.toLowerCase().includes(query) || a.courriel.toLowerCase().includes(query));
}

const STAT_ICONS = {
  inbox: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/></svg>',
  bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>',
  search: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  check: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>',
};

// ---- Rendering ----
function renderIntro() {
  const days = Math.ceil((DEADLINE - new Date()) / 86400000);
  document.getElementById('apps-intro').textContent = t('apps_intro', { days: days > 0 ? t('apps_days_left', { n: days }) : t('apps_closed') });
}

function renderStats() {
  const apps = getAllApplications();
  const count = (s) => apps.filter((a) => a.status === s).length;
  const thisWeek = apps.filter((a) => new Date() - a.date < 7 * 86400000).length;
  const stats = [
    { icon: STAT_ICONS.inbox, label: t('apps_stat_total'), value: apps.length, note: t('apps_stat_total_note', { n: thisWeek }) },
    { icon: STAT_ICONS.bell, label: t('apps_stat_new'), value: count('new'), note: t('apps_stat_new_note'), alert: count('new') > 0 },
    { icon: STAT_ICONS.search, label: t('apps_stat_review'), value: count('review'), note: t('apps_stat_review_note') },
    { icon: STAT_ICONS.check, label: t('apps_stat_accepted'), value: count('accepted'), note: t('apps_stat_accepted_note') },
  ];
  document.getElementById('apps-stats').innerHTML = stats.map((s) => `
    <div class="apps-stat ${s.alert ? 'is-alert' : ''}">
      <span class="apps-stat-icon">${s.icon}</span>
      <div class="apps-stat-body">
        <span class="apps-stat-label">${s.label}</span>
        <span class="apps-stat-value">${s.value}</span>
        <span class="apps-stat-note">${s.note}</span>
      </div>
    </div>`).join('');
}

function renderFilters() {
  const apps = getAllApplications();
  document.getElementById('apps-filters').innerHTML = ['all', ...STATUSES].map((s) => {
    const n = s === 'all' ? apps.length : apps.filter((a) => a.status === s).length;
    return `<button type="button" class="apps-filter" role="tab" aria-selected="${view.status === s}" data-status="${s}">${t(s === 'all' ? 'apps_all' : `status_${s}`)} <small>${n}</small></button>`;
  }).join('');
}

function renderList() {
  const apps = visibleApplications();
  const list = document.getElementById('apps-list');
  if (!apps.length) { list.innerHTML = `<li class="apps-empty">${t('apps_empty')}</li>`; return; }
  list.innerHTML = apps.map((a) => `
    <li class="app-row ${a.fromSite && a.status === 'new' ? 'is-new' : ''}">
      <div class="app-person">
        <span class="user-avatar">${escapeHtml(initials(a.nom))}</span>
        <div class="app-person-text">
          <strong>${escapeHtml(a.nom)}${a.fromSite && a.status === 'new' ? `<span class="pill pill-current">${t('apps_new_badge')}</span>` : ''}</strong>
          <small>${escapeHtml(a.courriel)}</small>
        </div>
      </div>
      <div class="app-cell"><span class="app-cell-label">${t('apps_col_stage')}</span>${escapeHtml(stageLabel(a))}</div>
      <div class="app-cell"><span class="app-cell-label">${t('apps_col_received')}</span>${capitalize(relativeDay(a.date))}</div>
      <div class="app-cell"><span class="app-cell-label">${t('apps_col_status')}</span>${statusPill(a.status)}</div>
      <button type="button" class="btn-outline btn-sm" data-open="${escapeHtml(a.id)}">${t('apps_examine')}</button>
    </li>`).join('');
}

function render() {
  renderIntro();
  renderStats();
  renderFilters();
  renderList();
  if (openId && document.getElementById('review-dialog').open) fillReview(openId, true);
}

// ---- Review dialog ----
function reviewError(key) {
  const box = document.getElementById('review-error');
  box.hidden = !key;
  box.textContent = key ? t(key) : '';
}

function fillReview(id, keepInputs = false) {
  const a = getAllApplications().find((x) => x.id === id);
  const checked = keepInputs
    ? [...document.querySelectorAll('#review-criteria input')].map((c) => c.checked)
    : a.criteria || [false, false, false, false];
  const note = keepInputs ? document.getElementById('review-note').value : a.note || '';

  document.getElementById('review-head').innerHTML = `
    <span class="user-avatar">${escapeHtml(initials(a.nom))}</span>
    <div><h2 id="review-name">${escapeHtml(a.nom)}</h2><small>${escapeHtml(a.courriel)}</small></div>
    ${statusPill(a.status)}`;
  document.getElementById('review-facts').innerHTML = `
    <div><dt>${t('apps_fact_stage')}</dt><dd>${escapeHtml(stageLabel(a))}</dd></div>
    <div><dt>${t('apps_fact_received')}</dt><dd>${shortDay(a.date)}</dd></div>
    <div><dt>${t('apps_fact_source')}</dt><dd>${t(`apps_source_${a.source}`)}</dd></div>`;
  document.getElementById('review-desc').textContent = a.description || t('apps_no_description');
  document.getElementById('review-criteria').innerHTML = CRITERIA.map((key, i) => `
    <label class="check-field"><input type="checkbox" ${checked[i] ? 'checked' : ''}><span>${t(key)}</span></label>`).join('');
  document.getElementById('review-note').value = note;
}

function openReview(id) {
  openId = id;
  reviewError(null);
  document.getElementById('review-criteria').classList.remove('field-invalid');
  document.getElementById('review-note').classList.remove('field-invalid');
  fillReview(id);
  document.getElementById('review-dialog').showModal();
}

function decide(status) {
  const criteria = [...document.querySelectorAll('#review-criteria input')].map((c) => c.checked);
  const noteField = document.getElementById('review-note');
  const note = noteField.value.trim();
  document.getElementById('review-criteria').classList.remove('field-invalid');
  noteField.classList.remove('field-invalid');

  if (status === 'accepted' && criteria.includes(false)) {
    document.getElementById('review-criteria').classList.add('field-invalid');
    return reviewError('apps_err_criteria');
  }
  if (status === 'declined' && note.length < 10) {
    noteField.classList.add('field-invalid');
    noteField.focus();
    return reviewError('apps_err_reason');
  }

  saveReview(openId, { status, criteria, note });
  document.getElementById('review-dialog').close();
  openId = null;
  render();
  showAlert('success', `apps_saved_${status}_title`, [`apps_saved_${status}_body`]);
}

// ---- CSV export (opens in Excel with accents intact) ----
function exportCsv() {
  const cell = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const header = ['apps_csv_name', 'apps_csv_email', 'apps_csv_stage', 'apps_csv_date', 'apps_csv_status', 'apps_csv_source'].map((k) => cell(t(k)));
  const rows = visibleApplications().map((a) => [
    a.nom, a.courriel, stageLabel(a), a.date.toISOString().slice(0, 10), t(`status_${a.status}`), t(`apps_source_${a.source}`),
  ].map(cell).join(';'));
  const csv = '\uFEFF' + [header.join(';'), ...rows].join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = `candidatures-i2enf-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showAlert('success', 'apps_export_title', ['apps_export_body']);
}

function setup() {
  document.getElementById('apps-filters').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-status]');
    if (!chip) return;
    view.status = chip.dataset.status;
    renderFilters();
    renderList();
  });
  document.getElementById('apps-search').addEventListener('input', (e) => { view.search = e.target.value; renderList(); });
  document.getElementById('apps-list').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (btn) openReview(btn.dataset.open);
  });
  document.querySelector('.review-actions').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-decision]');
    if (btn) decide(btn.dataset.decision);
  });
  document.getElementById('review-criteria').addEventListener('change', () => {
    document.getElementById('review-criteria').classList.remove('field-invalid');
    reviewError(null);
  });
  document.getElementById('review-note').addEventListener('input', (e) => e.target.classList.remove('field-invalid'));
  document.getElementById('review-dialog').addEventListener('close', () => { openId = null; });
  document.getElementById('export-csv').addEventListener('click', exportCsv);
}

initAppPage({ page: 'applications', role: 'staff', render, setup });
