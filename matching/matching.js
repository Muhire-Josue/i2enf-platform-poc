// matching.js — staff "Jumelage": pair each accepted entrepreneur with a mentor.
// Mentors are ranked by a compatibility score (expertise in the diagnostic's priority
// areas, sector, language, remaining capacity). Accepting an application on the
// Candidatures page adds that person here.
// Header and helpers come from shared/app.js, the staff menu from shared/staff.js.

Object.assign(translations.fr, {
  mt_title: "Jumelage mentor-entrepreneur",
  mt_intro: "Cohorte {season} {year} · Semaine {week} sur {total}",
  mt_stat_to_match: "À jumeler",
  mt_stat_to_match_note: "Entrepreneurs sans mentor",
  mt_stat_active: "Jumelages actifs",
  mt_stat_active_note: "Dans la cohorte",
  mt_stat_mentors: "Mentors disponibles",
  mt_stat_mentors_note: "Sur {n} dans le bassin",
  mt_stat_seats: "Places libres",
  mt_stat_seats_note: "Chez l'ensemble des mentors",
  mt_to_match: "À jumeler",
  mt_to_match_count: "{n} à jumeler",
  mt_all_matched: "Tous les entrepreneurs sont jumelés.",
  mt_from_site: "Candidature du site",
  mt_priorities: "Priorités",
  mt_recent: "Jumelages récents",
  mt_undo: "Annuler",
  mt_suggestions_for: "Mentors suggérés pour {name}",
  mt_suggestions_none: "Mentors suggérés",
  mt_score_help: "Le score tient compte de l'expertise du mentor dans les domaines prioritaires du diagnostic, du secteur, de la langue et des places disponibles.",
  mt_match_word: "compat.",
  mt_best: "Meilleur choix",
  mt_choose: "Jumeler",
  mt_full: "Complet",
  mt_reason_expertise: "Expertise : {area}",
  mt_reason_no_expertise: "Aucune expertise dans ses priorités",
  mt_reason_sector: "Secteur : {sector}",
  mt_reason_language: "Parle {lang}",
  mt_reason_language_miss: "Aucune langue commune",
  mt_reason_seats: "{n} places disponibles",
  mt_reason_seat: "1 place disponible",
  mt_pool: "Bassin de mentors",
  mt_pool_count: "{n} mentors",
  mt_col_mentor: "Mentor",
  mt_col_expertise: "Expertise",
  mt_col_languages: "Langues",
  mt_col_load: "Entrepreneurs suivis",
  mt_load: "{n} sur {max}",
  mt_open: "Disponible",
  mt_confirm_title: "Confirmer le jumelage?",
  mt_confirm_text: "Jumeler {person} avec {mentor}. Les deux recevront un courriel d'introduction avec leurs coordonnées.",
  mt_message: "Message d'introduction (facultatif)",
  mt_message_ph: "Envoyé aux deux personnes avec leurs coordonnées",
  mt_cancel: "Annuler",
  mt_confirm: "Confirmer le jumelage",
  mt_matched_title: "Jumelage confirmé",
  mt_matched_body: "L'entrepreneur et son mentor ont reçu un courriel d'introduction.",
  mt_undone_title: "Jumelage annulé",
  mt_undone_body: "L'entrepreneur est de nouveau dans la liste à jumeler.",
  mt_stage_ideation: "Idéation", mt_stage_validation: "Validation", mt_stage_startup: "Démarrage", mt_stage_growth: "Croissance",
  lang_word_fr: "français", lang_word_en: "anglais",
  mentor_gp_title: "Directrice des ventes — Groupe Laurentide",
  mentor_ra_title: "Directeur de comptes — Banque commerciale",
  mt_biz_jb: "Microbrasserie artisanale",
  mt_biz_yb: "Physiothérapie à domicile",
  mt_biz_og: "Rénovation résidentielle",
  mt_biz_site: "Nouvelle entreprise",
});

