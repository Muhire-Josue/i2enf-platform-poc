// diagnostic.js — "Mon diagnostic": results of the initial diagnostic, priorities,
// the journey plan, and the mid-program reassessment questionnaire.
// Header, login check, helpers and shared data come from shared/app.js.

Object.assign(translations.fr, {
  diag_title: "Mon diagnostic",
  diag_intro: "Diagnostic initial complété le {done} · Réévaluation de mi-parcours prévue le {next}",
  diag_intro_updated: "Réévaluation complétée le {date} · Diagnostic initial du {done}",
  diag_download: "Voir le rapport complet",
  diag_reassess: "Commencer la réévaluation",
  diag_reassess_again: "Refaire la réévaluation",
  diag_score_title: "Score global",
  diag_score_out_of: "sur 100",
  diag_stage_label: "Stade évalué",
  stage_1: "Idéation", stage_2: "Démarrage", stage_3: "Consolidation", stage_4: "Croissance",
  diag_score_text: "Votre projet a des bases solides. Les finances et les aspects juridiques sont les domaines où l'accompagnement fera le plus de différence.",
  diag_score_text_generic: "Votre plan d'accompagnement se concentre sur les domaines où votre score est le plus bas.",
  diag_next_check: "Prochaine réévaluation : {date}",
  diag_areas_title: "Résultats par domaine",
  level_strong: "Acquis", level_develop: "À développer", level_priority: "Prioritaire",
  diag_initial_score: "initial : {n}",
  diag_priorities_title: "Vos priorités",
  diag_priorities_sub: "Les trois domaines où un accompagnement fera le plus de différence, avec les actions déjà prévues dans votre plan.",
  diag_action_mentor: "Séance de mentorat",
  diag_action_workshop: "Atelier",
  diag_action_resource: "Ressource",
  diag_book: "Réserver une séance",
  diag_plan_title: "Mon plan de parcours",
  diag_plan_sub: "Créé à partir de votre diagnostic. Chaque jalon a une date cible et sera révisé à la réévaluation de mi-parcours.",
  diag_plan_count: "{done} sur {total} complétés",
  diag_done_on: "Complété le {date}",
  diag_due_on: "Échéance : {date}",
  diag_planned_on: "Prévu le {date}",
  diag_in_progress: "En cours",
  diag_done: "Complété",
  // Priority content for each area
  pr_finance_title: "Structurer vos finances",
  pr_finance_text: "Vos revenus prévus ne sont pas encore reliés à vos coûts. Un plan financier sur 12 mois vous aidera à fixer vos prix et à préparer une demande de financement.",
  pr_finance_a1: "Plan financier avec votre mentor",
  pr_finance_a2: "Fiscalité canadienne pour les PME",
  pr_legal_title: "Enregistrer et protéger l'entreprise",
  pr_legal_text: "Votre entreprise n'est pas encore enregistrée. Le choix de la structure juridique aura un effet sur vos impôts, votre responsabilité et votre accès au financement.",
  pr_legal_a1: "Choisir une structure juridique",
  pr_legal_a2: "Guide : enregistrer une entreprise en Ontario et obtenir un numéro de TVH",
  pr_marketing_title: "Trouver vos premiers clients",
  pr_marketing_text: "Vous connaissez bien votre clientèle, mais vous n'avez pas encore de plan pour la joindre. Un plan de lancement simple vous aidera à obtenir vos premières ventes.",
  pr_marketing_a1: "Plan de lancement avec une experte en marketing",
  pr_marketing_a2: "Le marketing numérique local",
  pr_management_title: "Organiser votre temps et vos priorités",
  pr_management_text: "Vous portez encore tous les rôles de l'entreprise. Clarifier vos priorités vous permettra d'avancer plus vite sur les jalons clés.",
  pr_management_a1: "Gestion des priorités avec votre mentor",
  pr_management_a2: "Outils de gestion pour entrepreneurs",
  pr_market_title: "Valider votre marché",
  pr_market_text: "Vous avez une bonne intuition de votre marché. Des entretiens avec de vrais clients vous permettront de confirmer la demande avant d'investir davantage.",
  pr_market_a1: "Préparer vos entretiens clients",
  pr_market_a2: "Modèle : sondage de validation",
  pr_business_model_title: "Préciser votre modèle d'affaires",
  pr_business_model_text: "Votre offre est claire, mais la façon dont l'entreprise générera des revenus reste à préciser.",
  pr_business_model_a1: "Atelier sur le modèle d'affaires",
  pr_business_model_a2: "Canevas de modèle d'affaires",
  // Journey plan descriptions
  m1_desc: "Questionnaire d'entrée complété et plan de parcours créé avec votre conseillère.",
  m2_desc: "Décrire clairement le problème que vous réglez, pour qui, et ce qui vous distingue.",
  m3_desc: "Sondage auprès de 40 clients potentiels et analyse de trois concurrents locaux.",
  m4_desc: "Prévisions de ventes, coûts de démarrage et flux de trésorerie sur 12 mois.",
  m5_desc: "Choisir la structure juridique, enregistrer l'entreprise et s'inscrire à la TVH.",
  m6_desc: "Refaire le diagnostic pour mesurer vos progrès et ajuster le plan.",
  m7_desc: "Présenter votre projet et vos résultats devant le comité de SOFIFRAN.",
  // Questionnaire
  quiz_step: "Question {n} sur {total}",
  quiz_prev: "Précédent",
  quiz_next: "Suivant",
  quiz_finish: "Voir mes résultats",
  quiz_cancel: "Quitter",
  quiz_saved_title: "Réévaluation enregistrée",
  quiz_saved_body: "Vos résultats et vos priorités ont été mis à jour.",
  q_business_model: "Comment votre entreprise va-t-elle générer des revenus?",
  q_business_model_o1: "Je ne l'ai pas encore défini",
  q_business_model_o2: "J'ai une idée générale",
  q_business_model_o3: "Mes sources de revenus et mes prix sont définis",
  q_business_model_o4: "Mon modèle est validé par de premières ventes",
  q_market: "Que savez-vous de vos clients cibles?",
  q_market_o1: "Je n'ai pas encore fait de recherche",
  q_market_o2: "J'en ai parlé à quelques personnes",
  q_market_o3: "J'ai sondé des clients potentiels",
  q_market_o4: "J'ai des clients qui paient déjà",
  q_finance: "Où en sont vos prévisions financières?",
  q_finance_o1: "Pas encore commencées",
  q_finance_o2: "Quelques estimations",
  q_finance_o3: "Prévisions complètes sur 12 mois",
  q_finance_o4: "Prévisions révisées avec un professionnel",
  q_legal: "Où en est l'enregistrement de votre entreprise?",
  q_legal_o1: "Je ne sais pas par où commencer",
  q_legal_o2: "Je me renseigne sur les structures possibles",
  q_legal_o3: "La structure est choisie, l'enregistrement est en cours",
  q_legal_o4: "Entreprise enregistrée et inscrite à la TVH",
  q_marketing: "Avez-vous un plan pour joindre vos clients?",
  q_marketing_o1: "Pas encore",
  q_marketing_o2: "Quelques idées",
  q_marketing_o3: "Un plan avec des canaux et un budget",
  q_marketing_o4: "Un plan en action, avec des résultats mesurés",
  q_management: "Comment organisez-vous votre temps et vos priorités?",
  q_management_o1: "Au jour le jour",
  q_management_o2: "Une liste de tâches",
  q_management_o3: "Des objectifs hebdomadaires",
  q_management_o4: "Des objectifs suivis, avec de l'aide au besoin",
});

