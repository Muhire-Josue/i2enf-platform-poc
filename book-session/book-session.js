// book-session.js — "Réserver une séance": choose a mentor, time, format and topic.
// Also used to reschedule: book-session.html?reschedule=<session id>
// Shared data (mentors, sessions, open slots) comes from shared/app.js.

Object.assign(translations.fr, {
  book_back: "Retour au mentorat",
  book_title: "Réserver une séance",
  book_title_reschedule: "Reprogrammer la séance",
  book_intro: "Choisissez un mentor, un moment qui vous convient et le sujet à aborder.",
  book_intro_reschedule: "Choisissez un nouveau moment. L'ancienne séance sera annulée à la confirmation.",
  book_step_mentor: "Avec qui?",
  book_step_when: "Quand?",
  book_step_details: "Comment et pourquoi?",
  book_your_mentor: "Votre mentor",
  book_duration: "Durée",
  book_day: "Date",
  book_time: "Heure",
  book_slots_count: "{n} dispo.",
  book_full: "Complet",
  book_pick_day: "Choisissez d'abord une date.",
  book_no_slots: "Aucune plage disponible cette journée. Essayez une autre date.",
  book_format: "Format",
  book_format_video_desc: "Lien envoyé par courriel",
  book_format_inperson_desc: "150, rue Metcalfe, Ottawa",
  book_topic: "Sujet de la séance",
  book_note: "Message pour votre mentor (facultatif)",
  book_note_placeholder: "Ce que vous aimeriez préparer ou aborder",
  book_summary: "Votre séance",
  book_summary_mentor: "Mentor",
  book_summary_when: "Date et heure",
  book_summary_format: "Format",
  book_summary_topic: "Sujet",
  book_summary_pending: "À choisir",
  book_current: "Horaire actuel : {date}, {time}",
  book_confirm: "Confirmer la séance",
  book_confirm_reschedule: "Confirmer le nouvel horaire",
  book_reminder: "Un rappel vous sera envoyé par courriel la veille de la séance.",
});

Object.assign(translations.en, {
  book_back: "Back to mentorship",
  book_title: "Book a session",
  book_title_reschedule: "Reschedule the session",
  book_intro: "Choose a mentor, a time that works for you and the topic to cover.",
  book_intro_reschedule: "Choose a new time. The previous session will be cancelled when you confirm.",
  book_step_mentor: "With whom?",
  book_step_when: "When?",
  book_step_details: "How and why?",
  book_your_mentor: "Your mentor",
  book_duration: "Duration",
  book_day: "Date",
  book_time: "Time",
  book_slots_count: "{n} open",
  book_full: "Full",
  book_pick_day: "Choose a date first.",
  book_no_slots: "No open times that day. Try another date.",
  book_format: "Format",
  book_format_video_desc: "Link sent by email",
  book_format_inperson_desc: "150 Metcalfe Street, Ottawa",
  book_topic: "Session topic",
  book_note: "Message for your mentor (optional)",
  book_note_placeholder: "What you'd like to prepare or discuss",
  book_summary: "Your session",
  book_summary_mentor: "Mentor",
  book_summary_when: "Date and time",
  book_summary_format: "Format",
  book_summary_topic: "Topic",
  book_summary_pending: "To choose",
  book_current: "Current time: {date}, {time}",
  book_confirm: "Confirm the session",
  book_confirm_reschedule: "Confirm the new time",
  book_reminder: "You'll get an email reminder the day before the session.",
});

// ---- Booking state ----
const params = new URLSearchParams(window.location.search);
const DURATIONS = [30, 60];
const booking = { mentorId: 'kd', duration: 60, day: null, start: null, format: 'video', topic: SESSION_TOPICS[0], note: '' };
let rescheduling = null; // the session being moved, if any

const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const slotsFor = (day) => availableSlots(booking.mentorId, day, booking.duration, rescheduling && rescheduling.id);

// ---- Rendering ----
function renderHeading() {
  document.getElementById('book-title').textContent = t(rescheduling ? 'book_title_reschedule' : 'book_title');
  document.getElementById('book-intro').textContent = t(rescheduling ? 'book_intro_reschedule' : 'book_intro');
}

function renderMentors() {
  document.getElementById('mentor-options').innerHTML = MENTORS.map((m) => `
    <button type="button" class="option mentor-option" role="radio" aria-checked="${m.id === booking.mentorId}" data-mentor="${m.id}">
      <span class="user-avatar">${m.initials}</span>
      <strong>${m.name}</strong>
      <small>${t(m.titleKey)}</small>
      ${m.assigned ? `<span class="pill pill-current">${t('book_your_mentor')}</span>` : ''}
    </button>`).join('');
}

function renderDurations() {
  document.getElementById('duration-options').innerHTML = DURATIONS.map((d) => `
    <button type="button" class="option chip-option" role="radio" aria-checked="${d === booking.duration}" data-duration="${d}">${t('duration_min', { n: d })}</button>`).join('');
}

function renderDays() {
  document.getElementById('day-options').innerHTML = bookableDays(10).map((day) => {
    const count = slotsFor(day).length;
    return `
      <button type="button" class="option day-option" role="radio" aria-checked="${sameDay(day, booking.day)}" data-day="${day.toISOString()}" ${count ? '' : 'disabled'}>
        <small>${formatDate(day, { weekday: 'short' }).replace('.', '')}</small>
        <strong>${day.getDate()}</strong>
        <span>${count ? t('book_slots_count', { n: count }) : t('book_full')}</span>
      </button>`;
  }).join('');
}