Object.assign(translations.en, {
  mt_title: "Mentor matching",
  mt_intro: "{season} {year} cohort · Week {week} of {total}",
  mt_stat_to_match: "To match",
  mt_stat_to_match_note: "Entrepreneurs without a mentor",
  mt_stat_active: "Active pairings",
  mt_stat_active_note: "In the cohort",
  mt_stat_mentors: "Mentors available",
  mt_stat_mentors_note: "Of {n} in the pool",
  mt_stat_seats: "Open seats",
  mt_stat_seats_note: "Across all mentors",
  mt_to_match: "To match",
  mt_to_match_count: "{n} to match",
  mt_all_matched: "Every entrepreneur has a mentor.",
  mt_from_site: "Website application",
  mt_priorities: "Priorities",
  mt_recent: "Recent pairings",
  mt_undo: "Undo",
  mt_suggestions_for: "Suggested mentors for {name}",
  mt_suggestions_none: "Suggested mentors",
  mt_score_help: "The score takes into account the mentor's expertise in the diagnostic's priority areas, the sector, the language and open seats.",
  mt_match_word: "match",
  mt_best: "Best match",
  mt_choose: "Match",
  mt_full: "Full",
  mt_reason_expertise: "Expertise: {area}",
  mt_reason_no_expertise: "No expertise in their priorities",
  mt_reason_sector: "Sector: {sector}",
  mt_reason_language: "Speaks {lang}",
  mt_reason_language_miss: "No shared language",
  mt_reason_seats: "{n} open seats",
  mt_reason_seat: "1 open seat",
  mt_pool: "Mentor pool",
  mt_pool_count: "{n} mentors",
  mt_col_mentor: "Mentor",
  mt_col_expertise: "Expertise",
  mt_col_languages: "Languages",
  mt_col_load: "Entrepreneurs followed",
  mt_load: "{n} of {max}",
  mt_open: "Available",
  mt_confirm_title: "Confirm the pairing?",
  mt_confirm_text: "Pair {person} with {mentor}. Both will receive an introduction email with each other's contact details.",
  mt_message: "Introduction message (optional)",
  mt_message_ph: "Sent to both people with their contact details",
  mt_cancel: "Cancel",
  mt_confirm: "Confirm the pairing",
  mt_matched_title: "Pairing confirmed",
  mt_matched_body: "The entrepreneur and their mentor received an introduction email.",
  mt_undone_title: "Pairing undone",
  mt_undone_body: "The entrepreneur is back in the list to match.",
  mt_stage_ideation: "Ideation", mt_stage_validation: "Validation", mt_stage_startup: "Startup", mt_stage_growth: "Growth",
  lang_word_fr: "French", lang_word_en: "English",
  mentor_gp_title: "Sales director — Groupe Laurentide",
  mentor_ra_title: "Account manager — commercial bank",
  mt_biz_jb: "Craft microbrewery",
  mt_biz_yb: "Home physiotherapy",
  mt_biz_og: "Home renovation",
  mt_biz_site: "New business",
});

// ---- Data ----
const SECTOR_KEYS = { alimentation: 'sector_food', sante: 'sector_health', construction: 'sector_construction', services: 'sector_services', commerce: 'sector_retail', technologie: 'sector_tech', arts: 'sector_arts' };

// Mentor pool: Karim, Nadia and Luc (as on the other pages) plus two more mentors.
// "load" is how many entrepreneurs they already follow (matches the case files page).
const POOL = [
  { ...mentorById('kd'), capacity: 5, load: 4, sectors: ['services', 'alimentation'] },
  { ...mentorById('nb'), capacity: 4, load: 2, sectors: ['commerce', 'alimentation', 'arts'] },
  { ...mentorById('lt'), capacity: 4, load: 2, sectors: ['construction', 'technologie'] },
  { id: 'gp', name: 'Geneviève Proulx', initials: 'GP', titleKey: 'mentor_gp_title', expertise: ['area_marketing', 'area_management'], languages: ['fr', 'en'], capacity: 3, load: 1, sectors: ['sante', 'services'] },
  { id: 'ra', name: 'Rachid Amrani', initials: 'RA', titleKey: 'mentor_ra_title', expertise: ['area_finance', 'area_business_model'], languages: ['fr'], capacity: 3, load: 3, sectors: ['commerce', 'construction'] },
];
const ACTIVE_PAIRINGS = 8; // the cohort on the case files page