Object.assign(translations.en, {
  diag_title: "My diagnostic",
  diag_intro: "Initial diagnostic completed {done} · Mid-program reassessment planned for {next}",
  diag_intro_updated: "Reassessment completed {date} · Initial diagnostic from {done}",
  diag_download: "View the full report",
  diag_reassess: "Start the reassessment",
  diag_reassess_again: "Retake the reassessment",
  diag_score_title: "Overall score",
  diag_score_out_of: "out of 100",
  diag_stage_label: "Assessed stage",
  stage_1: "Ideation", stage_2: "Startup", stage_3: "Consolidation", stage_4: "Growth",
  diag_score_text: "Your project has solid foundations. Finance and legal matters are where support will make the biggest difference.",
  diag_score_text_generic: "Your support plan focuses on the areas where your score is lowest.",
  diag_next_check: "Next reassessment: {date}",
  diag_areas_title: "Results by area",
  level_strong: "Strong", level_develop: "To develop", level_priority: "Priority",
  diag_initial_score: "initial: {n}",
  diag_priorities_title: "Your priorities",
  diag_priorities_sub: "The three areas where support will make the biggest difference, with the actions already in your plan.",
  diag_action_mentor: "Mentoring session",
  diag_action_workshop: "Workshop",
  diag_action_resource: "Resource",
  diag_book: "Book a session",
  diag_plan_title: "My journey plan",
  diag_plan_sub: "Built from your diagnostic. Each milestone has a target date and will be reviewed at the mid-program reassessment.",
  diag_plan_count: "{done} of {total} completed",
  diag_done_on: "Completed {date}",
  diag_due_on: "Due {date}",
  diag_planned_on: "Planned for {date}",
  diag_in_progress: "In progress",
  diag_done: "Completed",
  pr_finance_title: "Structure your finances",
  pr_finance_text: "Your expected revenue isn't yet tied to your costs. A 12-month financial plan will help you set your prices and prepare a funding application.",
  pr_finance_a1: "Financial plan with your mentor",
  pr_finance_a2: "Canadian taxation for small businesses",
  pr_legal_title: "Register and protect the business",
  pr_legal_text: "Your business isn't registered yet. The legal structure you choose affects your taxes, your liability and your access to funding.",
  pr_legal_a1: "Choosing a legal structure",
  pr_legal_a2: "Guide: registering a business in Ontario and getting an HST number",
  pr_marketing_title: "Find your first customers",
  pr_marketing_text: "You know your customers well, but you don't have a plan to reach them yet. A simple launch plan will help you make your first sales.",
  pr_marketing_a1: "Launch plan with a marketing expert",
  pr_marketing_a2: "Local digital marketing",
  pr_management_title: "Organize your time and priorities",
  pr_management_text: "You're still wearing every hat in the business. Clarifying your priorities will help you move faster on key milestones.",
  pr_management_a1: "Priority setting with your mentor",
  pr_management_a2: "Management tools for entrepreneurs",
  pr_market_title: "Validate your market",
  pr_market_text: "You have a good sense of your market. Interviews with real customers will confirm demand before you invest more.",
  pr_market_a1: "Preparing your customer interviews",
  pr_market_a2: "Template: validation survey",
  pr_business_model_title: "Clarify your business model",
  pr_business_model_text: "Your offer is clear, but how the business will earn revenue still needs work.",
  pr_business_model_a1: "Business model workshop",
  pr_business_model_a2: "Business model canvas",
  m1_desc: "Entry questionnaire completed and journey plan created with your advisor.",
  m2_desc: "Clearly describe the problem you solve, for whom, and what sets you apart.",
  m3_desc: "Survey of 40 potential customers and review of three local competitors.",
  m4_desc: "Sales forecast, startup costs and 12-month cash flow.",
  m5_desc: "Choose the legal structure, register the business and sign up for HST.",
  m6_desc: "Retake the diagnostic to measure your progress and adjust the plan.",
  m7_desc: "Present your project and results to the SOFIFRAN committee.",
  quiz_step: "Question {n} of {total}",
  quiz_prev: "Back",
  quiz_next: "Next",
  quiz_finish: "See my results",
  quiz_cancel: "Exit",
  quiz_saved_title: "Reassessment saved",
  quiz_saved_body: "Your results and priorities have been updated.",
  q_business_model: "How will your business earn revenue?",
  q_business_model_o1: "I haven't defined it yet",
  q_business_model_o2: "I have a general idea",
  q_business_model_o3: "My revenue sources and prices are set",
  q_business_model_o4: "My model is proven by first sales",
  q_market: "What do you know about your target customers?",
  q_market_o1: "I haven't done any research yet",
  q_market_o2: "I've talked to a few people",
  q_market_o3: "I've surveyed potential customers",
  q_market_o4: "I already have paying customers",
  q_finance: "Where are your financial forecasts at?",
  q_finance_o1: "Not started yet",
  q_finance_o2: "A few estimates",
  q_finance_o3: "Complete 12-month forecasts",
  q_finance_o4: "Forecasts reviewed by a professional",
  q_legal: "Where is your business registration at?",
  q_legal_o1: "I don't know where to start",
  q_legal_o2: "I'm looking into possible structures",
  q_legal_o3: "Structure chosen, registration in progress",
  q_legal_o4: "Business registered and signed up for HST",
  q_marketing: "Do you have a plan to reach your customers?",
  q_marketing_o1: "Not yet",
  q_marketing_o2: "A few ideas",
  q_marketing_o3: "A plan with channels and a budget",
  q_marketing_o4: "A plan in action, with measured results",
  q_management: "How do you organize your time and priorities?",
  q_management_o1: "Day by day",
  q_management_o2: "A to-do list",
  q_management_o3: "Weekly goals",
  q_management_o4: "Tracked goals, with help when needed",
});

