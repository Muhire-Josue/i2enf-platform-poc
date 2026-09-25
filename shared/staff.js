// shared/staff.js — shared by every page of the staff area: the staff menu and its text.
// Load after shared/app.js and before the page's own script.

NAV_ITEMS.staff = [
  { page: 'admin', href: 'admin.html', key: 'app_nav_overview', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>' },
  { page: 'applications', href: '../applications/dashboard.html', key: 'app_nav_applications', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5h13l3.5 7v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/></svg>' },
  { page: 'cases', href: 'cases/dashboard.html', key: 'app_nav_cases', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/><path d="M8 13h8M8 16h5"/></svg>' },
  { page: 'scheduling', href: 'scheduling.html', key: 'app_nav_scheduling', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>' },
  { page: 'matching', href: 'matching.html', key: 'app_nav_matching', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="7" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M2 20v-1a5 5 0 015-5h1M22 20v-1a5 5 0 00-5-5h-1"/><path d="M10 17h4M12 15v4"/></svg>' },
  { page: 'kpi', href: 'kpi-dashboard.html', key: 'app_nav_kpi', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-6"/></svg>' },
];
NAV_LABELS.staff = 'app_nav_label_staff';

Object.assign(translations.fr, {
  app_nav_overview: "Vue d'ensemble",
  app_nav_applications: "Candidatures",
  app_nav_cases: "Dossiers",
  app_nav_scheduling: "Événements",
  app_nav_matching: "Jumelage",
  app_nav_kpi: "Indicateurs",
  app_nav_label_staff: "Espace personnel",
  staff_kicker: "Espace personnel",
});

Object.assign(translations.en, {
  app_nav_overview: "Overview",
  app_nav_applications: "Applications",
  app_nav_cases: "Case files",
  app_nav_scheduling: "Events",
  app_nav_matching: "Matching",
  app_nav_kpi: "Reports",
  app_nav_label_staff: "Staff area",
  staff_kicker: "Staff area",
});