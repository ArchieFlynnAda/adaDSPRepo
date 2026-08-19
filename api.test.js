const request = require('supertest');
const app = require('./server');

describe('Ada Voices API Endpoints', () => {

  // Test Case 1: Normal Flow
  it('GET /api/stories - should return a 200 status and an array of stories', async () => {
    const res = await request(app).get('/api/stories');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test Case 2: Successful State Transition
  it('POST /api/stories/submit - should accept a valid submission and return 201', async () => {
    const res = await request(app)
      .post('/api/stories/submit')
      .send({ name: 'Elysia', quote: 'The industry placement was great.', route: 'build' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Elysia');
  });

  // Test Case 3: Security / Boundary Scenario
  it('POST /api/stories/submit - should block <script> tags to prevent XSS (403)', async () => {
    const res = await request(app)
      .post('/api/stories/submit')
      .send({ name: 'Hacker', quote: '<script>alert("hack")</script>', route: 'support' });
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toBe('Malicious content detected');
  });

  // Test Case 4: Form Validation (Missing Data)
  it('POST /api/openday/register - should reject registration with missing date (400)', async () => {
    const res = await request(app)
      .post('/api/openday/register')
      .send({ email: 'student@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Open day date is required');
  });

  // Test Case 5: Form Validation (Malformed Data)
  it('POST /api/openday/register - should reject invalid email formats (400)', async () => {
    const res = await request(app)
      .post('/api/openday/register')
      .send({ email: 'not-an-email', date: 'Sat 12 Jul' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Invalid email address provided');
  });

});