// ---- Diagnostic data ----
// Scores from the initial diagnostic (0–100 per area)
const AREAS = ['business_model', 'market', 'finance', 'legal', 'marketing', 'management'];
const INITIAL_SCORES = { business_model: 74, market: 68, finance: 41, legal: 36, marketing: 57, management: 63 };
const DIAG_DONE = daysFromNow(-24);
const NEXT_CHECK = MILESTONES.find((m) => m.key === 'dash_m6').date;

// Each questionnaire answer (1 to 4) becomes a score for its area
const ANSWER_SCORES = [20, 45, 70, 92];

// Which actions support each area (mentor, workshop or resource)
const PRIORITY_ACTIONS = {
  finance: [['mentor', 'pr_finance_a1'], ['workshop', 'pr_finance_a2']],
  legal: [['mentor', 'pr_legal_a1'], ['resource', 'pr_legal_a2']],
  marketing: [['mentor', 'pr_marketing_a1'], ['workshop', 'pr_marketing_a2']],
  management: [['mentor', 'pr_management_a1'], ['resource', 'pr_management_a2']],
  market: [['mentor', 'pr_market_a1'], ['resource', 'pr_market_a2']],
  business_model: [['workshop', 'pr_business_model_a1'], ['resource', 'pr_business_model_a2']],
};

