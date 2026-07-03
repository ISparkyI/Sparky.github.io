// Рік у футері
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Мобільне меню
const menuToggle = document.querySelector('.menu-toggle');
const tabsNav = document.querySelector('.tabs');
if (menuToggle && tabsNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = tabsNav.classList.toggle('tabs--open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ==========================================================
   АНІМОВАНИЙ ФОН — частинки, що реагують на курсор
   ========================================================== */
(function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let width, height, particles;
  const mouse = { x: -9999, y: -9999 };
  const PARTICLE_COUNT = 70;
  const LINK_DIST = 130;
  const MOUSE_DIST = 160;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const nearMouse = dist < MOUSE_DIST;

      ctx.beginPath();
      ctx.arc(p.x, p.y, nearMouse ? 2.4 : 1.4, 0, Math.PI * 2);
      ctx.fillStyle = nearMouse
        ? 'rgba(230, 57, 74, 0.9)'
        : 'rgba(140, 140, 150, 0.5)';
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          const midX = (a.x + b.x) / 2;
          const midY = (a.y + b.y) / 2;
          const dMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
          const near = dMouse < MOUSE_DIST;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = near
            ? `rgba(230, 57, 74, ${0.35 * (1 - dist / LINK_DIST)})`
            : `rgba(120, 120, 130, ${0.15 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  resize();
  createParticles();
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('pointerleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  if (!prefersReducedMotion) {
    requestAnimationFrame(step);
  } else {
    // Статичний кадр без анімації для людей, що обрали "менше руху"
    step();
  }
})();

/* ==========================================================
   ПРОЄКТИ — рендер карток і фільтр за категорією
   ========================================================== */
(function initProjects() {
  const grid = document.getElementById('project-grid');
  const filtersEl = document.getElementById('filters');
  const emptyState = document.getElementById('empty-state');
  if (!grid || typeof PROJECTS === 'undefined') return;

  const categories = ['Усі', ...new Set(PROJECTS.map((p) => p.category))];
  let activeCategory = 'Усі';

  function renderFilters() {
    filtersEl.innerHTML = '';
    categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn' + (cat === activeCategory ? ' is-active' : '');
      btn.textContent = cat;
      btn.addEventListener('click', () => {
        activeCategory = cat;
        renderFilters();
        renderProjects();
      });
      filtersEl.appendChild(btn);
    });
  }

  function renderProjects() {
    const list = activeCategory === 'Усі'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

    grid.innerHTML = '';
    emptyState.hidden = list.length !== 0;

    list.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.innerHTML = `
        <div class="project-card__category">${p.category}</div>
        <h3></h3>
        <p></p>
        <div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
        <div class="project-card__links">
          <a href="${p.demo}" target="_blank" rel="noopener">Demo →</a>
          <a href="${p.repo}" target="_blank" rel="noopener">Код →</a>
        </div>
      `;
      // textContent для назви/опису — безпечно навіть якщо в даних спецсимволи
      card.querySelector('h3').textContent = p.title;
      card.querySelector('p').textContent = p.description;
      grid.appendChild(card);
    });
  }

  renderFilters();
  renderProjects();
})();

/* ==========================================================
   ФОРМА ЗВ'ЯЗКУ — AJAX-відправка на Formspree
   ========================================================== */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = 'Форму ще не підключено: замініть YOUR_FORM_ID у contact.html на свій ID з formspree.io (див. коментар у файлі).';
      status.className = 'form-status is-error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Надсилання…';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        status.textContent = 'Повідомлення надіслано. Дякую — відповім найближчим часом.';
        status.className = 'form-status is-success';
        form.reset();
      } else {
        status.textContent = 'Не вдалося надіслати. Спробуйте ще раз трохи пізніше.';
        status.className = 'form-status is-error';
      }
    } catch (err) {
      status.textContent = 'Помилка мережі. Перевірте з\'єднання й спробуйте ще раз.';
      status.className = 'form-status is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Надіслати';
    }
  });
})();
