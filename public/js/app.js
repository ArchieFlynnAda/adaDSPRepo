/* ============================================================
   ADA VOICES - MVP client logic
   ------------------------------------------------------------
   Evolution of the hackathon prototype script. Differences:
   - stories are fetched from GET /api/stories instead of being
     hard-coded in the page;
   - filtering is delegated to the pure AdaFilter module
     (public/js/filter.js) so the algorithm is unit-testable;
   - the story detail view fetches GET /api/stories/:id and is
     deep-linkable via the URL hash (#/story/<id>);
   - the open day form POSTs to /api/openday/register and the
     share-your-story form POSTs to /api/stories/submit, with
     server-side validation errors surfaced in the UI.
   No frameworks, no build step, no client-side storage.
   ============================================================ */

const PATH = {
  build:   { label: 'Production, Design & Development', cls: 'build',   color: '#EC5B53', deep: '#c93f37' },
  support: { label: 'Digital Support Services',         cls: 'support', color: '#2F9FD6', deep: '#1f7aab' },
  analyse: { label: 'Digital Business Services',        cls: 'analyse', color: '#8B5CF6', deep: '#6d3fd6' }
};

const API = '/api';
let STORIES = [];                 // populated from the API on load
const active = new Set();         // currently selected filter chips

/* ---------- render a story card ---------- */
function cardHTML(s) {
  const p = PATH[s.route];
  const campus = s.campus === 'London'
    ? '<span class="sc-campus">ADA LONDON GRAD</span>' : '';
  return `<button class="story-card" onclick="openStory('${s.id}')" aria-label="Read ${s.name}'s story">
    <div class="sc-media" style="background:linear-gradient(150deg,${p.color},${p.deep})">
      ${campus}
      <span class="ini">${s.ini}</span>
      <span class="play">&#9654; Watch</span>
      <span class="runtime">${s.runtime || ''}</span>
    </div>
    <div class="sc-body">
      <span class="route-tag route-${p.cls}"><span class="d"></span>${p.label}</span>
      <div class="sc-id"><span class="nm">${s.name}</span><span class="lo">${s.age ? s.age + ' · ' : ''}${s.borough || ''}</span></div>
      <p class="sc-quote"><span class="qm">"</span>${s.quote}<span class="qm">"</span></p>
      <div class="sc-now"><span class="arrow">&rarr;</span> ${s.now || 'Story in review'}</div>
    </div>
  </button>`;
}

/* ---------- filtering (delegates to AdaFilter, see filter.js) ---------- */
function renderWall() {
  const wall = document.getElementById('wall');
  const list = AdaFilter.applyFilters(STORIES, active);
  document.getElementById('count').textContent = list.length;
  document.getElementById('reset').style.display = active.size > 0 ? 'inline' : 'none';
  wall.innerHTML = list.length ? list.map(cardHTML).join('') :
    `<div class="empty">No stories match all of that yet &mdash; but the platform is built to grow. Try fewer filters, or <button class="link-reset" onclick="resetFilters()">clear them</button>.</div>`;
}

function resetFilters() {
  active.clear();
  document.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
  renderWall();
}

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const tag = chip.dataset.tag;
    const on = chip.getAttribute('aria-pressed') === 'true';
    chip.setAttribute('aria-pressed', on ? 'false' : 'true');
    if (on) active.delete(tag); else active.add(tag);
    renderWall();
  });
});

/* ---------- story detail (GET /api/stories/:id, hash-routed) ---------- */
async function openStory(id) {
  let s;
  try {
    const res = await fetch(`${API}/stories/${encodeURIComponent(id)}`);
    if (!res.ok) return;                       // 404 -> stay on the wall
    s = await res.json();
  } catch (err) {
    s = STORIES.find(x => x.id === id);        // offline fallback
    if (!s) return;
  }

  const p = PATH[s.route];
  const grad = `linear-gradient(150deg,${p.color},${p.deep})`;
  document.getElementById('sp-portrait').style.background = grad;
  document.getElementById('sp-portrait').textContent = s.ini;
  document.getElementById('sp-name').textContent = s.name;
  document.getElementById('sp-where').textContent = `${s.age} · ${s.borough} · ${p.label}`;
  document.getElementById('sp-now').textContent = 'Now: ' + s.now;
  document.getElementById('sp-player').style.background = grad;
  document.getElementById('sp-rt').textContent = s.runtime || '';
  document.getElementById('ch1-h').textContent = '"' + s.quote + '"';
  document.getElementById('ch1-p').textContent = s.ch1 || '';
  document.getElementById('ch1-q').textContent = s.ch1q ? '"' + s.ch1q + '"' : '';
  document.getElementById('ch2-p').textContent = s.ch2 || '';
  document.getElementById('ch3-p').textContent = s.ch3 || '';
  document.getElementById('sp-parent').textContent = s.parent || '';
  document.getElementById('rel-name').textContent = s.name;

  document.getElementById('sp-path').innerHTML = (s.path || []).map(st =>
    `<li class="${st.muted ? 'muted' : ''}"><span class="pd" style="${st.now ? ('background:' + p.color) : ''}"></span><span class="pt"><b>${st.t}</b><span>${st.s || ''}</span></span></li>`
  ).join('');
  document.getElementById('sp-tags').innerHTML =
    (s.interests || []).map(i => `<span class="t">${i}</span>`).join('');

  // related = same route OR shared tag, excluding self
  const rel = STORIES.filter(x => x.id !== s.id && (x.route === s.route || (x.tags || []).some(t => (s.tags || []).includes(t)))).slice(0, 3);
  document.getElementById('related').innerHTML =
    (rel.length ? rel : STORIES.filter(x => x.id !== s.id).slice(0, 3)).map(cardHTML).join('');

  document.getElementById('view-home').style.display = 'none';
  document.getElementById('view-story').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.getElementById('navlinks').classList.remove('open');
  if (location.hash !== '#/story/' + s.id) history.pushState(null, '', '#/story/' + s.id);
}