function renderSlots() {
  const box = document.getElementById('slot-options');
  if (!booking.day) { box.innerHTML = `<p class="slot-empty">${t('book_pick_day')}</p>`; return; }
  const slots = slotsFor(booking.day);
  box.innerHTML = slots.length
    ? slots.map((s) => `<button type="button" class="option chip-option" role="radio" aria-checked="${booking.start && s.getTime() === booking.start.getTime()}" data-start="${s.toISOString()}">${timeOf(s)}</button>`).join('')
    : `<p class="slot-empty">${t('book_no_slots')}</p>`;
}

function renderFormats() {
  document.getElementById('format-options').innerHTML = ['video', 'inperson'].map((f) => `
    <button type="button" class="option format-option" role="radio" aria-checked="${f === booking.format}" data-format="${f}">
      ${f === 'video' ? ICONS.video : ICONS.pin}
      <span><strong>${t(f === 'video' ? 'format_video' : 'format_inperson')}</strong><small>${t(`book_format_${f}_desc`)}</small></span>
    </button>`).join('');
}

function renderTopics() {
  const select = document.getElementById('topic');
  select.innerHTML = SESSION_TOPICS.map((key) => `<option value="${key}" ${key === booking.topic ? 'selected' : ''}>${t(key)}</option>`).join('');
}

function renderSummary() {
  const mentor = mentorById(booking.mentorId);
  const when = booking.start
    ? `<span>${longDay(booking.start)}<br>${timeOf(booking.start)} – ${timeOf(new Date(booking.start.getTime() + booking.duration * 60000))}</span>`
    : `<span class="pending">${t('book_summary_pending')}</span>`;
  const was = rescheduling
    ? `<div class="summary-was">${t('book_current', { date: longDay(rescheduling.start), time: timeOf(rescheduling.start) })}</div>`
    : '';
  document.getElementById('summary').innerHTML = `
    <h2>${t('book_summary')}</h2>
    ${was}
    <ul class="summary-list">
      <li>${ICONS.mentor}<div><small>${t('book_summary_mentor')}</small><span>${mentor.name}</span></div></li>
      <li>${ICONS.clock}<div><small>${t('book_summary_when')}</small>${when}</div></li>
      <li>${booking.format === 'video' ? ICONS.video : ICONS.pin}<div><small>${t('book_summary_format')}</small><span>${t(booking.format === 'video' ? 'format_video' : 'format_inperson')} · ${t('duration_min', { n: booking.duration })}</span></div></li>
      <li>${ICONS.topic}<div><small>${t('book_summary_topic')}</small><span>${t(booking.topic)}</span></div></li>
    </ul>
    <button type="button" class="btn-primary" id="confirm-btn" ${booking.start ? '' : 'disabled'}>${t(rescheduling ? 'book_confirm_reschedule' : 'book_confirm')}</button>
    <p class="summary-note">${t('book_reminder')}</p>`;
}

function render() {
  renderHeading();
  renderMentors();
  renderDurations();
  renderDays();
  renderSlots();
  renderFormats();
  renderTopics();
  renderSummary();
}

// When the mentor or duration changes, keep the chosen time only if it's still open
function keepValidTime() {
  if (!booking.day) return;
  const open = slotsFor(booking.day);
  if (!open.length) { booking.day = null; booking.start = null; return; }
  if (booking.start && !open.some((s) => s.getTime() === booking.start.getTime())) booking.start = null;
}

// ---- Setup ----
function setup() {
  // Rescheduling: start from the existing session's details
  const oldId = params.get('reschedule');
  if (oldId) {
    rescheduling = getSessionById(oldId) || null;
    if (rescheduling) Object.assign(booking, { mentorId: rescheduling.mentorId, duration: rescheduling.duration, format: rescheduling.format, topic: rescheduling.topic });
  }
  if (params.get('mentor') && mentorById(params.get('mentor'))) booking.mentorId = params.get('mentor');
  render();

  document.querySelector('.page-main').addEventListener('click', (e) => {
    const option = e.target.closest('.option');
    if (!option || option.disabled) return;
    const d = option.dataset;
    if (d.mentor) { booking.mentorId = d.mentor; keepValidTime(); }
    if (d.duration) { booking.duration = Number(d.duration); keepValidTime(); }
    if (d.day) { booking.day = new Date(d.day); booking.start = null; }
    if (d.start) booking.start = new Date(d.start);
    if (d.format) booking.format = d.format;
    render();
  });

  document.getElementById('topic').addEventListener('change', (e) => { booking.topic = e.target.value; renderSummary(); });
  document.getElementById('note').addEventListener('input', (e) => { booking.note = e.target.value; });

  document.getElementById('summary').addEventListener('click', (e) => {
    if (!e.target.closest('#confirm-btn') || !booking.start) return;
    bookSession({
      mentorId: booking.mentorId,
      start: booking.start,
      duration: booking.duration,
      format: booking.format,
      topic: booking.topic,
      note: booking.note.trim(),
    });
    if (rescheduling) cancelSession(rescheduling.id);
    window.location.href = `${pageUrl('mentorship')}?${rescheduling ? 'rescheduled' : 'booked'}=1`;
  });
}

initAppPage({ page: 'mentorship', render, setup });