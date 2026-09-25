// scheduling.js — staff "Ateliers et événements": upcoming and past events, registrants,
// reminders, cancellation and a form to create an event.
// Header and helpers come from shared/app.js, the staff menu from shared/staff.js.

Object.assign(translations.fr, {
  sch_title: "Ateliers et événements",
  sch_intro: "Cohorte {season} {year} · Semaine {week} sur {total}",
  sch_create: "Créer un événement",
  sch_stat_upcoming: "Événements à venir",
  sch_stat_upcoming_note: "Prochain : {date}",
  sch_stat_registered: "Inscriptions",
  sch_stat_registered_note: "Pour les événements à venir",
  sch_stat_fill: "Taux de remplissage",
  sch_stat_fill_note: "Places réservées",
  sch_stat_attendance: "Taux de présence",
  sch_stat_attendance_note: "Événements terminés",
  sch_upcoming: "À venir",
  sch_upcoming_count: "{n} à venir",
  sch_past: "Terminés",
  type_workshop: "Atelier",
  type_networking: "Réseautage",
  type_info: "Séance d'information",
  sch_online: "En ligne",
  sch_inperson: "En personne",
  sch_host: "Animé par {name}",
  sch_registered: "{n} inscrits sur {max}",
  sch_full: "Complet",
  sch_attended: "{n} présents sur {max} inscrits",
  sch_people: "Inscrits",
  sch_cancel: "Annuler",
  sch_new: "Nouveau",
  sch_none_upcoming: "Aucun événement à venir. Créez-en un pour la cohorte.",
  sch_people_meta: "{date} · {time} · {n} inscrits",
  sch_people_none: "Aucune inscription pour le moment.",
  sch_people_more: "et {n} autres personnes",
  sch_close: "Fermer",
  sch_remind: "Envoyer un rappel aux inscrits",
  sch_reminded_title: "Rappel envoyé",
  sch_reminded_body: "Les personnes inscrites ont reçu un courriel de rappel avec les détails de l'événement.",
  sch_cancel_title: "Annuler cet événement?",
  sch_cancel_text: "« {name} » du {date}. Les {n} personnes inscrites seront avisées par courriel.",
  sch_cancel_text_none: "« {name} » du {date}. Personne n'est encore inscrit.",
  sch_keep: "Garder l'événement",
  sch_cancel_confirm: "Annuler l'événement",
  sch_cancelled_title: "Événement annulé",
  sch_cancelled_body: "Les personnes inscrites ont été avisées par courriel.",
  sch_f_title: "Titre",
  sch_f_title_ph: "Ex. : Atelier sur le financement",
  sch_f_type: "Type",
  sch_f_host: "Animé par",
  sch_f_host_ph: "Nom de la personne ou de l'équipe",
  sch_f_date: "Date",
  sch_f_time: "Heure",
  sch_f_duration: "Durée",
  sch_f_format: "Format",
  sch_f_place: "Lieu",
  sch_f_capacity: "Nombre de places",
  sch_cancel_form: "Annuler",
  sch_publish: "Publier l'événement",
  sch_err_title: "Donnez un titre d'au moins 5 caractères.",
  sch_err_date: "Choisissez une date à venir.",
  sch_err_time: "Indiquez l'heure de début.",
  sch_err_place: "Indiquez le lieu de l'événement en personne.",
  sch_err_capacity: "Le nombre de places doit être entre 5 et 200.",
  sch_created_title: "Événement publié",
  sch_created_body: "Les participants de la cohorte ont reçu une invitation par courriel.",
  sch_team: "l'équipe SOFIFRAN",
  sch_ev_tax: "Atelier : la fiscalité canadienne pour les PME",
  sch_ev_network: "Soirée de réseautage de la cohorte",
  sch_ev_marketing: "Atelier : le marketing numérique local",
  sch_ev_info: "Séance d'information — Cohorte Hiver 2027",
  sch_ev_model: "Atelier : du concept au modèle d'affaires",
  sch_ev_launch: "Lancement de la cohorte",
});

