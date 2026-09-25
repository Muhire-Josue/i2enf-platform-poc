// kpi-dashboard.js — staff "Indicateurs de rendement": program results for SOFIFRAN
// and the funder, for the current cohort or the whole first year, with a CSV export.
// Demo figures, consistent with the other pages (8 cohort participants, 84 % attendance).
// Header and helpers come from shared/app.js, the staff menu from shared/staff.js.

Object.assign(translations.fr, {
  kpi_title: "Indicateurs de rendement",
  kpi_intro: "Données au {date} · Démonstration",
  kpi_period_cohort: "Cohorte en cours",
  kpi_period_year: "Année 1",
  kpi_export: "Exporter (CSV)",
  kpi_export_title: "Export généré",
  kpi_export_body: "Le fichier CSV contient les indicateurs de la période choisie et les cibles de l'année.",
  kpi_participants: "Entrepreneurs accompagnés",
  kpi_retention: "Taux de rétention",
  kpi_hours: "Heures de mentorat",
  kpi_attendance: "Présence aux ateliers",
  kpi_registered: "Entreprises enregistrées",
  kpi_satisfaction: "Satisfaction des participants",
  kpi_note_participants_cohort: "Cohorte {season} {year}",
  kpi_note_participants_year: "{p} % de la cible annuelle ({n})",
  kpi_note_retention: "{n} abandon(s) depuis le début",
  kpi_note_hours_cohort: "{n} h par entrepreneur en moyenne",
  kpi_note_hours_year: "{p} % de la cible annuelle ({n} h)",
  kpi_note_attendance: "Moyenne des événements terminés",
  kpi_note_registered_cohort: "Depuis l'entrée dans le programme",
  kpi_note_registered_year: "{p} % de la cible annuelle ({n})",
  kpi_note_satisfaction: "Sondages de fin de module ({n} réponses)",
  kpi_hours_value: "{n} h",
  kpi_out_of_5: "{n} / 5",
  kpi_chart_apps: "Candidatures et admissions",
  kpi_chart_apps_sub: "Six derniers mois",
  kpi_series_apps: "Candidatures",
  kpi_series_admitted: "Admissions",
  kpi_chart_label: "Candidatures et admissions par mois : {list}",
  kpi_funnel: "Parcours des candidatures",
  kpi_funnel_sub_cohort: "Candidatures reçues pour la cohorte en cours",
  kpi_funnel_sub_year: "Toutes les candidatures depuis le lancement",
  funnel_received: "Candidatures reçues",
  funnel_eligible: "Jugées admissibles",
  funnel_accepted: "Acceptées",
  funnel_diagnostic: "Diagnostic complété",
  funnel_matched: "Jumelées à un mentor",
  funnel_active: "Toujours actives",
  kpi_of_previous: "{p} % de l'étape précédente",
  kpi_diag: "Progression au diagnostic",
  kpi_diag_sub: "Score moyen par domaine, à l'entrée et à la réévaluation de mi-parcours (cohortes terminées).",
  kpi_before: "À l'entrée",
  kpi_after: "Mi-parcours",
  kpi_profile: "Portrait des participants",
  kpi_profile_sub: "{n} participants · Renseignements fournis avec consentement",
  kpi_group_gender: "Identité de genre",
  kpi_group_newcomer: "Nouveaux arrivants (moins de 5 ans)",
  kpi_group_stage: "Stade à l'entrée",
  kpi_women: "Femmes", kpi_men: "Hommes", kpi_other_gender: "Non binaire ou non divulgué",
  kpi_newcomer_yes: "Nouveaux arrivants", kpi_newcomer_no: "Autres participants",
  kpi_suppressed: "Moins de 5 personnes",
  kpi_hidden: "Masqué (confidentialité)",
  kpi_privacy: "Données agrégées. Pour protéger la vie privée, les groupes de moins de 5 personnes ne sont pas affichés, ni les valeurs qui permettraient de les déduire.",
  kpi_targets: "Cibles de la première année",
  kpi_targets_sub: "Cibles provisoires, à confirmer avec le bailleur de fonds. Le statut compare l'avancement à la portion de l'année écoulée.",
  kpi_elapsed: "{p} % de l'année écoulée",
  kpi_col_indicator: "Indicateur",
  kpi_col_actual: "Résultat",
  kpi_col_target: "Cible",
  kpi_col_progress: "Avancement",
  kpi_col_status: "Statut",
  kpi_t_participants: "Entrepreneurs accompagnés",
  kpi_t_hours: "Heures de mentorat",
  kpi_t_registered: "Entreprises enregistrées",
  kpi_t_women: "Participation des femmes",
  kpi_t_newcomers: "Participation des nouveaux arrivants",
  kpi_t_workshops: "Ateliers offerts",
  kpi_t_networking: "Activités de réseautage",
  kpi_status_met: "Atteinte",
  kpi_status_track: "En bonne voie",
  kpi_status_watch: "À surveiller",
  kpi_status_risk: "À risque",
  kpi_csv_section: "Section", kpi_csv_indicator: "Indicateur", kpi_csv_value: "Valeur", kpi_csv_target: "Cible", kpi_csv_status: "Statut",
  kpi_csv_period: "Période",
  stage_ideation: "Idéation", stage_validation: "Validation", stage_startup: "Démarrage", stage_growth: "Croissance",
});

