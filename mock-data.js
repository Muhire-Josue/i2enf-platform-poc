// shared/mock-data.js — local data layer simulating the shared database.
// In the real product this is the central database every area reads/writes;
// here it's localStorage, so pages can demo the "no double entry" architecture
// (e.g. a public application shows up in the staff review queue) without a backend.

function saveApplication(data) {
  const applications = JSON.parse(localStorage.getItem('i2enf_applications') || '[]');
  applications.push({
    id: 'app_' + Date.now(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
    ...data,
  });
  localStorage.setItem('i2enf_applications', JSON.stringify(applications));
}

function getApplications() {
  return JSON.parse(localStorage.getItem('i2enf_applications') || '[]');
}