Object.assign(translations.en, {
  sch_title: "Workshops and events",
  sch_intro: "{season} {year} cohort · Week {week} of {total}",
  sch_create: "Create an event",
  sch_stat_upcoming: "Upcoming events",
  sch_stat_upcoming_note: "Next: {date}",
  sch_stat_registered: "Registrations",
  sch_stat_registered_note: "For upcoming events",
  sch_stat_fill: "Fill rate",
  sch_stat_fill_note: "Seats booked",
  sch_stat_attendance: "Attendance rate",
  sch_stat_attendance_note: "Past events",
  sch_upcoming: "Upcoming",
  sch_upcoming_count: "{n} upcoming",
  sch_past: "Past",
  type_workshop: "Workshop",
  type_networking: "Networking",
  type_info: "Information session",
  sch_online: "Online",
  sch_inperson: "In person",
  sch_host: "Hosted by {name}",
  sch_registered: "{n} registered of {max}",
  sch_full: "Full",
  sch_attended: "{n} attended of {max} registered",
  sch_people: "Registrants",
  sch_cancel: "Cancel",
  sch_new: "New",
  sch_none_upcoming: "No upcoming events. Create one for the cohort.",
  sch_people_meta: "{date} · {time} · {n} registered",
  sch_people_none: "No registrations yet.",
  sch_people_more: "and {n} more people",
  sch_close: "Close",
  sch_remind: "Send a reminder to registrants",
  sch_reminded_title: "Reminder sent",
  sch_reminded_body: "Registrants received a reminder email with the event details.",
  sch_cancel_title: "Cancel this event?",
  sch_cancel_text: "\"{name}\" on {date}. The {n} registrants will be notified by email.",
  sch_cancel_text_none: "\"{name}\" on {date}. No one has registered yet.",
  sch_keep: "Keep the event",
  sch_cancel_confirm: "Cancel the event",
  sch_cancelled_title: "Event cancelled",
  sch_cancelled_body: "Registrants were notified by email.",
  sch_f_title: "Title",
  sch_f_title_ph: "E.g. Funding workshop",
  sch_f_type: "Type",
  sch_f_host: "Hosted by",
  sch_f_host_ph: "Name of the person or team",
  sch_f_date: "Date",
  sch_f_time: "Time",
  sch_f_duration: "Duration",
  sch_f_format: "Format",
  sch_f_place: "Location",
  sch_f_capacity: "Number of seats",
  sch_cancel_form: "Cancel",
  sch_publish: "Publish the event",
  sch_err_title: "Give a title of at least 5 characters.",
  sch_err_date: "Choose a future date.",
  sch_err_time: "Enter the start time.",
  sch_err_place: "Enter the location of the in-person event.",
  sch_err_capacity: "The number of seats must be between 5 and 200.",
  sch_created_title: "Event published",
  sch_created_body: "Cohort participants received an email invitation.",
  sch_team: "the SOFIFRAN team",
  sch_ev_tax: "Workshop: Canadian taxation for small businesses",
  sch_ev_network: "Cohort networking evening",
  sch_ev_marketing: "Workshop: local digital marketing",
  sch_ev_info: "Information session — Winter 2027 cohort",
  sch_ev_model: "Workshop: from concept to business model",
  sch_ev_launch: "Cohort launch",
});

// ---- Data ----
const TYPES = ['workshop', 'networking', 'info'];
const DURATIONS = [60, 90, 120];
const OFFICE = '150, rue Metcalfe, Ottawa';

// A past weekday (moved back to Friday if it lands on a weekend)
function pastWeekday(days, hour, minute) {
  const d = daysFromNow(days, hour, minute);
  while (d.getDay() === 0 || d.getDay() === 6) d.setDate(d.getDate() - 1);
  return d;
}

// Demo events: the three upcoming ones match the entrepreneur dashboard
function defaultEvents() {
  return [
    { id: 'e1', titleKey: 'sch_ev_tax', type: 'workshop', start: weekdayFromNow(4, 18, 0), duration: 90, format: 'online', host: 'Karim Diallo', capacity: 20, registered: 14 },
    { id: 'e2', titleKey: 'sch_ev_info', type: 'info', start: weekdayFromNow(6, 12, 0), duration: 60, format: 'online', host: 'Sophie Lavoie', capacity: 50, registered: 23 },
    { id: 'e3', titleKey: 'sch_ev_network', type: 'networking', start: weekdayFromNow(11, 17, 30), duration: 120, format: 'inperson', place: OFFICE, hostKey: 'sch_team', capacity: 40, registered: 18 },
    { id: 'e4', titleKey: 'sch_ev_marketing', type: 'workshop', start: weekdayFromNow(18, 12, 0), duration: 60, format: 'online', host: 'Nadia Belkacem', capacity: 20, registered: 9 },
    { id: 'p1', titleKey: 'sch_ev_model', type: 'workshop', start: pastWeekday(-8, 18, 0), duration: 90, format: 'online', host: 'Luc Tremblay', capacity: 20, registered: 16, attended: 13 },
    { id: 'p2', titleKey: 'sch_ev_launch', type: 'networking', start: pastWeekday(-24, 17, 0), duration: 120, format: 'inperson', place: OFFICE, hostKey: 'sch_team', capacity: 30, registered: 22, attended: 19 },
  ];
}

