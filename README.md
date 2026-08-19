Ada Voices - MVP

Functional prototype for the Ada Voices platform: filterable, honest stories from Ada
students and graduates, built to support T Level recruitment at Ada Manchester.
Evolved from the Team Khama hackathon concept into a working client - server MVP.

Digital Technology Project (Year 2) - Software Engineer pathway.


- **Front end*- semantic HTML5, modular CSS, vanilla ES6 JavaScript (no frameworks, no build step)
- **Back end** - Node.js + Express serving a JSON API and the static front end
- **Data** - in-memory mock database seeded with 15 personas (`data/stories.js`)
- **Tests** - Jest + Supertest (12 test cases across API and filter engine)

npm install
npm start        # http://localhost:3000
npm test         # run all 12 test cases
npx jest --verbose   # same, with per-case output for evidence screenshots


