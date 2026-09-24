// business-file.js — "Dossier d'entreprise": the entrepreneur's documents,
// with filters, search, upload, electronic signature (DocuSign, simulated) and delete.
// Documents and helpers come from shared/app.js.

Object.assign(translations.fr, {
  file_download: "Télécharger",
  file_download_title: "Téléchargement (démonstration)",
  file_download_body: "Dans la plateforme, le fichier serait téléchargé depuis le stockage sécurisé au Canada.",
  file_title: "Dossier d'entreprise",
  file_intro: "Tous les documents de votre projet, partagés avec votre mentor et l'équipe SOFIFRAN.",
  file_upload: "Téléverser un document",
  file_search: "Rechercher un document",
  file_all: "Tous",
  cat_plan: "Plan d'affaires",
  cat_finance: "Finances",
  cat_legal: "Juridique",
  cat_agreement: "Ententes",
  cat_mentoring: "Mentorat",
  cat_other: "Autres",
  file_stat_docs: "documents",
  file_stat_shared: "partagés avec votre mentor",
  file_stat_security: "Chiffrés et hébergés au Canada",
  file_stat_security_title: "Protégé",
  file_by_self: "Ajouté par vous",
  file_by_staff: "Ajouté par l'équipe SOFIFRAN",
  file_by_mentor: "Ajouté par votre mentor",
  file_updated: "Modifié {when}",
  file_signed_on: "Signé le {date}",
  file_to_sign: "À signer",
  file_signed: "Signé",
  file_new: "Nouveau",
  file_sign: "Signer",
  file_delete: "Supprimer",
  file_empty: "Aucun document ne correspond à votre recherche.",
  file_sign_banner_title: "{n} document en attente de votre signature",
  file_sign_banner_text: "{name} — à signer avant le début du programme.",
  file_sign_now: "Signer maintenant",
  file_sign_title: "Signer avec DocuSign",
  file_sign_text: "Vous allez signer « {name} » de façon sécurisée avec DocuSign. Une copie signée sera ajoutée à votre dossier.",
  file_sign_demo: "Démonstration : la signature est simulée.",
  file_sign_confirm: "Signer le document",
  file_signed_title: "Document signé",
  file_signed_body: "Une copie signée a été ajoutée à votre dossier et transmise à l'équipe SOFIFRAN.",
  file_upload_title: "Téléverser un document",
  file_upload_hint: "PDF, Word, Excel ou image, jusqu'à 10 Mo.",
  file_choose: "Choisir un fichier",
  file_category: "Catégorie",
  file_cancel: "Annuler",
  file_upload_confirm: "Téléverser",
  file_err_none: "Choisissez un fichier à téléverser.",
  file_err_type: "Ce type de fichier n'est pas accepté. Utilisez un PDF, un document Word ou Excel, ou une image.",
  file_err_size: "Ce fichier dépasse 10 Mo.",
  file_uploaded_title: "Document téléversé",
  file_uploaded_body: "Il est maintenant dans votre dossier.",
  file_delete_title: "Supprimer ce document?",
  file_delete_text: "« {name} » sera retiré de votre dossier.",
  file_delete_confirm: "Supprimer",
  file_deleted_title: "Document supprimé",
  file_deleted_body: "Le document a été retiré de votre dossier.",
});

Object.assign(translations.en, {
  file_download: "Download",
  file_download_title: "Download (demo)",
  file_download_body: "In the platform, the file would download from secure storage in Canada.",
  file_title: "Business file",
  file_intro: "All your project documents, shared with your mentor and the SOFIFRAN team.",
  file_upload: "Upload a document",
  file_search: "Search documents",
  file_all: "All",
  cat_plan: "Business plan",
  cat_finance: "Finance",
  cat_legal: "Legal",
  cat_agreement: "Agreements",
  cat_mentoring: "Mentorship",
  cat_other: "Other",
  file_stat_docs: "documents",
  file_stat_shared: "shared with your mentor",
  file_stat_security: "Encrypted and hosted in Canada",
  file_stat_security_title: "Protected",
  file_by_self: "Added by you",
  file_by_staff: "Added by the SOFIFRAN team",
  file_by_mentor: "Added by your mentor",
  file_updated: "Updated {when}",
  file_signed_on: "Signed {date}",
  file_to_sign: "To sign",
  file_signed: "Signed",
  file_new: "New",
  file_sign: "Sign",
  file_delete: "Delete",
  file_empty: "No documents match your search.",
  file_sign_banner_title: "{n} document waiting for your signature",
  file_sign_banner_text: "{name} — to sign before the program starts.",
  file_sign_now: "Sign now",
  file_sign_title: "Sign with DocuSign",
  file_sign_text: "You're about to sign \"{name}\" securely with DocuSign. A signed copy will be added to your file.",
  file_sign_demo: "Demo: the signature is simulated.",
  file_sign_confirm: "Sign the document",
  file_signed_title: "Document signed",
  file_signed_body: "A signed copy has been added to your file and sent to the SOFIFRAN team.",
  file_upload_title: "Upload a document",
  file_upload_hint: "PDF, Word, Excel or image, up to 10 MB.",
  file_choose: "Choose a file",
  file_category: "Category",
  file_cancel: "Cancel",
  file_upload_confirm: "Upload",
  file_err_none: "Choose a file to upload.",
  file_err_type: "This file type isn't accepted. Use a PDF, a Word or Excel document, or an image.",
  file_err_size: "This file is larger than 10 MB.",
  file_uploaded_title: "Document uploaded",
  file_uploaded_body: "It's now in your business file.",
  file_delete_title: "Delete this document?",
  file_delete_text: "\"{name}\" will be removed from your file.",
  file_delete_confirm: "Delete",
  file_deleted_title: "Document deleted",
  file_deleted_body: "The document has been removed from your file.",
});