Object.assign(translations.en, {
  kpi_title: "Performance indicators",
  kpi_intro: "Data as of {date} · Demo",
  kpi_period_cohort: "Current cohort",
  kpi_period_year: "Year 1",
  kpi_export: "Export (CSV)",
  kpi_export_title: "Export ready",
  kpi_export_body: "The CSV file contains the indicators for the selected period and the year's targets.",
  kpi_participants: "Entrepreneurs supported",
  kpi_retention: "Retention rate",
  kpi_hours: "Mentoring hours",
  kpi_attendance: "Workshop attendance",
  kpi_registered: "Businesses registered",
  kpi_satisfaction: "Participant satisfaction",
  kpi_note_participants_cohort: "{season} {year} cohort",
  kpi_note_participants_year: "{p}% of the annual target ({n})",
  kpi_note_retention: "{n} dropout(s) so far",
  kpi_note_hours_cohort: "{n} h per entrepreneur on average",
  kpi_note_hours_year: "{p}% of the annual target ({n} h)",
  kpi_note_attendance: "Average across past events",
  kpi_note_registered_cohort: "Since joining the program",
  kpi_note_registered_year: "{p}% of the annual target ({n})",
  kpi_note_satisfaction: "End-of-module surveys ({n} responses)",
  kpi_hours_value: "{n} h",
  kpi_out_of_5: "{n} / 5",
  kpi_chart_apps: "Applications and admissions",
  kpi_chart_apps_sub: "Last six months",
  kpi_series_apps: "Applications",
  kpi_series_admitted: "Admissions",
  kpi_chart_label: "Applications and admissions per month: {list}",
  kpi_funnel: "Application funnel",
  kpi_funnel_sub_cohort: "Applications received for the current cohort",
  kpi_funnel_sub_year: "All applications since launch",
  funnel_received: "Applications received",
  funnel_eligible: "Found eligible",
  funnel_accepted: "Accepted",
  funnel_diagnostic: "Diagnostic completed",
  funnel_matched: "Matched with a mentor",
  funnel_active: "Still active",
  kpi_of_previous: "{p}% of the previous step",
  kpi_diag: "Diagnostic progress",
  kpi_diag_sub: "Average score by area, at entry and at the mid-program reassessment (completed cohorts).",
  kpi_before: "At entry",
  kpi_after: "Mid-program",
  kpi_profile: "Participant profile",
  kpi_profile_sub: "{n} participants · Information provided with consent",
  kpi_group_gender: "Gender identity",
  kpi_group_newcomer: "Newcomers (less than 5 years)",
  kpi_group_stage: "Stage at entry",
  kpi_women: "Women", kpi_men: "Men", kpi_other_gender: "Non-binary or not disclosed",
  kpi_newcomer_yes: "Newcomers", kpi_newcomer_no: "Other participants",
  kpi_suppressed: "Fewer than 5 people",
  kpi_hidden: "Hidden (privacy)",
  kpi_privacy: "Aggregated data. To protect privacy, groups of fewer than 5 people are not shown, nor any value that would reveal them.",
  kpi_targets: "First-year targets",
  kpi_targets_sub: "Provisional targets, to be confirmed with the funder. The status compares progress with the share of the year elapsed.",
  kpi_elapsed: "{p}% of the year elapsed",
  kpi_col_indicator: "Indicator",
  kpi_col_actual: "Result",
  kpi_col_target: "Target",
  kpi_col_progress: "Progress",
  kpi_col_status: "Status",
  kpi_t_participants: "Entrepreneurs supported",
  kpi_t_hours: "Mentoring hours",
  kpi_t_registered: "Businesses registered",
  kpi_t_women: "Women's participation",
  kpi_t_newcomers: "Newcomer participation",
  kpi_t_workshops: "Workshops delivered",
  kpi_t_networking: "Networking activities",
  kpi_status_met: "Met",
  kpi_status_track: "On track",
  kpi_status_watch: "To watch",
  kpi_status_risk: "At risk",
  kpi_csv_section: "Section", kpi_csv_indicator: "Indicator", kpi_csv_value: "Value", kpi_csv_target: "Target", kpi_csv_status: "Status",
  kpi_csv_period: "Period",
  stage_ideation: "Ideation", stage_validation: "Validation", stage_startup: "Startup", stage_growth: "Growth",
});

