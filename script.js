// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Gallery lightbox
const lightbox = document.querySelector('.lightbox');
const lbImg = document.querySelector('.lightbox-img');
const lbClose = document.querySelector('.lightbox-close');

function openLightbox(src, alt) {
  if (!lightbox || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = alt || 'Agrandissement';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox || !lbImg) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lbImg.src = '';
}

document.querySelectorAll('.gallery-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-full');
    const img = btn.querySelector('img');
    openLightbox(src, img ? img.alt : '');
  });
});

if (lbClose) lbClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Feature icons are now in static markup

// Contact form submit
const form = document.getElementById('contact-form');
if (form) {
  const statusEl = document.getElementById('form-status');
  // Preselect topic from link clicks or URL
  const params = new URLSearchParams(location.search);
  const topicSelect = form.querySelector('select[name="topic"]');
  const preset = params.get('topic');
  if (topicSelect && preset) {
    Array.from(topicSelect.options).forEach(o => {
      if (o.text.toLowerCase().includes(preset.toLowerCase())) topicSelect.value = o.value;
    });
  }
  document.querySelectorAll('[data-topic]').forEach(el => {
    el.addEventListener('click', (e) => {
      const t = el.getAttribute('data-topic');
      if (topicSelect && t) topicSelect.value = t;
    });
  });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = '';
    // Use native validation UI
    if (!form.reportValidity()) return;

    const fd = new FormData(form);
    if (fd.get('website')) return; // honeypot

    // Basic validation guard (already validated by reportValidity)

    // File size guard: total <= 10MB
    const fileInput = form.querySelector('input[type="file"][name="files"]');
    if (fileInput && fileInput.files && fileInput.files.length) {
      let total = 0;
      for (const f of fileInput.files) total += f.size || 0;
      if (total > 10 * 1024 * 1024) {
        statusEl.textContent = 'Taille totale des fichiers > 10 Mo.';
        return;
      }
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Envoi…';
    try {
      const apiBase = (location.origin.startsWith('file:')) ? 'http://localhost:3000' : '';
      const res = await fetch(apiBase + '/api/contact', { method: 'POST', body: fd });
      const out = await res.json().catch(() => ({}));
      if (res.ok) {
        statusEl.textContent = 'Merci, votre message a été envoyé.';
        form.reset();
      } else {
        statusEl.textContent = out.error || 'Une erreur est survenue. Réessayez.';
      }
    } catch (err) {
      statusEl.textContent = 'Erreur réseau. Vérifiez votre connexion.';
    } finally {
      btn.disabled = false; btn.textContent = 'Envoyer';
    }
  });
}