const CATEGORIES = ['plan', 'finance', 'legal', 'agreement', 'mentoring', 'other'];
const MAX_SIZE = 10 * 1048576;
const ALLOWED = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'png', 'jpg', 'jpeg'];
const view = { category: 'all', search: '', justAdded: null };
let pendingId = null;
const DOWNLOAD_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>';

const FILE_ICONS = {
  docs: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>',
  shared: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="4"/><path d="M2 21v-1a7 7 0 0114 0v1"/><path d="M16 3.1a4 4 0 010 7.8M22 21v-1a7 7 0 00-4-6.3"/></svg>',
  lock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>',
  pen: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/></svg>',
};

// Documents from you or your mentor are shared with your mentor
const isShared = (doc) => doc.by === 'mentor' || (doc.by === 'self' && doc.category !== 'legal');

function visibleDocuments() {
  const query = view.search.trim().toLowerCase();
  return getDocuments()
    .filter((d) => view.category === 'all' || d.category === view.category)
    .filter((d) => !query || d.name.toLowerCase().includes(query));
}

// ---- Rendering ----
function renderSignBanner() {
  const pending = getDocuments().filter((d) => d.toSign);
  const banner = document.getElementById('sign-banner');
  banner.hidden = !pending.length;
  if (!pending.length) return;
  banner.innerHTML = `
    <span class="sign-banner-icon">${FILE_ICONS.pen}</span>
    <div class="sign-banner-text">
      <strong>${t('file_sign_banner_title', { n: pending.length })}</strong>
      <span>${t('file_sign_banner_text', { name: escapeHtml(pending[0].name) })}</span>
    </div>
    <button type="button" class="btn-primary" data-sign="${pending[0].id}">${t('file_sign_now')}</button>`;
}

function renderStats() {
  const docs = getDocuments();
  document.getElementById('file-stats').innerHTML = `
    <div class="file-stat"><span class="file-stat-icon">${FILE_ICONS.docs}</span><div><strong>${docs.length}</strong><span>${t('file_stat_docs')}</span></div></div>
    <div class="file-stat"><span class="file-stat-icon">${FILE_ICONS.shared}</span><div><strong>${docs.filter(isShared).length}</strong><span>${t('file_stat_shared')}</span></div></div>
    <div class="file-stat"><span class="file-stat-icon">${FILE_ICONS.lock}</span><div><strong>${t('file_stat_security_title')}</strong><span>${t('file_stat_security')}</span></div></div>`;
}

function renderFilters() {
  const docs = getDocuments();
  const used = CATEGORIES.filter((c) => docs.some((d) => d.category === c));
  document.getElementById('filters').innerHTML = ['all', ...used].map((c) => {
    const count = c === 'all' ? docs.length : docs.filter((d) => d.category === c).length;
    return `<button type="button" class="filter-chip" role="tab" aria-selected="${view.category === c}" data-category="${c}">${t(c === 'all' ? 'file_all' : `cat_${c}`)} <small>${count}</small></button>`;
  }).join('');
}