// ---- Demo figures (would be calculated from the platform's database) ----
const PROGRAM_START = new Date(2026, 2, 1); // program launch: March 1, 2026
const TARGETS = { participants: 40, hours: 200, registered: 15, women: 50, newcomers: 30, workshops: 24, networking: 8 };

const DATA = {
  cohort: {
    participants: 8, dropouts: 0, hours: 31, attendance: 84, registered: 3, satisfaction: 4.6, responses: 14,
    funnel: [29, 21, 9, 9, 8, 8],
    profile: { total: 8, gender: { women: 5, men: 3, other: 0 }, newcomer: { yes: 3, no: 5 }, stage: { ideation: 2, validation: 2, startup: 3, growth: 1 } },
  },
  year: {
    participants: 26, dropouts: 2, hours: 118, attendance: 79, registered: 11, satisfaction: 4.7, responses: 61,
    funnel: [84, 61, 34, 30, 28, 26],
    profile: { total: 26, gender: { women: 15, men: 10, other: 1 }, newcomer: { yes: 11, no: 15 }, stage: { ideation: 7, validation: 8, startup: 8, growth: 3 } },
  },
};
// Year-to-date results for the targets table
const RESULTS = { participants: 26, hours: 118, registered: 11, women: 58, newcomers: 42, workshops: 14, networking: 2 };

// Applications and admissions for the last 6 months (oldest first)
const MONTHLY = { apps: [9, 14, 11, 7, 16, 12], admitted: [4, 6, 5, 3, 8, 5] };

// Average diagnostic score by area in completed cohorts
const DIAG = [
  ['area_business_model', 58, 71], ['area_market', 52, 68], ['area_finance', 41, 62],
  ['area_legal', 38, 60], ['area_marketing', 49, 64], ['area_management', 55, 66],
];

let period = 'cohort';
const SMALL_GROUP = 5; // groups smaller than this are hidden

