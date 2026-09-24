// shared/staff.js — shared by every page of the staff area: the staff menu and its text.
// Load after shared/app.js and before the page's own script.

NAV_ITEMS.staff = [
  { page: 'applications', href: 'applications.html', key: 'app_nav_applications', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/></svg>' },
  { page: 'cases', href: 'cases.html', key: 'app_nav_cases', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/><path d="M8 13h8M8 16h5"/></svg>' },
];
NAV_LABELS.staff = 'app_nav_label_staff';

Object.assign(translations.fr, {
  app_nav_applications: "Candidatures",
  app_nav_cases: "Dossiers",
  app_nav_label_staff: "Espace personnel",
  staff_kicker: "Espace personnel",
});

Object.assign(translations.en, {
  app_nav_applications: "Applications",
  app_nav_cases: "Case files",
  app_nav_label_staff: "Staff area",
  staff_kicker: "Staff area",
});