const ACTION_ICONS = {
  mentor: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0116 0v1"/></svg>',
  workshop: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
  resource: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z"/></svg>',
  calendar: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
};

function getReassessment() {
  const saved = readStore('reassessment', null);
  return saved ? { ...saved, date: new Date(saved.date) } : null;
}
const currentScores = () => (getReassessment() || { scores: INITIAL_SCORES }).scores;
const overallScore = (scores) => Math.round(AREAS.reduce((sum, a) => sum + scores[a], 0) / AREAS.length);
const levelOf = (score) => (score >= 70 ? 'strong' : score >= 50 ? 'develop' : 'priority');
const stageOf = (score) => (score < 40 ? 'stage_1' : score < 60 ? 'stage_2' : score < 80 ? 'stage_3' : 'stage_4');

// ---- Results ----
function renderIntro() {
  const re = getReassessment();
  document.getElementById('diag-intro').textContent = re
    ? t('diag_intro_updated', { date: shortDay(re.date), done: shortDay(DIAG_DONE) })
    : t('diag_intro', { done: shortDay(DIAG_DONE), next: shortDay(NEXT_CHECK) });
  document.getElementById('start-reassess').textContent = t(re ? 'diag_reassess_again' : 'diag_reassess');
}

function renderScore() {
  const scores = currentScores();
  const score = overallScore(scores);
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  document.getElementById('score-card').innerHTML = `
    <h2>${t('diag_score_title')}</h2>
    <div class="score-ring-wrap">
      <div class="score-ring">
        <svg width="132" height="132" viewBox="0 0 132 132" aria-hidden="true">
          <circle cx="66" cy="66" r="${radius}" fill="none" stroke="rgba(250,247,242,0.14)" stroke-width="12"/>
          <circle cx="66" cy="66" r="${radius}" fill="none" stroke="#D9A574" stroke-width="12" stroke-linecap="round"
            stroke-dasharray="${circumference}" stroke-dashoffset="${circumference * (1 - score / 100)}"/>
        </svg>
        <div class="score-ring-value"><strong>${score}</strong><span>${t('diag_score_out_of')}</span></div>
      </div>
      <div class="score-stage">
        <small>${t('diag_stage_label')}</small>
        <strong>${t(stageOf(score))}</strong>
      </div>
    </div>
    <p>${getReassessment() ? t('diag_score_text_generic') : t('diag_score_text')}</p>
    <div class="score-next">${ACTION_ICONS.calendar}<span>${t('diag_next_check', { date: `<strong>${longDay(NEXT_CHECK)}</strong>` })}</span></div>`;
}

