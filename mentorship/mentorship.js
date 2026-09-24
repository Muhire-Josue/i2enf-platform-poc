// mentorship.js — "Mentorat": upcoming sessions, past sessions with notes,
// the assigned mentor and other experts. Shared data comes from shared/app.js.

Object.assign(translations.fr, {
  ment_title: "Mentorat",
  ment_intro: "Votre mentor, vos séances et les notes partagées après chaque rencontre.",
  ment_book: "Réserver une séance",
  ment_upcoming_title: "Séances à venir",
  ment_upcoming_count: "{n} à venir",
  ment_next: "Prochaine",
  ment_join: "Rejoindre",
  ment_directions: "Itinéraire",
  ment_reschedule: "Reprogrammer",
  ment_cancel: "Annuler",
  ment_empty: "Aucune séance prévue pour le moment.",
  ment_past_title: "Séances passées et notes",
  ment_past_sub: "Après chaque séance, votre mentor partage un résumé et les actions convenues.",
  ment_notes_summary: "Résumé",
  ment_notes_actions: "Actions convenues",
  ment_with: "avec {name}",
  ment_my_mentor: "Mon mentor",
  ment_matched_since: "Jumelé depuis le {date}",
  ment_sessions_done: "{n} séances complétées ensemble",
  ment_languages: "Langues : {list}",
  ment_write: "Écrire un message",
  ment_pool_title: "Autres experts",
  ment_pool_sub: "Pour une question précise, réservez une séance avec un expert du bassin de mentors.",
  ment_book_with: "Réserver",
  ment_cancel_title: "Annuler cette séance?",
  ment_cancel_text: "Séance du {date} à {time} avec {name}. Votre mentor sera avisé par courriel.",
  ment_cancel_keep: "Garder la séance",
  ment_cancel_confirm: "Annuler la séance",
  ment_cancelled_title: "Séance annulée",
  ment_cancelled_body: "Votre mentor a été avisé. Vous pouvez réserver une autre séance en tout temps.",
  ment_booked_title: "Séance confirmée",
  ment_booked_body: "Elle apparaît dans vos séances à venir. Un rappel vous sera envoyé la veille.",
  ment_rescheduled_title: "Séance reprogrammée",
  ment_rescheduled_body: "Votre mentor a été avisé du nouvel horaire.",
  ment_join_title: "Lien de visioconférence",
  ment_join_body: "Le lien sera actif 10 minutes avant le début de la séance.",
  mentor_kd_bio: "Comptable professionnel agréé depuis 15 ans, Karim accompagne les petites entreprises francophones dans leur planification financière et leurs obligations fiscales.",
  notes_1_summary: "Nous avons clarifié la proposition de valeur : une boulangerie artisanale axée sur les produits locaux, pour une clientèle de quartier qui recherche la qualité.",
  notes_1_a1: "Réécrire la proposition de valeur en une phrase",
  notes_1_a2: "Identifier trois concurrents directs",
  notes_2_summary: "Revue du sondage client : 40 réponses, forte demande pour la livraison le samedi. Les prix envisagés sont acceptés par la majorité des répondants.",
  notes_2_a1: "Ajouter l'option de livraison au plan de lancement",
  notes_2_a2: "Commencer les prévisions de ventes sur 12 mois",
  notes_3_summary: "Comparaison entre l'entreprise individuelle et la société incorporée. Une société incorporée est recommandée à cause des risques liés au local commercial.",
  notes_3_a1: "Réserver le nom de l'entreprise auprès de l'Ontario",
  notes_3_a2: "Préparer les documents pour l'inscription à la TVH",
});