/* ---------- navigation ---------- */
function goHome(anchor) {
  document.getElementById('view-story').style.display = 'none';
  document.getElementById('view-home').style.display = 'block';
  document.getElementById('navlinks').classList.remove('open');
  if (location.hash.startsWith('#/story/')) history.pushState(null, '', '#');
  if (anchor) {
    requestAnimationFrame(() => { const el = document.getElementById(anchor); if (el) el.scrollIntoView({ behavior: 'smooth' }); });
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
}

function routeFromHash() {
  const m = location.hash.match(/^#\/story\/([a-z0-9-]+)$/i);
  if (m) openStory(m[1]);
}
window.addEventListener('popstate', () => {
  if (location.hash.startsWith('#/story/')) routeFromHash(); else goHome();
});

/* ---------- open day (POST /api/openday/register) ---------- */
let chosenDate = null;
document.querySelectorAll('#dateChips .date-chip').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#dateChips .date-chip').forEach(x => x.setAttribute('aria-pressed', 'false'));
    b.setAttribute('aria-pressed', 'true');
    chosenDate = b.querySelector('b').textContent;
  });
});

async function bookOpenDay() {
  const email = document.getElementById('ctaEmail').value.trim();
  const c = document.getElementById('ctaConfirm');
  const t = document.getElementById('ctaConfirmText');

  // client-side checks first for a fast, friendly response...
  if (!/\S+@\S+\.\S+/.test(email)) { t.textContent = 'Pop your email in and we\u2019ll send the details.'; c.classList.add('show'); return; }
  if (!chosenDate) { t.textContent = 'Almost there \u2014 tap a date above and we\u2019ll lock it in.'; c.classList.add('show'); return; }

  // ...then the server has the final say (never trust the client).
  try {
    const res = await fetch(`${API}/openday/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, date: chosenDate })
    });
    const body = await res.json();
    if (res.ok) {
      t.textContent = `You\u2019re booked for ${chosenDate}. Check ${email} for the details \u2014 forward them to a parent or mate if you want to bring someone.`;
      document.getElementById('ctaForm').style.opacity = '.5';
    } else {
      t.textContent = body.error || 'That didn\u2019t go through \u2014 check the details and try again.';
    }
  } catch (err) {
    t.textContent = 'Can\u2019t reach the server right now \u2014 is it running? (npm start)';
  }
  c.classList.add('show');
}

/* ---------- share your story (POST /api/stories/submit) ---------- */
const shareForm = document.getElementById('shareForm');
if (shareForm) {
  shareForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('shareMsg');
    msg.className = 'share-msg';
    const payload = {
      name: document.getElementById('sfName').value.trim(),
      route: document.getElementById('sfRoute').value,
      quote: document.getElementById('sfQuote').value.trim()
    };
    try {
      const res = await fetch(`${API}/stories/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const body = await res.json();
      if (res.status === 201) {
        msg.textContent = `Thanks ${body.name} \u2014 your story is in the review queue and now shows on the wall below.`;
        msg.classList.add('ok');
        shareForm.reset();
        await loadStories();               // re-fetch so the new card appears
      } else {
        msg.textContent = body.error || 'Something went wrong \u2014 try again.';
        msg.classList.add('err');
      }
    } catch (err) {
      msg.textContent = 'Can\u2019t reach the server \u2014 start it with npm start and try again.';
      msg.classList.add('err');
    }
  });
}

/* ---------- init: load stories from the API ---------- */
async function loadStories() {
  const status = document.getElementById('apiStatus');
  try {
    const res = await fetch(`${API}/stories`);
    STORIES = await res.json();
    if (status) status.textContent = `API OK \u00b7 ${STORIES.length} stories loaded from GET /api/stories`;
  } catch (err) {
    STORIES = [];
    if (status) status.textContent = 'API unreachable \u2014 run npm start and reload.';
  }
  renderWall();
  routeFromHash();                          // support deep links on first load
}
loadStories();