// Accepted entrepreneurs waiting for a mentor (priorities come from their diagnostic)
const DEMO_PEOPLE = [
  { id: 'jb', applicationId: 'demo5', name: 'Julien Bélanger', business: 'Microbrasserie Bélanger', bizKey: 'mt_biz_jb', sector: 'alimentation', stage: 'growth', languages: ['fr'], priorities: ['area_finance', 'area_marketing'] },
  { id: 'yb', name: 'Yasmine Benali', business: 'Kinésis Mobile', bizKey: 'mt_biz_yb', sector: 'sante', stage: 'startup', languages: ['fr', 'en'], priorities: ['area_legal', 'area_finance'] },
  { id: 'og', name: 'Olivier Gagnon', business: 'Gagnon Rénovation', bizKey: 'mt_biz_og', sector: 'construction', stage: 'validation', languages: ['fr'], priorities: ['area_marketing', 'area_business_model'] },
];

// Decisions made on the Candidatures page
const reviews = () => { try { return JSON.parse(localStorage.getItem('i2enf_app_reviews') || '{}'); } catch { return {}; } };

// Everyone accepted: demo people (unless their application was later changed) + website applicants accepted by staff
function acceptedPeople() {
  const r = reviews();
  const demo = DEMO_PEOPLE.filter((p) => !p.applicationId || !r[p.applicationId] || r[p.applicationId].status === 'accepted');
  const fromSite = getApplications()
    .filter((a) => r[a.id] && r[a.id].status === 'accepted')
    .map((a) => ({ id: a.id, name: a.nom, business: a.nom, bizKey: 'mt_biz_site', stageText: a.stade, languages: ['fr'], priorities: ['area_business_model', 'area_market'], fromSite: true }));
  return [...fromSite, ...demo];
}

// Pairings made on this page (shared by the whole staff team)
const MATCHES_KEY = 'i2enf_matches';
const getMatches = () => { try { return JSON.parse(localStorage.getItem(MATCHES_KEY) || '{}'); } catch { return {}; } };
const saveMatches = (m) => localStorage.setItem(MATCHES_KEY, JSON.stringify(m));

const toMatch = () => acceptedPeople().filter((p) => !getMatches()[p.id]);
const loadOf = (mentor) => mentor.load + Object.values(getMatches()).filter((m) => m.mentorId === mentor.id).length;
const seatsLeft = (mentor) => Math.max(0, mentor.capacity - loadOf(mentor));

// Compatibility score out of 100, with the reasons shown to staff
function scoreFor(person, mentor) {
  const hits = person.priorities.filter((a) => mentor.expertise.includes(a));
  const sector = person.sector && mentor.sectors.includes(person.sector);
  const language = person.languages.find((l) => mentor.languages.includes(l));
  const left = seatsLeft(mentor);
  let score = 20 + hits.length * 25 + (sector ? 12 : 0) + (language ? 12 : 0) + Math.min(left, 3) * 3;
  if (!hits.length) score -= 10;
  return { score: Math.max(5, Math.min(98, score)), hits, sector, language, left };
}

const view = { selected: null };
let pending = null;
const initials = (name) => name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
const stageLabel = (p) => (p.stage ? t(`mt_stage_${p.stage}`) : p.stageText || '');
const CHECK = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';
const DASH = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" aria-hidden="true"><path d="M6 12h12"/></svg>';

const STAT_ICONS = {
  person: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>',
  pair: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20v-1a5 5 0 015-5h1M22 20v-1a5 5 0 00-5-5h-1"/></svg>',
  mentor: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21v-1a7 7 0 0114 0v1"/><path d="M16 3.1a4 4 0 010 7.8M22 21v-1a7 7 0 00-4-6.3"/></svg>',
  seat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
};

// ---- Rendering ----
function renderIntro() {
  document.getElementById('mt-intro').textContent = cohortLabel('mt_intro');
}

function renderStats() {
  const waiting = toMatch().length;
  const available = POOL.filter((m) => seatsLeft(m) > 0).length;
  const seats = POOL.reduce((s, m) => s + seatsLeft(m), 0);
  const stats = [
    { icon: STAT_ICONS.person, label: t('mt_stat_to_match'), value: waiting, note: t('mt_stat_to_match_note'), alert: waiting > 0 },
    { icon: STAT_ICONS.pair, label: t('mt_stat_active'), value: ACTIVE_PAIRINGS + Object.keys(getMatches()).length, note: t('mt_stat_active_note') },
    { icon: STAT_ICONS.mentor, label: t('mt_stat_mentors'), value: available, note: t('mt_stat_mentors_note', { n: POOL.length }) },
    { icon: STAT_ICONS.seat, label: t('mt_stat_seats'), value: seats, note: t('mt_stat_seats_note') },
  ];
  document.getElementById('mt-stats').innerHTML = stats.map((s) => `
    <div class="mt-stat ${s.alert ? 'is-alert' : ''}">
      <span class="mt-stat-icon">${s.icon}</span>
      <div class="mt-stat-body">
        <span class="mt-stat-label">${s.label}</span>
        <span class="mt-stat-value">${s.value}</span>
        <span class="mt-stat-note">${s.note}</span>
      </div>
    </div>`).join('');
}