// People shown in registrant lists (cohort participants first)
const PEOPLE = ['Amélie Fortin', 'Samuel Ouellet', 'Fatou Ndiaye', 'Marc-André Pelletier', 'Isabelle Côté', 'Kevin Mbuyi',
  'Émilie Rousseau', 'Nour El-Amine', 'Julien Bélanger', 'Aïcha Traoré', 'Mariam Haddad', 'Thomas Lefebvre'];

// Events created or cancelled here are shared by the whole staff team
const CREATED_KEY = 'i2enf_events';
const CANCELLED_KEY = 'i2enf_events_cancelled';
const readShared = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; } };

function getEvents() {
  const created = readShared(CREATED_KEY, []).map((e) => ({ ...e, start: new Date(e.start) }));
  const cancelled = new Set(readShared(CANCELLED_KEY, []));
  return [...defaultEvents(), ...created].filter((e) => !cancelled.has(e.id));
}
const eventEnd = (e) => new Date(e.start.getTime() + e.duration * 60000);
const upcomingEvents = () => getEvents().filter((e) => eventEnd(e) > new Date()).sort((a, b) => a.start - b.start);
const pastEvents = () => getEvents().filter((e) => eventEnd(e) <= new Date()).sort((a, b) => b.start - a.start);
const eventTitle = (e) => (e.titleKey ? t(e.titleKey) : e.title);
const eventHost = (e) => (e.hostKey ? t(e.hostKey) : e.host);

const view = { justAdded: null };
let pendingId = null;
const initials = (name) => name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('');
const dateBlock = (d) => `<span class="event-date"><span class="event-day">${d.getDate()}</span><span class="event-month">${monthShort(d)}</span></span>`;

const STAT_ICONS = {
  calendar: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  people: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21v-1a7 7 0 0114 0v1"/><path d="M16 3.1a4 4 0 010 7.8M22 21v-1a7 7 0 00-4-6.3"/></svg>',
  fill: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="10" width="4" height="10" rx="1"/><rect x="10" y="6" width="4" height="14" rx="1"/><rect x="17" y="3" width="4" height="17" rx="1"/></svg>',
  check: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>',
};

// ---- Rendering ----
function renderIntro() {
  document.getElementById('sch-intro').textContent = cohortLabel('sch_intro');
}

function renderStats() {
  const up = upcomingEvents();
  const past = pastEvents();
  const registered = up.reduce((s, e) => s + e.registered, 0);
  const seats = up.reduce((s, e) => s + e.capacity, 0);
  const pastReg = past.reduce((s, e) => s + e.registered, 0);
  const attended = past.reduce((s, e) => s + (e.attended || 0), 0);
  const stats = [
    { icon: STAT_ICONS.calendar, label: t('sch_stat_upcoming'), value: up.length, note: up[0] ? t('sch_stat_upcoming_note', { date: shortDay(up[0].start) }) : '' },
    { icon: STAT_ICONS.people, label: t('sch_stat_registered'), value: registered, note: t('sch_stat_registered_note') },
    { icon: STAT_ICONS.fill, label: t('sch_stat_fill'), value: percent(seats ? Math.round((registered / seats) * 100) : 0), note: t('sch_stat_fill_note') },
    { icon: STAT_ICONS.check, label: t('sch_stat_attendance'), value: percent(pastReg ? Math.round((attended / pastReg) * 100) : 0), note: t('sch_stat_attendance_note') },
  ];
  document.getElementById('sch-stats').innerHTML = stats.map((s) => `
    <div class="sch-stat">
      <span class="sch-stat-icon">${s.icon}</span>
      <div class="sch-stat-body">
        <span class="sch-stat-label">${s.label}</span>
        <span class="sch-stat-value">${s.value}</span>
        <span class="sch-stat-note">${s.note}</span>
      </div>
    </div>`).join('');
}