function renderAreas() {
  const re = getReassessment();
  const scores = currentScores();
  document.getElementById('level-legend').innerHTML = ['strong', 'develop', 'priority']
    .map((level) => `<span class="level-${level}"><span class="level-dot"></span>${t(`level_${level}`)}</span>`).join('');

  document.getElementById('areas').innerHTML = AREAS.map((area) => {
    const score = scores[area];
    const level = levelOf(score);
    const diff = re ? score - INITIAL_SCORES[area] : 0;
    const change = re && diff !== 0
      ? `<span class="area-change ${diff > 0 ? 'up' : 'down'}">${diff > 0 ? '+' : ''}${diff}</span><span class="area-was">${t('diag_initial_score', { n: INITIAL_SCORES[area] })}</span>`
      : '';
    return `
      <li class="area-row level-${level}">
        <div class="area-top">
          <span class="area-name">${t(`area_${area}`)}</span>
          <span class="area-score">${change}<span class="level-pill">${t(`level_${level}`)}</span>${score}</span>
        </div>
        <div class="area-track"><div class="area-fill" style="width:${score}%"></div></div>
      </li>`;
  }).join('');
}

function renderPriorities() {
  const scores = currentScores();
  const lowest = [...AREAS].sort((a, b) => scores[a] - scores[b]).slice(0, 3);
  document.getElementById('priorities').innerHTML = lowest.map((area) => {
    const level = levelOf(scores[area]);
    const actions = PRIORITY_ACTIONS[area].map(([type, key]) => `
      <li>
        <span class="action-icon">${ACTION_ICONS[type]}</span>
        <span><small>${t(`diag_action_${type}`)}</small>${t(key)}</span>
      </li>`).join('');
    return `
      <article class="dash-card priority-card level-${level}">
        <div class="priority-head">
          <span class="priority-area">${t(`area_${area}`)}</span>
          <span class="level-pill">${scores[area]} / 100</span>
        </div>
        <h3>${t(`pr_${area}_title`)}</h3>
        <p>${t(`pr_${area}_text`)}</p>
        <ul class="priority-actions">${actions}</ul>
        <a href="book-session.html" class="btn-outline btn-sm">${t('diag_book')}</a>
      </article>`;
  }).join('');
}