const num = (n, digits = 0) => new Intl.NumberFormat(locale(), { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n);
const pct = (part, whole) => (whole ? Math.round((part / whole) * 100) : 0);
const yearElapsed = () => Math.min(100, Math.max(1, Math.round(((new Date() - PROGRAM_START) / (365 * 86400000)) * 100)));

// Website applications (from the landing page form) count toward this month
const siteApplications = () => getApplications().length;

const KPI_ICONS = {
  people: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21v-1a7 7 0 0114 0v1"/><path d="M16 3.1a4 4 0 010 7.8M22 21v-1a7 7 0 00-4-6.3"/></svg>',
  retention: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg>',
  clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  building: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M5 21V9l7-5 7 5v12"/><path d="M9 21v-6h6v6"/></svg>',
  star: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/></svg>',
  lock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>',
};

// ---- Key indicators ----
function kpiList() {
  const d = DATA[period];
  const year = period === 'year';
  const retention = pct(d.participants - d.dropouts, d.participants);
  const cohortName = cohortLabel('kpi_note_participants_cohort');
  return [
    { key: 'participants', icon: KPI_ICONS.people, value: num(d.participants),
      note: year ? t('kpi_note_participants_year', { p: pct(d.participants, TARGETS.participants), n: TARGETS.participants }) : cohortName,
      bar: year ? pct(d.participants, TARGETS.participants) : null },
    { key: 'retention', icon: KPI_ICONS.retention, value: percent(retention), note: t('kpi_note_retention', { n: d.dropouts }), bar: retention },
    { key: 'hours', icon: KPI_ICONS.clock, value: t('kpi_hours_value', { n: num(d.hours) }),
      note: year ? t('kpi_note_hours_year', { p: pct(d.hours, TARGETS.hours), n: TARGETS.hours }) : t('kpi_note_hours_cohort', { n: num(d.hours / d.participants, 1) }),
      bar: year ? pct(d.hours, TARGETS.hours) : null },
    { key: 'attendance', icon: KPI_ICONS.calendar, value: percent(d.attendance), note: t('kpi_note_attendance'), bar: d.attendance },
    { key: 'registered', icon: KPI_ICONS.building, value: num(d.registered),
      note: year ? t('kpi_note_registered_year', { p: pct(d.registered, TARGETS.registered), n: TARGETS.registered }) : t('kpi_note_registered_cohort'),
      bar: year ? pct(d.registered, TARGETS.registered) : null },
    { key: 'satisfaction', icon: KPI_ICONS.star, value: t('kpi_out_of_5', { n: num(d.satisfaction, 1) }), note: t('kpi_note_satisfaction', { n: d.responses }), bar: pct(d.satisfaction, 5) },
  ];
}

function renderCards() {
  document.getElementById('kpi-cards').innerHTML = kpiList().map((k) => `
    <div class="kpi-card">
      <div class="kpi-card-top"><span class="kpi-icon">${k.icon}</span><span class="kpi-label">${t(`kpi_${k.key}`)}</span></div>
      <span class="kpi-value">${k.value}</span>
      ${k.bar !== null ? `<div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, k.bar)}%"></div></div>` : ''}
      <span class="kpi-note">${k.note}</span>
    </div>`).join('');
}

// ---- Applications chart (inline SVG) ----
function monthLabels() {
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1));
}

function renderChart() {
  const apps = [...MONTHLY.apps];
  apps[5] += siteApplications();
  const admitted = MONTHLY.admitted;
  const months = monthLabels();
  const W = 600, H = 260, left = 32, bottom = 28, top = 18;
  const max = Math.ceil(Math.max(...apps) / 5) * 5 || 5;
  const plotH = H - bottom - top;
  const slot = (W - left) / 6;
  const bw = Math.min(26, slot / 3);
  const y = (v) => top + plotH - (v / max) * plotH;

  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const v = Math.round(max * f);
    return `<line class="grid" x1="${left}" x2="${W}" y1="${y(v)}" y2="${y(v)}"/><text class="axis" x="${left - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  }).join('');
  const bars = months.map((m, i) => {
    const cx = left + slot * i + slot / 2;
    const label = capitalize(formatDate(m, { month: 'short' }).replace('.', ''));
    return `
      <rect x="${cx - bw - 2}" y="${y(apps[i])}" width="${bw}" height="${y(0) - y(apps[i])}" rx="4" fill="#1F3A5F"/>
      <rect x="${cx + 2}" y="${y(admitted[i])}" width="${bw}" height="${y(0) - y(admitted[i])}" rx="4" fill="#B5652F"/>
      <text class="value" x="${cx - bw / 2 - 2}" y="${y(apps[i]) - 5}" text-anchor="middle">${apps[i]}</text>
      <text class="value" x="${cx + bw / 2 + 2}" y="${y(admitted[i]) - 5}" text-anchor="middle">${admitted[i]}</text>
      <text class="axis" x="${cx}" y="${H - 8}" text-anchor="middle">${label}</text>`;
  }).join('');
  const summary = months.map((m, i) => `${formatDate(m, { month: 'long' })} ${apps[i]}/${admitted[i]}`).join(', ');

  document.getElementById('kpi-chart-legend').innerHTML = `
    <span><span class="kpi-swatch" style="background:#1F3A5F"></span>${t('kpi_series_apps')}</span>
    <span><span class="kpi-swatch" style="background:#B5652F"></span>${t('kpi_series_admitted')}</span>`;
  document.getElementById('kpi-chart').innerHTML = `
    <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeHtml(t('kpi_chart_label', { list: summary }))}">${grid}${bars}</svg>`;
}