function eventRow(e, past) {
  const full = e.registered >= e.capacity;
  const pct = Math.min(100, Math.round((e.registered / e.capacity) * 100));
  const fill = past
    ? `<div class="sch-fill"><span>${t('sch_attended', { n: e.attended, max: e.registered })}</span><div class="progress-track"><div class="progress-fill" style="width:${Math.round((e.attended / e.registered) * 100)}%"></div></div></div>`
    : `<div class="sch-fill ${full ? 'is-full' : ''}"><span>${full ? `<strong>${t('sch_full')}</strong> · ` : ''}${t('sch_registered', { n: e.registered, max: e.capacity })}</span><div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div></div>`;
  return `
    <li class="sch-event ${past ? 'sch-past' : ''} ${e.id === view.justAdded ? 'is-new' : ''}">
      ${dateBlock(e.start)}
      <div class="sch-info">
        <span class="sch-title">${escapeHtml(eventTitle(e))}<span class="pill type-${e.type}">${t(`type_${e.type}`)}</span>${e.id === view.justAdded ? `<span class="pill pill-current">${t('sch_new')}</span>` : ''}</span>
        <div class="sch-meta">
          <span>${ICONS.clock}${capitalize(formatDate(e.start, { weekday: 'long' }))} · ${timeOf(e.start)} – ${timeOf(eventEnd(e))}</span>
          <span>${e.format === 'online' ? ICONS.video : ICONS.pin}${e.format === 'online' ? t('sch_online') : escapeHtml(e.place || OFFICE)}</span>
          <span>${ICONS.mentor}${t('sch_host', { name: escapeHtml(eventHost(e)) })}</span>
        </div>
      </div>
      ${fill}
      <div class="sch-actions">
        <button type="button" class="btn-outline btn-sm" data-people="${e.id}">${t('sch_people')}</button>
        ${past ? '' : `<button type="button" class="btn-text danger" data-cancel="${e.id}">${t('sch_cancel')}</button>`}
      </div>
    </li>`;
}

function renderLists() {
  const up = upcomingEvents();
  document.getElementById('sch-upcoming-count').textContent = t('sch_upcoming_count', { n: up.length });
  document.getElementById('sch-upcoming').innerHTML = up.length
    ? up.map((e) => eventRow(e, false)).join('')
    : `<li class="sch-empty">${t('sch_none_upcoming')}</li>`;
  document.getElementById('sch-past').innerHTML = pastEvents().map((e) => eventRow(e, true)).join('');
}

function renderFormOptions() {
  const type = document.getElementById('ev-type');
  const keepType = type.value || 'workshop';
  type.innerHTML = TYPES.map((k) => `<option value="${k}" ${k === keepType ? 'selected' : ''}>${t(`type_${k}`)}</option>`).join('');
  const duration = document.getElementById('ev-duration');
  const keepDuration = duration.value || '90';
  duration.innerHTML = DURATIONS.map((d) => `<option value="${d}" ${String(d) === keepDuration ? 'selected' : ''}>${t('duration_min', { n: d })}</option>`).join('');
}

function render() {
  renderIntro();
  renderStats();
  renderLists();
  renderFormOptions();
}

// ---- Create an event ----
const localDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

function openCreate() {
  document.getElementById('create-form').reset();
  renderFormOptions();
  const dateField = document.getElementById('ev-date');
  dateField.min = localDate(new Date());
  dateField.value = localDate(weekdayFromNow(14, 9, 0));
  document.getElementById('ev-place-field').hidden = true;
  showCreateErrors([]);
  document.querySelectorAll('#create-form .field-invalid').forEach((el) => el.classList.remove('field-invalid'));
  document.getElementById('create-dialog').showModal();
  document.getElementById('ev-title').focus();
}

function showCreateErrors(keys) {
  const box = document.getElementById('create-errors');
  box.hidden = !keys.length;
  box.innerHTML = keys.map((k) => `<li>${t(k)}</li>`).join('');
  if (keys.length) box.scrollIntoView({ block: 'nearest' });
}

