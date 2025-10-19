const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '200kb' }));

// Serve static files from repo root
app.use(express.static(path.join(__dirname)));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, company, phone, topic, message, website, consent } = req.body || {};

    // Honeypot + basic validation
    if (website) return res.status(200).json({ ok: true });
    if (!name || !email || !message || String(message).trim().length < 10) {
      return res.status(400).json({ error: 'Champs requis manquants ou message trop court.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Email invalide.' });
    }

    // SMTP settings
    const host = process.env.SMTP_HOST;
    const portS = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;
    const to = process.env.SMTP_TO || user;

    if (!host || !user || !pass) {
      return res.status(500).json({ error: 'SMTP non configuré (voir .env).' });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: portS,
      secure: portS === 465, // true for 465, false for other ports
      auth: { user, pass },
    });

    const subject = `[Contact] ${topic || 'Demande'} — ${name}`;
    const text = `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company || ''}\nTéléphone: ${phone || ''}\nSujet: ${topic || ''}\nConsentement: ${consent ? 'oui' : 'non'}\n\nMessage:\n${message}`;

    await transporter.sendMail({ from, to, subject, text, replyTo: email });

    res.json({ ok: true });
  } catch (err) {
    console.error('Contact error', err);
    res.status(500).json({ error: 'Impossible d’envoyer le message.' });
  }
});

app.listen(port, () => {
  console.log(`Taolenn Assistant site on http://localhost:${port}`);
});

