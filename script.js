/* ═══════════════════════════════════════════════════
   HALALAN 2025 — script.js
   Data-driven sections + interactions
═══════════════════════════════════════════════════ */

'use strict';

/* ── DATA ── */

const timelineData = [
  { date: 'Mar 1',   label: 'Filing of Candidacy Opens' },
  { date: 'Mar 11',  label: 'Filing of Candidacy Closes' },
  { date: 'Mar 15',  label: 'Posting of Official Candidates' },
  { date: 'Mar 16',  label: 'Campaign Period Begins' },
  { date: 'April 8',  label: 'Meeting de Avance and End of Campaign Period' },
  { date: 'April 9',  label: 'Special Online Election for OJT Students' },
  { date: 'April 10',  label: 'Election Day' },
  { date: 'April 13',  label: 'Proclamation of Winners' },
];

const collegesData = [
  { name: 'Brit Aquila C. Tandog',       position: 'COA Representative',   initials: 'BT', logo:'assets/person_icon.svg'},
  { name: 'Arjen N. Pepito',             position: 'COED Representative',  initials: 'AP', logo:'assets/person_icon.svg'},
  { name: 'Emmanuel T. Valenzona',       position: 'COE Representative',   initials: 'EV', logo:'assets/person_icon.svg'},
  { name: 'Jumarie C. Burato',           position: 'CFES Representative',  initials: 'JB', logo:'assets/person_icon.svg' },
  { name: 'Jacquelou L. Espera',         position: 'CHE Representative',   initials: 'JE' , logo:'assets/person_icon.svg'},
  { name: 'Krizian Jun G. Escobillo',    position: 'CISC Representative',  initials: 'KE' , logo:'assets/person_icon.svg'},
  { name: 'Jamie Gail L. Sy',            position: 'CVM Representative',   initials: 'JS' , logo:'assets/person_icon.svg'},
  { name: 'Matt Freddie I. Castil',      position: 'CAS Representative',   initials: 'MC' , logo:'assets/person_icon.svg'},
  { name: 'Carl Patrick R. Rebago',      position: 'CBM Representative',   initials: 'CR', logo:'assets/person_icon.svg' },
  { name: 'Zyann Maxinne S. Matin-ao',   position: 'CON Representative',   initials: 'ZM' , logo:'assets/person_icon.svg'},
  { name: 'Gil James Amante',            position: 'USSCO Representative', initials: 'GA', logo:'assets/person_icon.svg' },
  { name: 'Alyssa Sayon',            position: 'ARSO Representative', initials: 'AS', logo:'assets/person_icon.svg' },
];

const committeeData = {
  row1: [
    { name: 'HEAVEN ANGELIQUE SOBERANO', role: 'Chief Commissioner', initials: 'HS', logo: 'assets/person_icon.svg' },
    { name: 'MILKY WEE I. SEGOVIA',      role: 'Vice Commissioner',  initials: 'MS', logo: 'assets/person_icon.svg' },
  ],
  row2: [
    { name: 'NICOLLE P. PEDROSA',        role: 'General Secretary',   initials: 'NP', logo: 'assets/person_icon.svg' },
    { name: 'CHENELLE ANNE M. AGUINALDO',role: 'Associate Secretary', initials: 'CA', logo: 'assets/person_icon.svg' },
  ],
  row3: [
    { name: 'REY ANGELO B. ARSENAL',     role: 'Head, Canvassing and Verification Committee',     initials: 'RA', logo: 'assets/person_icon.svg' },
    { name: 'RAMA ACE C. DACERA',        role: 'Head, Ocular Committee Against Misconduct',       initials: 'RD', logo: 'assets/person_icon.svg' },
    { name: 'CARLOS FIDEL G. CASTRO',    role: 'Head, Transparency and Accountability',           initials: 'CC', logo: 'assets/person_icon.svg' },
  ],
};

const requirementsData = [
  {
    letter: 'A', icon: '📝',
    title: 'Certificate of Candidacy',
    desc: 'Accomplished form with 2×2 ID photo attached.'
  },
  {
    letter: 'B', icon: '🎓',
    title: 'Certificate of Good Moral',
    desc: 'Issued by the university or your college.'
  },
  {
    letter: 'C', icon: '📊',
    title: 'Grade Slip',
    desc: 'Official grades from the previous semester.'
  },
  {
    letter: 'D', icon: '📄',
    title: 'Certificate of Registration',
    desc: 'Valid COR for the current semester.'
  },
  {
    letter: 'E', icon: '✍️',
    title: 'Endorsement Letters',
    desc: 'From your Dean and Department Head. If no Dept. Head, Dean signature suffices.'
  },
  {
    letter: 'F', icon: '📁',
    title: 'Curriculum Vitae',
    desc: 'Most recent copy of your CV.'
  },
  {
    letter: 'G', icon: '📌',
    title: 'General Plan of Action',
    desc: 'Comprehensive plan required for all candidates — independent or party member.'
  },
  {
    letter: 'H', icon: '👥',
    title: 'Party Submission Rule',
    desc: 'Parties must submit as a group. Incomplete party = automatically independent.'
  },
];


