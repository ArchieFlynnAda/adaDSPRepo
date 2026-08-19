const request = require('supertest');
const app = require('./server');

describe('Ada Voices API Endpoints', () => {

  // Test Case 1: Normal Flow
  it('TC1  GET /api/stories - should return a 200 status and an array of stories', async () => {
    const res = await request(app).get('/api/stories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThanOrEqual(15);   // 15-persona seed objective
  });

  // Test Case 2: Successful State Transition
  it('TC2  POST /api/stories/submit - should accept a valid submission and return 201', async () => {
    const res = await request(app)
      .post('/api/stories/submit')
      .send({ name: 'Elysia', quote: 'The industry placement was great.', route: 'build' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Elysia');
  });

  // Test Case 3: Security / Boundary Scenario
  it('TC3  POST /api/stories/submit - should block <script> tags to prevent XSS (403)', async () => {
    const res = await request(app)
      .post('/api/stories/submit')
      .send({ name: 'Hacker', quote: '<script>alert("hack")</script>', route: 'support' });
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Malicious content detected');
  });

  // Test Case 4: Form Validation (Missing Data)
  it('TC4  POST /api/openday/register - should reject registration with missing date (400)', async () => {
    const res = await request(app)
      .post('/api/openday/register')
      .send({ email: 'student@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Open day date is required');
  });

  // Test Case 5: Form Validation (Malformed Data)
  it('TC5  POST /api/openday/register - should reject invalid email formats (400)', async () => {
    const res = await request(app)
      .post('/api/openday/register')
      .send({ email: 'not-an-email', date: 'Sat 12 Jul' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid email address provided');
  });

  // Test Case 6: Detail Endpoint (Normal Flow)
  it('TC6  GET /api/stories/:id - should return the matching story (200)', async () => {
    const res = await request(app).get('/api/stories/maryam');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe('maryam');
    expect(res.body.route).toBe('support');
  });

  // Test Case 7: Detail Endpoint (Edge Case - unknown id)
  it('TC7  GET /api/stories/:id - should return 404 for an unknown id', async () => {
    const res = await request(app).get('/api/stories/does-not-exist');
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Story not found');
  });

  // Test Case 8: Security (HTML neutralisation, not just <script>)
  it('TC8  POST /api/stories/submit - should escape non-script HTML so it renders as text', async () => {
    const res = await request(app)
      .post('/api/stories/submit')
      .send({ name: 'Mallory', quote: 'nice site <img src=x onerror=alert(1)>', route: 'analyse' });
    expect(res.statusCode).toBe(201);                       // accepted...
    expect(res.body.quote).toContain('&lt;img');            // ...but neutralised
    expect(res.body.quote).not.toContain('<img');
  });

  // Test Case 9: Rate Limiting (abuse / bot protection) - RUNS LAST
  it('TC9  POST /api/openday/register - should return 429 after a burst of rapid requests', async () => {
    let last;
    for (let i = 0; i < 10; i++) {
      last = await request(app)
        .post('/api/openday/register')
        .send({ email: `bot${i}@example.com`, date: 'Sat 12 Jul' });
    }
    expect(last.statusCode).toBe(429);
    expect(last.body.error).toMatch(/Too many requests/);
  });

});
