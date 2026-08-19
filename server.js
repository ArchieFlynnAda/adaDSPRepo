const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory mock database extracted from hackathon prototype
let stories = [
  {
    id: 'maryam', ini: 'M', name: 'Maryam', age: 17, borough: 'Salford', route: 'support', runtime: '2:14',
    quote: 'I thought everyone would already know how to code and I’d be the one falling behind.',
    now: 'Cyber Security apprentice at HSBC',
    tags: ['behind', 'women', 'firstfam', 'fit']
  },
  {
    id: 'daniel', ini: 'D', name: 'Daniel', age: 18, borough: 'Oldham', route: 'build', runtime: '1:58',
    quote: 'I was set on A Levels, because that’s what everyone said was the “proper” route.',
    now: 'Junior Developer at ClearScore',
    tags: ['alevels']
  }
];

// GET /api/stories - Fetch all stories for the grid
app.get('/api/stories', (req, res) => {
  res.status(200).json(stories);
});

// POST /api/stories/submit - Submit a new story with XSS prevention
app.post('/api/stories/submit', (req, res) => {
  const { name, quote, route } = req.body;
  
  if (!name || !quote || !route) {
    return res.status(400).json({ error: 'Name, quote, and route are required' });
  }

  // Basic sanitization to prevent script injection
  if (quote.includes('<script>') || name.includes('<script>')) {
    return res.status(403).json({ error: 'Malicious content detected' });
  }

  const newStory = {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    ini: name.charAt(0).toUpperCase(),
    name,
    quote,
    route,
    tags: []
  };

  stories.push(newStory);
  res.status(201).json(newStory);
});

// POST /api/openday/register - Register with data validation
app.post('/api/openday/register', (req, res) => {
  const { email, date } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address provided' });
  }
  if (!date) {
    return res.status(400).json({ error: 'Open day date is required' });
  }

  res.status(201).json({ message: 'Successfully registered', email, date });
});

// Export app for Jest testing; start server if run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Ada Voices API running at http://localhost:${port}`);
  });
}

module.exports = app;