/* ══════════════════════════════════════════════════
   REQUIREMENTS — render cards
══════════════════════════════════════════════════ */
(function initRequirements() {
  const grid = document.getElementById('req-grid');
  if (!grid) return;

  requirementsData.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = 'req-card fade-in';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.style.transitionDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="req-icon" aria-hidden="true">${r.icon}</div>
      <div class="req-body">
        <div class="req-title">
          <span class="req-letter" aria-hidden="true">${r.letter}</span>
          &nbsp;${r.title}
        </div>
        <div class="req-desc">${r.desc}</div>
      </div>
    `;
    grid.appendChild(card);
  });
})();



(function initNavbar() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.getElementById('nav-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ═══════════════════════════════════════════════════
   NAVBAR — hamburger + scroll tint
═══════════════════════════════════════════════════ */
(function initNavbar() {
  const btn   = document.querySelector('.hamburger');
  const menu  = document.getElementById('nav-menu');
  const links = menu?.querySelectorAll('a');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  links?.forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();


/* ═══════════════════════════════════════════════════
   TIMELINE — render + arrow scroll
═══════════════════════════════════════════════════ */
(function initTimeline() {
  const container = document.querySelector('.timeline-scroll');
  const prevBtn   = document.querySelector('.tl-prev');
  const nextBtn   = document.querySelector('.tl-next');
  const dots      = document.querySelectorAll('.tl-dot');

  if (!container) return;

  // Render items
  timelineData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'tl-item fade-in';
    el.setAttribute('role', 'listitem');
    el.style.transitionDelay = `${i * 0.06}s`;
    el.innerHTML = `
      <div class="tl-item-date">${item.date}</div>
      <div class="tl-item-label">${item.label}</div>
    `;
    container.appendChild(el);
  });

  const SCROLL_AMT = 224; // card width + gap

  prevBtn?.addEventListener('click', () => {
    container.scrollBy({ left: -SCROLL_AMT, behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    container.scrollBy({ left: SCROLL_AMT, behavior: 'smooth' });
  });

  // Keyboard support on arrows
  [prevBtn, nextBtn].forEach(btn => {
    btn?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  // Update diagram dots on scroll
  container.addEventListener('scroll', () => {
    const pct = container.scrollLeft / (container.scrollWidth - container.clientWidth);
    const idx = Math.round(pct * (dots.length - 1));
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  });
})();


/* ═══════════════════════════════════════════════════
   COLLEGES — render
═══════════════════════════════════════════════════ */
(function initColleges() {
  const list = document.getElementById('colleges-list');
  if (!list) return;

  collegesData.forEach((c, i) => {
    const el = document.createElement('div');
    el.className = 'college-entry fade-in';
    el.setAttribute('role', 'listitem');
    el.style.transitionDelay = `${i * 0.07}s`;

    el.innerHTML = `
      <div class="college-avatar" aria-hidden="true">
        <img src="${c.logo}" alt="${c.position} logo"
             onerror="this.remove(); this.parentElement.textContent='${c.initials}'">
      </div>
      <div class="college-info">
        <div class="college-name">${c.name}</div>
        <div class="college-position">${c.position}</div>
      </div>
    `;

    list.appendChild(el);
  });
})();


/* ═══════════════════════════════════════════════════
   COMMITTEE — render
═══════════════════════════════════════════════════ */
(function initCommittee() {
  const wrap = document.getElementById('committee-grid');
  if (!wrap) return;

  const rows = [committeeData.row1, committeeData.row2, committeeData.row3];

  rows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'comm-row';

    row.forEach(member => {
      const card = document.createElement('div');
      card.className = 'comm-card fade-in';

      card.innerHTML = `
        <div class="comm-avatar" aria-hidden="true">
          <img src="${member.logo}" alt="${member.role} icon"
               onerror="this.remove(); this.parentElement.textContent='${member.initials}'">
        </div>
        <div class="comm-name">${member.name}</div>
        <div class="comm-role">${member.role}</div>
      `;

      rowEl.appendChild(card);
    });

    wrap.appendChild(rowEl);
  });
})();


/* ═══════════════════════════════════════════════════
   INTERSECTION OBSERVER — fade-in
═══════════════════════════════════════════════════ */
(function initFadeIn() {
  const els = document.querySelectorAll(
    '.step-card, .dl-card, .college-entry, .comm-card, .tl-item, .quote-card, .filing-content'
  );

  els.forEach(el => el.classList.add('fade-in'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
})();


/* ═══════════════════════════════════════════════════
   TICKER — duplicate for seamless loop
═══════════════════════════════════════════════════ */
(function initTicker() {
  const ticker = document.querySelector('.hero-ticker span');
  if (!ticker) return;
  ticker.innerHTML = ticker.textContent.repeat(3);
})();

