const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '200kb' }));
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 5 } });

// Basic CORS to allow form posts from other origins (e.g., static preview)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Serve static files from repo root
app.use(express.static(path.join(__dirname)));

app.get('/health', (req, res) => res.json({ ok: true }));

app.post('/api/contact', upload.array('files', 5), async (req, res) => {
  try {
    const { name, email, company, /* phone, */ topic, message, website, consent } = req.body || {};

    // Honeypot + basic validation
    if (website) return res.status(200).json({ ok: true });
    if (!name || !email || !message || String(message).trim().length < 10) {
      return res.status(400).json({ error: 'Champs requis manquants ou message trop court.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email invalide.' });
    }

    // Attachments (total <= 10MB)
    const files = Array.isArray(req.files) ? req.files : [];
    const total = files.reduce((s, f) => s + (f.size || 0), 0);
    if (total > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'Fichiers trop volumineux (10 Mo max).' });
    }

    // SMTP settings (with aliases for common env names)
    const host = process.env.SMTP_HOST || process.env.SMTP_SERVER;
    const portS = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || process.env.EMAIL_SENDER || user;
    const to = process.env.SMTP_TO || process.env.EMAIL_RECEIVER || user;
    const bcc = process.env.SMTP_BCC;
    const secureOverride = process.env.SMTP_SECURE;
    const secure = typeof secureOverride !== 'undefined' ? (String(secureOverride).toLowerCase() === 'true') : (portS === 465);

    if (!host || !user || !pass) {
      return res.status(500).json({ error: 'SMTP non configuré (voir .env). Variables requises: SMTP_HOST/SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASS.' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: portS,
      secure,
      auth: { user, pass },
    });

    const subject = `[Contact] ${topic || 'Demande'} — ${name}`;
    const text = `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company || ''}\nSujet: ${topic || ''}\nConsentement: ${consent ? 'oui' : 'non'}\n\nMessage:\n${message}`;

    const attachments = files.map(f => ({ filename: f.originalname, content: f.buffer, contentType: f.mimetype }));

    const info = await transporter.sendMail({ from, to, bcc, subject, text, replyTo: email, attachments });
    console.log('Mail sent', {
      messageId: info && info.messageId,
      accepted: info && info.accepted,
      rejected: info && info.rejected,
      response: info && info.response,
      envelope: info && info.envelope,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact error', err);
    res.status(500).json({ error: 'Impossible d’envoyer le message.' });
  }
});

// Optional startup SMTP verification to catch config issues early
(async () => {
  try {
    const host = process.env.SMTP_HOST || process.env.SMTP_SERVER;
    const portS = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    if (!host || !user || !pass) return; // skip if not configured
    const secureOverride = process.env.SMTP_SECURE;
    const secure = typeof secureOverride !== 'undefined' ? (String(secureOverride).toLowerCase() === 'true') : (portS === 465);
    const transporter = nodemailer.createTransport({ host, port: portS, secure, auth: { user, pass } });
    await transporter.verify();
    console.log('SMTP verified:', host, portS, 'secure=', secure);
  } catch (e) {
    console.warn('SMTP verify failed:', e && e.message);
  }
})();

app.listen(port, () => {
  console.log(`Taolenn Assistant site on http://localhost:${port}`);
});
