// shared/alerts.js — Bootstrap alert banners for errors and confirmations.
// Text is set through data-i18n keys, so a banner already on screen also
// switches language when the FR/EN toggle is used.

const ALERT_ICONS = {
  danger: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.5"/></svg>',
  success: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>',
};

/**
 * Show a Bootstrap alert in #page-alerts (member pages) or #auth-alerts (login pages).
 * @param {'danger'|'success'} type
 * @param {string} titleKey - translation key for the bold title
 * @param {string[]} messageKeys - translation keys for the details (one line or a list)
 */
const alertsContainer = () => document.getElementById('page-alerts') || document.getElementById('auth-alerts');

function showAlert(type, titleKey, messageKeys = []) {
  const container = alertsContainer();
  if (!container) return;

  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible fade show auth-alert`;
  alert.setAttribute('role', type === 'danger' ? 'alert' : 'status');

  let details = '';
  if (messageKeys.length === 1) {
    details = `<p class="auth-alert-text" data-i18n="${messageKeys[0]}"></p>`;
  } else if (messageKeys.length > 1) {
    details = `<ul class="auth-alert-list">${messageKeys.map((k) => `<li data-i18n="${k}"></li>`).join('')}</ul>`;
  }

  alert.innerHTML = `
    <span class="auth-alert-icon">${ALERT_ICONS[type] || ''}</span>
    <div class="auth-alert-body">
      <strong data-i18n="${titleKey}"></strong>
      ${details}
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" data-i18n-aria-label="alert_close" aria-label="Fermer"></button>
  `;

  container.innerHTML = '';
  container.appendChild(alert);
  applyTranslations();
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function clearAlerts() {
  const container = alertsContainer();
  if (container) container.innerHTML = '';
}