function renderList() {
  const docs = visibleDocuments();
  const list = document.getElementById('file-list');
  if (!docs.length) { list.innerHTML = `<li class="file-empty">${t('file_empty')}</li>`; return; }
  list.innerHTML = docs.map((d) => {
    const type = fileType(d.name);
    const status = d.toSign ? `<span class="pill pill-sign">${t('file_to_sign')}</span>`
      : d.signedOn ? `<span class="pill pill-done">${t('file_signed')}</span>`
      : d.id === view.justAdded ? `<span class="pill pill-current">${t('file_new')}</span>` : '';
    const when = d.signedOn ? t('file_signed_on', { date: shortDay(d.signedOn) }) : t('file_updated', { when: relativeDay(d.updated) });
    return `
      <li class="file-row ${d.id === view.justAdded ? 'is-new' : ''}">
        <span class="doc-icon ${type}">${type === 'other' ? 'DOC' : type.toUpperCase()}</span>
        <div class="file-main">
          <span class="file-name">${escapeHtml(d.name)}${status}</span>
          <div class="file-meta">
            <span>${t(`cat_${d.category}`)}</span>
            <span>${formatSize(d.size)}</span>
            <span>${when}</span>
            <span>${t(`file_by_${d.by}`)}</span>
          </div>
        </div>
        <div class="file-actions">
          <button type="button" class="btn-icon" data-download="${d.id}" aria-label="${t('file_download')}" title="${t('file_download')}">${DOWNLOAD_ICON}</button>
          ${d.toSign ? `<button type="button" class="btn-primary btn-sm" data-sign="${d.id}">${t('file_sign')}</button>` : ''}
          ${d.uploaded ? `<button type="button" class="btn-text" data-delete="${d.id}">${t('file_delete')}</button>` : ''}
        </div>
      </li>`;
  }).join('');
}

function renderCategorySelect() {
  const select = document.getElementById('upload-category');
  const keep = select.value || (view.category !== 'all' ? view.category : 'plan');
  select.innerHTML = CATEGORIES.map((c) => `<option value="${c}" ${c === keep ? 'selected' : ''}>${t(`cat_${c}`)}</option>`).join('');
}

function render() {
  renderSignBanner();
  renderStats();
  renderFilters();
  renderList();
  renderCategorySelect();
}

// ---- Upload ----
function uploadError(key) {
  const box = document.getElementById('upload-error');
  box.hidden = !key;
  box.textContent = key ? t(key) : '';
  document.querySelector('.drop-zone').classList.toggle('field-invalid', Boolean(key));
}

function openUpload() {
  document.getElementById('upload-form').reset();
  document.getElementById('file-chosen').textContent = t('file_choose');
  renderCategorySelect();
  uploadError(null);
  document.getElementById('upload-dialog').showModal();
}

function submitUpload() {
  const file = document.getElementById('file-input').files[0];
  if (!file) return uploadError('file_err_none');
  const ext = file.name.split('.').pop().toLowerCase();
  if (!ALLOWED.includes(ext)) return uploadError('file_err_type');
  if (file.size > MAX_SIZE) return uploadError('file_err_size');

  // Demo: only the file's name, size and category are kept, not its content
  addDocument(file, document.getElementById('upload-category').value);
  view.justAdded = getDocuments().find((d) => d.uploaded && d.name === file.name).id;
  view.category = 'all';
  view.search = '';
  document.getElementById('search').value = '';
  document.getElementById('upload-dialog').close();
  render();
  showAlert('success', 'file_uploaded_title', ['file_uploaded_body']);
}

// ---- Setup ----
function setup() {
  document.getElementById('open-upload').addEventListener('click', openUpload);
  document.getElementById('upload-submit').addEventListener('click', submitUpload);
  document.getElementById('file-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    document.getElementById('file-chosen').textContent = file ? file.name : t('file_choose');
    uploadError(null);
  });

  document.getElementById('filters').addEventListener('click', (e) => {
    const chip = e.target.closest('[data-category]');
    if (!chip) return;
    view.category = chip.dataset.category;
    renderFilters();
    renderList();
  });
  document.getElementById('search').addEventListener('input', (e) => { view.search = e.target.value; renderList(); });

  // Download, sign and delete buttons (in the banner and in the list)
  const signDialog = document.getElementById('sign-dialog');
  const deleteDialog = document.getElementById('delete-dialog');
  document.querySelector('.page').addEventListener('click', (e) => {
    if (e.target.closest('[data-download]')) {
      showAlert('success', 'file_download_title', ['file_download_body']);
      return;
    }
    const sign = e.target.closest('[data-sign]');
    const del = e.target.closest('[data-delete]');
    if (!sign && !del) return;
    pendingId = (sign || del).dataset.sign || (sign || del).dataset.delete;
    const doc = getDocuments().find((d) => d.id === pendingId);
    if (sign) {
      document.getElementById('sign-text').textContent = t('file_sign_text', { name: doc.name });
      signDialog.showModal();
    } else {
      document.getElementById('delete-text').textContent = t('file_delete_text', { name: doc.name });
      deleteDialog.showModal();
    }
  });

  signDialog.addEventListener('close', () => {
    if (signDialog.returnValue === 'sign' && pendingId) {
      signDocument(pendingId);
      render();
      showAlert('success', 'file_signed_title', ['file_signed_body']);
    }
    pendingId = null;
  });
  deleteDialog.addEventListener('close', () => {
    if (deleteDialog.returnValue === 'delete' && pendingId) {
      deleteDocument(pendingId);
      render();
      showAlert('success', 'file_deleted_title', ['file_deleted_body']);
    }
    pendingId = null;
  });
}

initAppPage({ page: 'business-file', render, setup });