function saveEvent() {
  const f = (id) => document.getElementById(id);
  const format = document.querySelector('input[name="ev-format"]:checked').value;
  const title = f('ev-title').value.trim();
  const capacity = Number(f('ev-capacity').value);
  const start = f('ev-date').value && f('ev-time').value ? new Date(`${f('ev-date').value}T${f('ev-time').value}`) : null;

  const errors = [];
  const flag = (id, bad, key) => { f(id).classList.toggle('field-invalid', bad); if (bad) errors.push(key); };
  flag('ev-title', title.length < 5, 'sch_err_title');
  flag('ev-date', !f('ev-date').value || (start && start < new Date()), 'sch_err_date');
  flag('ev-time', !f('ev-time').value, 'sch_err_time');
  flag('ev-place', format === 'inperson' && !f('ev-place').value.trim(), 'sch_err_place');
  flag('ev-capacity', !Number.isInteger(capacity) || capacity < 5 || capacity > 200, 'sch_err_capacity');
  if (errors.length) return showCreateErrors(errors);

  const created = readShared(CREATED_KEY, []);
  const id = `ev_${Date.now()}`;
  const me = findUserByEmail(APP_SESSION.email);
  created.push({
    id, title, type: f('ev-type').value, start: start.toISOString(), duration: Number(f('ev-duration').value),
    format, place: format === 'inperson' ? f('ev-place').value.trim() : '',
    host: f('ev-host').value.trim() || (me && me.nom ? `${me.prenom} ${me.nom}` : APP_SESSION.prenom),
    capacity, registered: 0,
  });
  localStorage.setItem(CREATED_KEY, JSON.stringify(created));
  view.justAdded = id;
  f('create-dialog').close();
  render();
  showAlert('success', 'sch_created_title', ['sch_created_body']);
}

// ---- Registrants and cancellation ----
function openPeople(id) {
  const e = getEvents().find((x) => x.id === id);
  pendingId = id;
  document.getElementById('people-title').textContent = eventTitle(e);
  document.getElementById('people-meta').textContent = t('sch_people_meta', { date: longDay(e.start), time: timeOf(e.start), n: e.registered });
  const shown = PEOPLE.slice(0, Math.min(e.registered, PEOPLE.length));
  const more = e.registered - shown.length;
  document.getElementById('people-list').innerHTML = e.registered
    ? shown.map((name) => `<li><span class="user-avatar">${initials(name)}</span>${name}</li>`).join('') + (more > 0 ? `<li class="more">${t('sch_people_more', { n: more })}</li>` : '')
    : `<li class="none">${t('sch_people_none')}</li>`;
  const past = eventEnd(e) <= new Date();
  document.getElementById('people-remind').hidden = past || !e.registered;
  document.getElementById('people-dialog').showModal();
}

function openCancel(id) {
  const e = getEvents().find((x) => x.id === id);
  pendingId = id;
  // Lowercase weekday inside the sentence ("du lundi 5 octobre")
  const date = formatDate(e.start, { weekday: 'long', day: 'numeric', month: 'long' });
  document.getElementById('cancel-text').textContent = t(e.registered ? 'sch_cancel_text' : 'sch_cancel_text_none', { name: eventTitle(e), date, n: e.registered });
  document.getElementById('cancel-dialog').showModal();
}

function setup() {
  document.getElementById('open-create').addEventListener('click', openCreate);
  document.getElementById('create-save').addEventListener('click', saveEvent);
  document.getElementById('ev-format').addEventListener('change', () => {
    document.getElementById('ev-place-field').hidden = document.querySelector('input[name="ev-format"]:checked').value !== 'inperson';
  });
  document.getElementById('create-form').addEventListener('input', (e) => e.target.classList.remove('field-invalid'));

  document.querySelector('.page').addEventListener('click', (e) => {
    const people = e.target.closest('[data-people]');
    const cancel = e.target.closest('[data-cancel]');
    if (people) openPeople(people.dataset.people);
    if (cancel) openCancel(cancel.dataset.cancel);
  });

  const peopleDialog = document.getElementById('people-dialog');
  peopleDialog.addEventListener('close', () => {
    if (peopleDialog.returnValue === 'remind') showAlert('success', 'sch_reminded_title', ['sch_reminded_body']);
    pendingId = null;
  });

  const cancelDialog = document.getElementById('cancel-dialog');
  cancelDialog.addEventListener('close', () => {
    if (cancelDialog.returnValue === 'confirm' && pendingId) {
      const cancelled = readShared(CANCELLED_KEY, []);
      cancelled.push(pendingId);
      localStorage.setItem(CANCELLED_KEY, JSON.stringify(cancelled));
      render();
      showAlert('success', 'sch_cancelled_title', ['sch_cancelled_body']);
    }
    pendingId = null;
  });
}

initAppPage({ page: 'scheduling', role: 'staff', render, setup });