// ---- Funnel ----
function renderFunnel() {
  const steps = ['received', 'eligible', 'accepted', 'diagnostic', 'matched', 'active'];
  const values = [...DATA[period].funnel];
  if (period === 'year') values[0] += siteApplications();
  document.getElementById('kpi-funnel-sub').textContent = t(period === 'year' ? 'kpi_funnel_sub_year' : 'kpi_funnel_sub_cohort');
  document.getElementById('kpi-funnel').innerHTML = steps.map((s, i) => `
    <li>
      <span class="kpi-funnel-label">${t(`funnel_${s}`)}</span>
      <span class="kpi-funnel-value">${num(values[i])}${i ? ` <small>${t('kpi_of_previous', { p: pct(values[i], values[i - 1]) })}</small>` : ''}</span>
      <span class="kpi-funnel-bar"><span style="width:${pct(values[i], values[0])}%"></span></span>
    </li>`).join('');
}

// ---- Diagnostic progress ----
function renderDiag() {
  document.getElementById('kpi-diag-legend').innerHTML = `
    <span><span class="kpi-swatch" style="background:#D9A574"></span>${t('kpi_before')}</span>
    <span><span class="kpi-swatch" style="background:#1F3A5F"></span>${t('kpi_after')}</span>`;
  document.getElementById('kpi-diag').innerHTML = DIAG.map(([area, before, after]) => `
    <li>
      <div class="kpi-diag-top"><strong>${t(area)}</strong><span class="kpi-diag-values">${before} → ${after}<span class="kpi-up">+${after - before}</span></span></div>
      <div class="kpi-bars">
        <div class="kpi-bar before"><span style="width:${before}%"></span></div>
        <div class="kpi-bar after"><span style="width:${after}%"></span></div>
      </div>
    </li>`).join('');
}

// ---- Participant profile (small groups hidden) ----
// Groups under 5 people are hidden. If that would let someone work out a hidden number
// by subtraction, the next smallest group is hidden too ("secondary suppression").
function suppress(rows) {
  const hidden = new Set(rows.filter(([, n]) => n < SMALL_GROUP).map(([label]) => label));
  const visible = rows.filter(([label]) => !hidden.has(label));
  if (hidden.size === 1 && visible.length) {
    if (visible.length === 1) visible.forEach(([label]) => hidden.add(label));
    else hidden.add([...visible].sort((a, b) => a[1] - b[1])[0][0]);
  }
  return rows.map(([label, n]) => ({ label, n, small: n < SMALL_GROUP, hidden: hidden.has(label) }));
}

function renderProfile() {
  const p = DATA[period].profile;
  const row = (r) => (r.hidden
    ? `<li><span>${t(r.label)}</span><span class="suppressed">${t(r.small ? 'kpi_suppressed' : 'kpi_hidden')}</span></li>`
    : `<li><span>${t(r.label)}</span><div class="progress-track"><div class="progress-fill" style="width:${pct(r.n, p.total)}%"></div></div><span class="pct">${percent(pct(r.n, p.total))}</span></li>`);
  const groups = [
    ['kpi_group_gender', [['kpi_women', p.gender.women], ['kpi_men', p.gender.men], ['kpi_other_gender', p.gender.other]]],
    ['kpi_group_newcomer', [['kpi_newcomer_yes', p.newcomer.yes], ['kpi_newcomer_no', p.newcomer.no]]],
    ['kpi_group_stage', Object.entries(p.stage).map(([s, n]) => [`stage_${s}`, n])],
  ];
  document.getElementById('kpi-profile-sub').textContent = t('kpi_profile_sub', { n: p.total });
  document.getElementById('kpi-profile').innerHTML = groups.map(([title, rows]) => `
    <div class="kpi-group"><h3>${t(title)}</h3><ul>${suppress(rows).map(row).join('')}</ul></div>`).join('');
  document.getElementById('kpi-privacy').innerHTML = `${KPI_ICONS.lock}<span>${t('kpi_privacy')}</span>`;
}

