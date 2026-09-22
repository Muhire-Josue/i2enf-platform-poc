// shared/i18n.js — bilingual text + live language toggle, no page reload needed.
// Every page's static text uses data-i18n="key" instead of hardcoded French or
// English, so the two languages can never drift out of sync across files.

const translations = {
  fr: {
    nav_criteria: "Critères",
    nav_cohorts: "Cohortes",
    nav_apply: "Candidature",
    nav_login: "Se connecter",
    hero_kicker: "Incubateur intégré",
    hero_title: "L'entrepreneuriat francophone, accompagné du début à la croissance",
    hero_body: "Diagnostic personnalisé, mentorat, formations et une communauté d'entrepreneurs francophones — un accompagnement complet pour transformer une idée en entreprise.",
    hero_cta_primary: "Faire une demande",
    hero_cta_secondary: "Voir les critères",
    hero_photo_placeholder: "[PHOTO D'ÉQUIPE I2ENF]",
    value_diagnostic_title: "Diagnostic personnalisé",
    value_diagnostic_body: "Un plan de parcours adapté à votre stade de développement, réévalué à mi-parcours et à la sortie.",
    value_mentorship_title: "Mentorat",
    value_mentorship_body: "Jumelage avec des mentors d'expérience et des séances de suivi réservées directement en ligne.",
    value_community_title: "Communauté & formations",
    value_community_body: "Ateliers, modules en ligne et un réseau de pairs francophones pour avancer ensemble.",
    eligibility_kicker: "Admissibilité",
    eligibility_title: "Est-ce que l'I2ENF est pour vous?",
    eligibility_body: "Si vous répondez oui à ces critères, votre candidature sera considérée pour la prochaine cohorte.",
    eligibility_1: "Résider dans la région desservie par SOFIFRAN",
    eligibility_2: "Avoir une idée d'affaires ou une entreprise en démarrage",
    eligibility_3: "Pouvoir communiquer en français",
    eligibility_4: "S'engager à participer activement au programme",
    cohorts_kicker: "Calendrier",
    cohorts_title: "Prochaines cohortes",
    cohort_status_open: "Ouvert",
    cohort_status_upcoming: "À venir",
    cohort_winter: "Cohorte — Hiver",
    cohort_spring: "Cohorte — Printemps",
    cohort_summer: "Cohorte — Été",
    cohort_deadline: "Date limite : [DATE LIMITE]",
    cohort_start: "Début du programme : [DATE DE DÉBUT]",
    apply_kicker: "Candidature",
    apply_title: "Prêt à commencer?",
    apply_body: "Remplissez ce court formulaire — un membre de l'équipe communiquera avec vous.",
    apply_name: "Nom complet",
    apply_name_placeholder: "Votre nom",
    apply_email: "Courriel",
    apply_stage: "Stade de l'entreprise",
    apply_stage_idea: "Idée",
    apply_stage_validation: "Validation",
    apply_stage_startup: "Démarrage",
    apply_stage_growth: "Croissance",
    apply_description: "Décrivez votre projet",
    apply_description_placeholder: "Quelques phrases suffisent",
    apply_submit: "Soumettre ma demande",
    apply_success_title: "Demande envoyée",
    apply_success_body: "Merci! Votre candidature a été reçue et sera examinée par l'équipe SOFIFRAN.",
    footer_tagline: "Un programme de SOFIFRAN",
    footer_contact: "[COURRIEL DE CONTACT] · [ADRESSE]"
  },
  en: {
    nav_criteria: "Eligibility",
    nav_cohorts: "Cohorts",
    nav_apply: "Application",
    nav_login: "Log in",
    hero_kicker: "Integrated incubator",
    hero_title: "Francophone entrepreneurship, supported from start to growth",
    hero_body: "Personalized diagnostic, mentorship, training, and a community of francophone entrepreneurs — full support to turn an idea into a business.",
    hero_cta_primary: "Apply now",
    hero_cta_secondary: "See eligibility",
    hero_photo_placeholder: "[I2ENF TEAM PHOTO]",
    value_diagnostic_title: "Personalized diagnostic",
    value_diagnostic_body: "A journey plan tailored to your stage, reassessed mid-way and at exit.",
    value_mentorship_title: "Mentorship",
    value_mentorship_body: "Matched with experienced mentors, with sessions booked directly online.",
    value_community_title: "Community & training",
    value_community_body: "Workshops, online modules, and a network of francophone peers to grow together.",
    eligibility_kicker: "Eligibility",
    eligibility_title: "Is I2ENF right for you?",
    eligibility_body: "If you answer yes to these criteria, your application will be considered for the next cohort.",
    eligibility_1: "Reside in the region served by SOFIFRAN",
    eligibility_2: "Have a business idea or an early-stage business",
    eligibility_3: "Be able to communicate in French",
    eligibility_4: "Commit to actively participating in the program",
    cohorts_kicker: "Calendar",
    cohorts_title: "Upcoming cohorts",
    cohort_status_open: "Open",
    cohort_status_upcoming: "Upcoming",
    cohort_winter: "Winter Cohort",
    cohort_spring: "Spring Cohort",
    cohort_summer: "Summer Cohort",
    cohort_deadline: "Deadline: [DEADLINE DATE]",
    cohort_start: "Program start: [START DATE]",
    apply_kicker: "Application",
    apply_title: "Ready to get started?",
    apply_body: "Fill out this short form — a team member will reach out.",
    apply_name: "Full name",
    apply_name_placeholder: "Your name",
    apply_email: "Email",
    apply_stage: "Business stage",
    apply_stage_idea: "Idea",
    apply_stage_validation: "Validation",
    apply_stage_startup: "Startup",
    apply_stage_growth: "Growth",
    apply_description: "Describe your project",
    apply_description_placeholder: "A few sentences is enough",
    apply_submit: "Submit my application",
    apply_success_title: "Application sent",
    apply_success_body: "Thank you! Your application has been received and will be reviewed by the SOFIFRAN team.",
    footer_tagline: "A SOFIFRAN program",
    footer_contact: "[CONTACT EMAIL] · [ADDRESS]"
  }
};

function getLang() {
  return localStorage.getItem('i2enf_lang') || 'fr';
}

function setLang(lang) {
  localStorage.setItem('i2enf_lang', lang);
  applyTranslations();
}

function applyTranslations() {
  const lang = getLang();
  const dict = translations[lang];
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.setAttribute('placeholder', dict[key]);
  });

  document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

document.addEventListener('DOMContentLoaded', applyTranslations);