Object.assign(translations.en, {
  ment_title: "Mentorship",
  ment_intro: "Your mentor, your sessions, and the notes shared after each meeting.",
  ment_book: "Book a session",
  ment_upcoming_title: "Upcoming sessions",
  ment_upcoming_count: "{n} upcoming",
  ment_next: "Next",
  ment_join: "Join",
  ment_directions: "Directions",
  ment_reschedule: "Reschedule",
  ment_cancel: "Cancel",
  ment_empty: "No sessions scheduled at the moment.",
  ment_past_title: "Past sessions and notes",
  ment_past_sub: "After each session, your mentor shares a summary and the agreed actions.",
  ment_notes_summary: "Summary",
  ment_notes_actions: "Agreed actions",
  ment_with: "with {name}",
  ment_my_mentor: "My mentor",
  ment_matched_since: "Matched since {date}",
  ment_sessions_done: "{n} sessions completed together",
  ment_languages: "Languages: {list}",
  ment_write: "Send a message",
  ment_pool_title: "Other experts",
  ment_pool_sub: "For a specific question, book a session with an expert from the mentor pool.",
  ment_book_with: "Book",
  ment_cancel_title: "Cancel this session?",
  ment_cancel_text: "Session on {date} at {time} with {name}. Your mentor will be notified by email.",
  ment_cancel_keep: "Keep the session",
  ment_cancel_confirm: "Cancel the session",
  ment_cancelled_title: "Session cancelled",
  ment_cancelled_body: "Your mentor has been notified. You can book another session at any time.",
  ment_booked_title: "Session confirmed",
  ment_booked_body: "It now appears in your upcoming sessions. You'll get a reminder the day before.",
  ment_rescheduled_title: "Session rescheduled",
  ment_rescheduled_body: "Your mentor has been notified of the new time.",
  ment_join_title: "Video call link",
  ment_join_body: "The link becomes active 10 minutes before the session starts.",
  mentor_kd_bio: "A chartered professional accountant for 15 years, Karim helps small francophone businesses with financial planning and tax obligations.",
  notes_1_summary: "We clarified the value proposition: an artisan bakery focused on local products, for neighbourhood customers who value quality.",
  notes_1_a1: "Rewrite the value proposition in one sentence",
  notes_1_a2: "Identify three direct competitors",
  notes_2_summary: "Review of the customer survey: 40 responses, strong demand for Saturday delivery. The planned prices are accepted by most respondents.",
  notes_2_a1: "Add the delivery option to the launch plan",
  notes_2_a2: "Start the 12-month sales forecast",
  notes_3_summary: "Comparison between a sole proprietorship and an incorporated company. Incorporation is recommended because of the risks tied to the commercial lease.",
  notes_3_a1: "Reserve the business name with Ontario",
  notes_3_a2: "Prepare the documents for HST registration",
});

const OFFICE_MAP = 'https://www.google.com/maps/search/?api=1&query=150+Metcalfe+Street+Ottawa+ON';
const CHEVRON = '<svg class="past-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const langList = (codes) => codes.map((c) => t(`lang_name_${c}`)).join(', ');
let pendingCancelId = null;

function dateBlock(date) {
  return `<span class="event-date"><span class="event-day">${date.getDate()}</span><span class="event-month">${monthShort(date)}</span></span>`;
}

function renderUpcoming() {
  const sessions = getUpcomingSessions();
  document.getElementById('upcoming-count').textContent = t('ment_upcoming_count', { n: sessions.length });
  const list = document.getElementById('upcoming');
  if (!sessions.length) {
    list.innerHTML = `<li class="empty-state">${t('ment_empty')}<br><a href="book-session.html" class="btn-primary btn-sm">${t('ment_book')}</a></li>`;
    return;
  }
  list.innerHTML = sessions.map((s, i) => {
    const mentor = mentorById(s.mentorId);
    const video = s.format === 'video';
    return `
      <li class="session-row ${i === 0 ? 'is-next' : ''}">
        ${dateBlock(s.start)}
        <div class="session-info">
          <span class="session-when">${longDay(s.start)}${i === 0 ? `<span class="pill pill-current">${t('ment_next')}</span>` : ''}</span>
          <div class="session-details">
            <span>${ICONS.clock}${timeOf(s.start)} – ${timeOf(sessionEnd(s))} · ${t('duration_min', { n: s.duration })}</span>
            <span>${video ? ICONS.video : ICONS.pin}${t(video ? 'format_video' : 'format_inperson')}</span>
            <span>${ICONS.topic}${t(s.topic)}</span>
          </div>
          <div class="session-with"><span class="user-avatar">${mentor.initials}</span>${mentor.name} · ${t(mentor.titleKey)}</div>
          <div class="session-buttons">
            ${video
              ? `<button type="button" class="btn-primary btn-sm" data-join="${s.id}">${t('ment_join')}</button>`
              : `<a href="${OFFICE_MAP}" target="_blank" rel="noopener" class="btn-primary btn-sm">${t('ment_directions')}</a>`}
            <a href="book-session.html?reschedule=${encodeURIComponent(s.id)}" class="btn-outline btn-sm">${t('ment_reschedule')}</a>
            <button type="button" class="btn-text" data-cancel="${s.id}">${t('ment_cancel')}</button>
          </div>
        </div>
      </li>`;
  }).join('');
}