function renderPlan() {
  const done = MILESTONES.filter((m) => m.status === 'done').length;
  document.getElementById('plan-count').textContent = t('diag_plan_count', { done, total: MILESTONES.length });
  document.getElementById('plan-progress-fill').style.width = `${Math.round((done / MILESTONES.length) * 100)}%`;

  document.getElementById('plan').innerHTML = MILESTONES.map((m) => {
    const dateText = m.status === 'done' ? t('diag_done_on', { date: shortDay(m.date) })
      : m.status === 'current' ? t('diag_due_on', { date: shortDay(m.date) })
      : t('diag_planned_on', { date: shortDay(m.date) });
    const statusPill = m.status === 'done' ? `<span class="pill pill-done">${t('diag_done')}</span>`
      : m.status === 'current' ? `<span class="pill pill-current">${t('diag_in_progress')}</span>` : '';
    return `
      <li class="milestone ${m.status}">
        <span class="milestone-marker">${m.status === 'done' ? ICONS.check : ''}</span>
        <div class="milestone-body">
          <span class="milestone-title">${t(m.key)}</span>
          <p class="milestone-desc">${t(m.desc)}</p>
          <div class="milestone-meta">
            <span class="milestone-date">${dateText}</span>
            ${statusPill}
            ${m.area ? `<span class="tag">${t(m.area)}</span>` : ''}
          </div>
        </div>
      </li>`;
  }).join('');
}

// ---- Reassessment questionnaire ----
const quiz = { index: 0, answers: {} };

function renderQuiz() {
  const area = AREAS[quiz.index];
  const selected = quiz.answers[area];
  document.getElementById('quiz-step').textContent = t('quiz_step', { n: quiz.index + 1, total: AREAS.length });
  document.getElementById('quiz-progress').style.width = `${((quiz.index + 1) / AREAS.length) * 100}%`;
  document.getElementById('quiz-area').textContent = t(`area_${area}`);
  document.getElementById('quiz-question').textContent = t(`q_${area}`);
  document.getElementById('quiz-options').innerHTML = [1, 2, 3, 4].map((n) => `
    <button type="button" class="quiz-option" role="radio" aria-checked="${selected === n}" data-answer="${n}">
      <span class="quiz-radio"></span><span>${t(`q_${area}_o${n}`)}</span>
    </button>`).join('');
  document.getElementById('quiz-prev').disabled = quiz.index === 0;
  const next = document.getElementById('quiz-next');
  next.textContent = t(quiz.index === AREAS.length - 1 ? 'quiz_finish' : 'quiz_next');
  next.disabled = !selected;
}

function showQuiz(show) {
  document.getElementById('quiz').hidden = !show;
  document.getElementById('results').hidden = show;
  document.getElementById('results-actions').hidden = show;
  if (show) {
    clearAlerts();
    renderQuiz();
    document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function finishQuiz() {
  const scores = {};
  AREAS.forEach((area) => { scores[area] = ANSWER_SCORES[quiz.answers[area] - 1]; });
  writeStore('reassessment', { date: new Date().toISOString(), scores, answers: quiz.answers });
  showQuiz(false);
  render();
  showAlert('success', 'quiz_saved_title', ['quiz_saved_body']);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---- Page ----
function render() {
  renderIntro();
  renderScore();
  renderAreas();
  renderPriorities();
  renderPlan();
  if (!document.getElementById('quiz').hidden) renderQuiz();
}

function setup() {
  document.getElementById('start-reassess').addEventListener('click', () => {
    quiz.index = 0;
    quiz.answers = { ...((getReassessment() || {}).answers || {}) };
    showQuiz(true);
  });
  document.getElementById('quiz-cancel').addEventListener('click', () => showQuiz(false));
  document.getElementById('quiz-options').addEventListener('click', (e) => {
    const option = e.target.closest('[data-answer]');
    if (!option) return;
    quiz.answers[AREAS[quiz.index]] = Number(option.dataset.answer);
    renderQuiz();
  });
  document.getElementById('quiz-prev').addEventListener('click', () => { quiz.index -= 1; renderQuiz(); });
  document.getElementById('quiz-next').addEventListener('click', () => {
    if (quiz.index === AREAS.length - 1) finishQuiz();
    else { quiz.index += 1; renderQuiz(); }
  });
}

initAppPage({ page: 'diagnostic', render, setup });