function renderPeople() {
  const people = toMatch();
  if (!people.some((p) => p.id === view.selected)) view.selected = people[0] ? people[0].id : null;
  document.getElementById('mt-to-match-count').textContent = t('mt_to_match_count', { n: people.length });
  document.getElementById('mt-people').innerHTML = people.length
    ? people.map((p) => `
      <button type="button" class="mt-person" role="radio" aria-checked="${p.id === view.selected}" data-person="${escapeHtml(p.id)}">
        <span class="mt-person-top">
          <span class="user-avatar">${escapeHtml(initials(p.name))}</span>
          <span class="mt-person-name">
            <strong>${escapeHtml(p.name)}${p.fromSite ? `<span class="pill pill-current">${t('mt_from_site')}</span>` : ''}</strong>
            <small>${p.fromSite ? t(p.bizKey) : `${escapeHtml(p.business)} · ${t(p.bizKey)}`}</small>
          </span>
        </span>
        <span class="mt-person-meta">
          ${stageLabel(p) ? `<span class="tag">${escapeHtml(stageLabel(p))}</span>` : ''}
          ${p.sector ? `<span class="tag">${t(SECTOR_KEYS[p.sector])}</span>` : ''}
          <span class="tag">${p.languages.map((l) => l.toUpperCase()).join(' · ')}</span>
          ${p.priorities.map((a) => `<span class="tag mt-priority">${t(a)}</span>`).join('')}
        </span>
      </button>`).join('')
    : `<p class="mt-empty">${t('mt_all_matched')}</p>`;
}

function renderRecent() {
  const matches = getMatches();
  const everyone = [...acceptedPeople(), ...DEMO_PEOPLE];
  const entries = Object.entries(matches)
    .map(([personId, m]) => ({ person: everyone.find((p) => p.id === personId), mentor: POOL.find((x) => x.id === m.mentorId), date: new Date(m.date), personId }))
    .filter((e) => e.person && e.mentor)
    .sort((a, b) => b.date - a.date);
  document.getElementById('mt-recent-block').hidden = !entries.length;
  document.getElementById('mt-recent').innerHTML = entries.map((e) => `
    <li>${CHECK}<span><strong>${escapeHtml(e.person.name)}</strong> ↔ ${e.mentor.name}</span><small>${relativeDay(e.date)}</small>
      <button type="button" class="btn-text" data-undo="${escapeHtml(e.personId)}">${t('mt_undo')}</button></li>`).join('');
}

function renderSuggestions() {
  const person = toMatch().find((p) => p.id === view.selected);
  document.getElementById('mt-suggestions-card').hidden = !person;
  if (!person) return;
  document.getElementById('mt-suggestions-title').textContent = t('mt_suggestions_for', { name: person.name });

  const ranked = POOL.map((m) => ({ mentor: m, ...scoreFor(person, m) }))
    .sort((a, b) => (b.left > 0) - (a.left > 0) || b.score - a.score);

  document.getElementById('mt-suggestions').innerHTML = ranked.map((r, i) => {
    const full = r.left === 0;
    const reasons = [
      ...(r.hits.length ? r.hits.map((a) => `<li>${CHECK}${t('mt_reason_expertise', { area: t(a) })}</li>`) : [`<li class="miss">${DASH}${t('mt_reason_no_expertise')}</li>`]),
      r.sector ? `<li>${CHECK}${t('mt_reason_sector', { sector: t(SECTOR_KEYS[person.sector]) })}</li>` : '',
      r.language ? `<li>${CHECK}${t('mt_reason_language', { lang: t(`lang_word_${r.language}`) })}</li>` : `<li class="miss">${DASH}${t('mt_reason_language_miss')}</li>`,
      full ? '' : `<li>${CHECK}${r.left === 1 ? t('mt_reason_seat') : t('mt_reason_seats', { n: r.left })}</li>`,
    ].join('');
    return `
      <li class="mt-suggestion ${i === 0 && !full ? 'is-best' : ''} ${full ? 'is-full' : ''}">
        <span class="mt-score" style="--score:${r.score}"><strong>${r.score}</strong><small>${t('mt_match_word')}</small></span>
        <div class="mt-mentor">
          <span class="mt-mentor-name">${r.mentor.name}${i === 0 && !full ? `<span class="pill pill-current">${t('mt_best')}</span>` : ''}${full ? `<span class="pill pill-muted">${t('mt_full')}</span>` : ''}</span>
          <small>${t(r.mentor.titleKey)}</small>
          <ul class="mt-reasons">${reasons}</ul>
        </div>
        <button type="button" class="${i === 0 && !full ? 'btn-primary' : 'btn-outline'} btn-sm" data-match="${r.mentor.id}" ${full ? 'disabled' : ''}>${t('mt_choose')}</button>
      </li>`;
  }).join('');
}