function renderPast() {
  document.getElementById('past').innerHTML = getPastSessions().map((s, i) => {
    const mentor = mentorById(s.mentorId);
    const notes = s.notes ? `
      <div class="past-notes">
        <h4>${t('ment_notes_summary')}</h4>
        <p>${t(`${s.notes}_summary`)}</p>
        <h4>${t('ment_notes_actions')}</h4>
        <ul class="past-actions"><li>${t(`${s.notes}_a1`)}</li><li>${t(`${s.notes}_a2`)}</li></ul>
      </div>` : '';
    return `
      <details class="past-item" ${i === 0 ? 'open' : ''}>
        <summary>
          ${dateBlock(s.start)}
          <span class="past-summary-text">
            <strong>${t(s.topic)}</strong>
            <span>${t('ment_with', { name: mentor.name })} · ${relativeDay(s.start)} · ${t(s.format === 'video' ? 'format_video' : 'format_inperson')}</span>
          </span>
          ${CHEVRON}
        </summary>
        ${notes}
      </details>`;
  }).join('');
}

function renderMentor() {
  const mentor = MENTORS.find((m) => m.assigned);
  const together = getPastSessions().filter((s) => s.mentorId === mentor.id).length;
  const matched = new Date(COHORT_START.getTime() + 3 * 86400000);
  document.getElementById('my-mentor').innerHTML = `
    <span class="kicker kicker-light">${t('ment_my_mentor')}</span>
    <div class="mentor-top">
      <span class="user-avatar">${mentor.initials}</span>
      <div><h2>${mentor.name}</h2><small>${t(mentor.titleKey)}</small></div>
    </div>
    <p>${t('mentor_kd_bio')}</p>
    <div class="tag-list">${mentor.expertise.map((a) => `<span class="tag">${t(a)}</span>`).join('')}</div>
    <ul class="mentor-facts">
      <li>${ICONS.clock}${t('ment_matched_since', { date: shortDay(matched) })}</li>
      <li>${ICONS.video}${t('ment_sessions_done', { n: together })}</li>
      <li>${ICONS.topic}${t('ment_languages', { list: langList(mentor.languages) })}</li>
    </ul>
    <div class="mentor-buttons">
      <a href="book-session.html?mentor=${mentor.id}" class="btn-primary btn-sm">${t('ment_book_with')}</a>
      <a href="mailto:mentor@demo.ca" class="btn-outline-light btn-sm">${t('ment_write')}</a>
    </div>`;
}

function renderExperts() {
  document.getElementById('experts').innerHTML = MENTORS.filter((m) => !m.assigned).map((m) => `
    <li class="expert">
      <span class="user-avatar">${m.initials}</span>
      <div class="expert-body">
        <strong>${m.name}</strong>
        <small>${t(m.titleKey)} · ${langList(m.languages)}</small>
        <div class="tag-list">${m.expertise.map((a) => `<span class="tag">${t(a)}</span>`).join('')}</div>
      </div>
      <a href="book-session.html?mentor=${m.id}" class="btn-outline btn-sm">${t('ment_book_with')}</a>
    </li>`).join('');
}

function render() {
  renderUpcoming();
  renderPast();
  renderMentor();
  renderExperts();
}

function setup() {
  // Arriving from the booking page
  const params = new URLSearchParams(window.location.search);
  if (params.get('booked')) showAlert('success', 'ment_booked_title', ['ment_booked_body']);
  if (params.get('rescheduled')) showAlert('success', 'ment_rescheduled_title', ['ment_rescheduled_body']);
  if (params.toString()) history.replaceState(null, '', 'mentorship.html');

  const dialog = document.getElementById('cancel-dialog');
  document.getElementById('upcoming').addEventListener('click', (e) => {
    const join = e.target.closest('[data-join]');
    if (join) { showAlert('success', 'ment_join_title', ['ment_join_body']); return; }
    const cancel = e.target.closest('[data-cancel]');
    if (!cancel) return;
    const s = getSessionById(cancel.dataset.cancel);
    pendingCancelId = s.id;
    document.getElementById('cancel-text').textContent = t('ment_cancel_text', {
      date: longDay(s.start), time: timeOf(s.start), name: mentorById(s.mentorId).name,
    });
    dialog.showModal();
  });

  dialog.addEventListener('close', () => {
    if (dialog.returnValue === 'confirm' && pendingCancelId) {
      cancelSession(pendingCancelId);
      render();
      showAlert('success', 'ment_cancelled_title', ['ment_cancelled_body']);
    }
    pendingCancelId = null;
  });
}

initAppPage({ page: 'mentorship', render, setup });