// ---- First-year targets ----
function targetRows() {
  const elapsed = yearElapsed();
  const isPercent = (k) => k === 'women' || k === 'newcomers';
  return Object.keys(TARGETS).map((k) => {
    const actual = RESULTS[k];
    const target = TARGETS[k];
    const progress = pct(actual, target);
    // Percentage targets are met when reached; count targets are compared with the share of the year elapsed
    const status = progress >= 100 ? 'met'
      : isPercent(k) ? (progress >= 90 ? 'watch' : 'risk')
      : progress >= elapsed ? 'track' : progress >= elapsed - 15 ? 'watch' : 'risk';
    const fmt = (v) => (isPercent(k) ? percent(v) : k === 'hours' ? t('kpi_hours_value', { n: num(v) }) : num(v));
    return { k, actual: fmt(actual), target: fmt(target), progress, status };
  });
}

function renderTargets() {
  document.getElementById('kpi-elapsed').textContent = t('kpi_elapsed', { p: yearElapsed() });
  document.getElementById('kpi-targets').innerHTML = targetRows().map((r) => `
    <li class="kpi-target is-${r.status}">
      <strong>${t(`kpi_t_${r.k}`)}</strong>
      <span><span class="kpi-cell-label">${t('kpi_col_actual')}</span>${r.actual}</span>
      <span><span class="kpi-cell-label">${t('kpi_col_target')}</span>${r.target}</span>
      <div class="kpi-target-progress"><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, r.progress)}%"></div></div><span>${percent(r.progress)}</span></div>
      <span><span class="pill status-${r.status}">${t(`kpi_status_${r.status}`)}</span></span>
    </li>`).join('');
}

// ---- Page ----
function renderPeriod() {
  document.getElementById('kpi-period').innerHTML = ['cohort', 'year'].map((p) => `
    <button type="button" role="radio" aria-checked="${p === period}" data-period="${p}">${t(`kpi_period_${p}`)}</button>`).join('');
}

function render() {
  document.getElementById('kpi-intro').textContent = t('kpi_intro', { date: formatDate(new Date(), { weekday: 'long', day: 'numeric', month: 'long' }) });
  renderPeriod();
  renderCards();
  renderChart();
  renderFunnel();
  renderDiag();
  renderProfile();
  renderTargets();
}

// ---- CSV export (opens in Excel with accents intact) ----
function exportCsv() {
  const cell = (v) => `"${String(v).replace(/"/g, '""').replace(/\u00a0/g, ' ')}"`;
  const periodName = t(`kpi_period_${period}`);
  const rows = [[t('kpi_csv_section'), t('kpi_csv_indicator'), t('kpi_csv_value'), t('kpi_csv_target'), t('kpi_csv_status')]];
  kpiList().forEach((k) => rows.push([periodName, t(`kpi_${k.key}`), k.value, '', '']));
  const funnel = [...DATA[period].funnel];
  if (period === 'year') funnel[0] += siteApplications();
  ['received', 'eligible', 'accepted', 'diagnostic', 'matched', 'active'].forEach((s, i) => rows.push([t('kpi_funnel'), t(`funnel_${s}`), funnel[i], '', '']));
  targetRows().forEach((r) => rows.push([t('kpi_targets'), t(`kpi_t_${r.k}`), r.actual, r.target, t(`kpi_status_${r.status}`)]));
  const csv = '\uFEFF' + rows.map((r) => r.map(cell).join(';')).join('\r\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = `indicateurs-i2enf-${period}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
  showAlert('success', 'kpi_export_title', ['kpi_export_body']);
}

function setup() {
  document.getElementById('kpi-period').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-period]');
    if (!btn || btn.dataset.period === period) return;
    period = btn.dataset.period;
    render();
  });
  document.getElementById('kpi-export').addEventListener('click', exportCsv);
}

initAppPage({ page: 'kpi', role: 'staff', render, setup });