function renderPool() {
  document.getElementById('mt-pool-count').textContent = t('mt_pool_count', { n: POOL.length });
  document.getElementById('mt-pool').innerHTML = POOL.map((m) => {
    const load = loadOf(m);
    const full = load >= m.capacity;
    return `
      <li class="mt-pool-row">
        <div class="mt-pool-person"><span class="user-avatar">${m.initials}</span><div><strong>${m.name}</strong><small>${t(m.titleKey)}</small></div></div>
        <div class="mt-cell"><span class="mt-cell-label">${t('mt_col_expertise')}</span><div class="tag-list">${m.expertise.map((a) => `<span class="tag">${t(a)}</span>`).join('')}</div></div>
        <div class="mt-cell"><span class="mt-cell-label">${t('mt_col_languages')}</span>${m.languages.map((l) => l.toUpperCase()).join(' · ')}</div>
        <div class="mt-cell mt-load ${full ? 'is-full' : ''}">
          <span class="mt-cell-label">${t('mt_col_load')}</span>
          <div class="mt-load-top"><span>${t('mt_load', { n: load, max: m.capacity })}</span><span class="pill ${full ? 'pill-muted' : 'pill-open'}">${t(full ? 'mt_full' : 'mt_open')}</span></div>
          <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, Math.round((load / m.capacity) * 100))}%"></div></div>
        </div>
      </li>`;
  }).join('');
}

function render() {
  renderIntro();
  renderStats();
  renderPeople();
  renderRecent();
  renderSuggestions();
  renderPool();
}

// ---- Actions ----
function setup() {
  document.getElementById('mt-people').addEventListener('click', (e) => {
    const card = e.target.closest('[data-person]');
    if (!card) return;
    view.selected = card.dataset.person;
    renderPeople();
    renderSuggestions();
    if (window.innerWidth <= 1100) document.getElementById('mt-suggestions-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const dialog = document.getElementById('match-dialog');
  document.getElementById('mt-suggestions').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-match]');
    if (!btn || btn.disabled) return;
    const person = toMatch().find((p) => p.id === view.selected);
    const mentor = POOL.find((m) => m.id === btn.dataset.match);
    pending = { personId: person.id, mentorId: mentor.id };
    document.getElementById('match-text').textContent = t('mt_confirm_text', { person: person.name, mentor: mentor.name });
    document.getElementById('match-message').value = '';
    dialog.showModal();
  });

  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'confirm' && pending) {
      const matches = getMatches();
      matches[pending.personId] = { mentorId: pending.mentorId, date: new Date().toISOString(), message: document.getElementById('match-message').value.trim() };
      saveMatches(matches);
      view.selected = null; // the next person to match is selected automatically
      render();
      showAlert('success', 'mt_matched_title', ['mt_matched_body']);
    }
    pending = null;
  });

  document.getElementById('mt-recent').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-undo]');
    if (!btn) return;
    const matches = getMatches();
    delete matches[btn.dataset.undo];
    saveMatches(matches);
    view.selected = btn.dataset.undo;
    render();
    showAlert('success', 'mt_undone_title', ['mt_undone_body']);
  });
}

initAppPage({ page: 'matching', role: 'staff', render, setup });
