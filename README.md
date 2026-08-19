# Ada Voices - MVP

Functional prototype for the Ada Voices platform: filterable, honest stories from Ada
students and graduates, built to support T Level recruitment at Ada Manchester.
Evolved from the Team Khama hackathon concept into a working client - server MVP.

Digital Technology Project (Year 2) - Software Engineer pathway.

## Stack

- **Front end** - semantic HTML5, modular CSS, vanilla ES6 JavaScript (no frameworks, no build step)
- **Back end** - Node.js + Express serving a JSON API and the static front end
- **Data** - in-memory mock database seeded with 15 personas (`data/stories.js`)
- **Tests** - Jest + Supertest (12 test cases across API and filter engine)

## Quickstart

```
npm install
npm start        # http://localhost:3000
npm test         # run all 12 test cases
npx jest --verbose   # same, with per-case output for evidence screenshots
```

## API

| Method | Route | Purpose | Failure modes |
|--------|------------------------|-------------------------------------------|--------------------------|
| GET | /api/stories | All stories for the filter wall | - |
| GET | /api/stories/:id | Single story for the detail view | 404 unknown id |
| POST | /api/stories/submit | Submit a new story (validated, sanitised) | 400 / 403 / 429 |
| POST | /api/openday/register | Book an open day place (validated) | 400 / 429 |

Write endpoints are rate limited (8 requests / 15 s per IP → 429) and sanitised:
`<script>` payloads are rejected outright (403); all other HTML is escaped before storage.

## Project structure

```
server.js            Express app: static serving, API routes, validation,
                     sanitisation, rate limiting
data/stories.js      15-persona seed database (fictional demo content)
public/index.html    Single-page front end (home + story detail views)
public/css/          Stylesheet (design system from the hackathon prototype)
public/js/filter.js  Pure filter engine (AND-intersection) — unit-testable
public/js/app.js     Fetching, rendering, routing (#/story/:id), forms
api.test.js          TC1–TC9: endpoints, validation, XSS, rate limiting
filter.test.js       TC10–TC12: filter semantics incl. empty state
```

## Notes

- All seed personas are fictional and written for demonstration purposes.
- The data store is deliberately in-memory for the PoC - state resets on restart.
  The submission pipeline (validate → sanitise → persist) is the piece a real
  database would slot behind.
