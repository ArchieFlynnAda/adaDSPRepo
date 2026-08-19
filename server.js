const express = require('express');
const cors = require('cors');
const path = require('path');
const seedStories = require('./data/stories');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '20kb' }));          // cap payload size
app.use(express.static(path.join(__dirname, 'public')));

// In-memory mock database, seeded from data/stories.js
let stories = [...seedStories];

/* ---------- security helpers ---------- */

// Reject anything carrying a script tag outright (case-insensitive).
function containsScriptTag(value) {
  return typeof value === 'string' && /<\s*script/i.test(value);
}

// Neutralise any other HTML so it renders as text, never as markup.
function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Fixed-window rate limiter, per IP, applied to POST routes only.
// Dependency-free on purpose: ~15 lines I can fully explain.
const RATE_WINDOW_MS = 15 * 1000;   // window length
const RATE_MAX = 8;                 // max POSTs per window per IP
const hits = new Map();             // ip -> { count, windowStart }

function rateLimit(req, res, next) {
  const now = Date.now();
  const record = hits.get(req.ip);
  if (!record || now - record.windowStart > RATE_WINDOW_MS) {
    hits.set(req.ip, { count: 1, windowStart: now });
    return next();
  }
  record.count += 1;
  if (record.count > RATE_MAX) {
    return res.status(429).json({ error: 'Too many requests - slow down and try again shortly' });
  }
  next();
}

/* ---------- read endpoints ---------- */

// GET /api/stories - fetch all stories for the grid
app.get('/api/stories', (req, res) => {
  res.status(200).json(stories);
});

// GET /api/stories/:id - fetch a single story for the detail view
app.get('/api/stories/:id', (req, res) => {
  const story = stories.find(s => s.id === req.params.id);
  if (!story) {
    return res.status(404).json({ error: 'Story not found' });
  }
  res.status(200).json(story);
});


// POST /api/stories/submit - submit a new story with XSS prevention
app.post('/api/stories/submit', rateLimit, (req, res) => {
  const { name, quote, route } = req.body;

  // 1. validation: all fields present
  if (!name || !quote || !route) {
    return res.status(400).json({ error: 'Name, quote, and route are required' });
  }

  // 2. sanitisation: hard-reject script tags...
  if (containsScriptTag(quote) || containsScriptTag(name)) {
    return res.status(403).json({ error: 'Malicious content detected' });
  }

  // 3. ...and neutralise any other HTML before it is stored
  const safeName = escapeHTML(name.trim()).slice(0, 40);
  const safeQuote = escapeHTML(quote.trim()).slice(0, 220);

  const newStory = {
    id: safeName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
    ini: safeName.charAt(0).toUpperCase(),
    name: safeName,
    quote: safeQuote,
    route: ['build', 'support', 'analyse'].includes(route) ? route : 'build',
    now: 'Story in review',
    tags: []
  };

  stories.push(newStory);
  res.status(201).json(newStory);
});

// POST /api/openday/register - register with data validation
app.post('/api/openday/register', rateLimit, (req, res) => {
  const { email, date } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address provided' });
  }
  if (!date) {
    return res.status(400).json({ error: 'Open day date is required' });
  }

  res.status(201).json({ message: 'Successfully registered', email: escapeHTML(email), date: escapeHTML(date) });
});

/* ---------- boot ---------- */


if (require.main === module) {
  app.listen(port, () => {
    console.log(`Ada Voices running at http://localhost:${port}`);
  });
}

module.exports = app;
