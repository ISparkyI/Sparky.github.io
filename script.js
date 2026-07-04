// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const tabsNav = document.querySelector('.tabs');
if (menuToggle && tabsNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = tabsNav.classList.toggle('tabs--open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

/* ==========================================================
   LANGUAGE SWITCH (EN default, UK optional)
   Only interface text switches — project titles/descriptions
   stay as written in projects-data.js.
   ========================================================== */
const TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_contact: "Contact",
    hero_lead: "Games, apps, and web projects — all in one place.",
    cta_projects: "View projects",
    cta_contact: "Get in touch",
    projects_title: "Projects",
    filter_all: "All",
    empty_state: "No projects in this category yet.",
    footer_text: "All rights reserved.",
    contact_title: "Let's work together",
    contact_lead: "Fill out the form and I'll get your message by email.",
    label_name: "Name",
    label_email: "Your email",
    label_subject: "Subject",
    subject_placeholder: "e.g. collaboration proposal",
    label_message: "Message",
    submit_btn: "Send",
    sending: "Sending…",
    form_not_connected: "The form isn't connected yet — replace YOUR_FORM_ID in contact.html with your ID from formspree.io.",
    sent_success: "Message sent. Thanks — I'll reply soon.",
    sent_error: "Couldn't send it. Please try again in a moment.",
    network_error: "Network error. Check your connection and try again.",
    cat_games: "Games",
    cat_apps: "Apps",
    cat_web: "Web",
    cat_other: "Other",
    action_games: "Play",
    action_apps: "Buy",
    action_web: "Visit",
    action_other: "View",
    action_default: "Demo",
    code_label: "Code",
  },
  uk: {
    nav_home: "Головна",
    nav_contact: "Контакти",
    hero_lead: "Ігри, застосунки та вебпроєкти — зібрані в одному місці.",
    cta_projects: "Переглянути проєкти",
    cta_contact: "Зв'язатися",
    projects_title: "Проєкти",
    filter_all: "Усі",
    empty_state: "У цій категорії поки немає проєктів.",
    footer_text: "Усі права захищено.",
    contact_title: "Зв'язатися для співпраці",
    contact_lead: "Заповніть форму — повідомлення прийде мені на пошту.",
    label_name: "Ім'я",
    label_email: "Ваша пошта",
    label_subject: "Тема",
    subject_placeholder: "Наприклад: пропозиція співпраці",
    label_message: "Повідомлення",
    submit_btn: "Надіслати",
    sending: "Надсилання…",
    form_not_connected: "Форму ще не підключено — замініть YOUR_FORM_ID у contact.html на свій ID з formspree.io.",
    sent_success: "Повідомлення надіслано. Дякую — відповім найближчим часом.",
    sent_error: "Не вдалося надіслати. Спробуйте ще раз трохи пізніше.",
    network_error: "Помилка мережі. Перевірте з'єднання й спробуйте ще раз.",
    cat_games: "Ігри",
    cat_apps: "Застосунки",
    cat_web: "Веб",
    cat_other: "Інше",
    action_games: "Грати",
    action_apps: "Купити",
    action_web: "Відкрити",
    action_other: "Переглянути",
    action_default: "Демо",
    code_label: "Код",
  },
};

function getLang() {
  return localStorage.getItem('portfolioLang') || 'en';
}

function t(key) {
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
}

function applyStaticTranslations() {
  document.documentElement.lang = getLang();

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });

  document.querySelectorAll('.lang-switch button').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === getLang());
  });
}

// refreshProjects is defined below (only exists on the homepage);
// setLang calls it if present so the filter labels/buttons update too.
let refreshProjects = null;

function setLang(lang) {
  localStorage.setItem('portfolioLang', lang);
  applyStaticTranslations();
  if (typeof refreshProjects === 'function') refreshProjects();
}

applyStaticTranslations();
document.querySelectorAll('.lang-switch button').forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

/* ==========================================================
   ANIMATED BACKGROUND — particles that react to the cursor
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
    step();
  }
})();

/* ==========================================================
   PROJECTS — render cards + category filter
   ========================================================== */
function extractYouTubeId(url) {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
    /(?:youtube-nocookie\.com\/embed\/)([\w-]{11})/,
    /(?:youtube\.com\/shorts\/)([\w-]{11})/,
    /(?:www\.youtube\.com\/shorts\/)([\w-]{11})/,
  ];

  for (const re of patterns) {
    const match = url.match(re);
    if (match) return match[1];
  }

  return null;
}

(function initProjects() {
  const grid = document.getElementById('project-grid');
  const filtersEl = document.getElementById('filters');
  const emptyState = document.getElementById('empty-state');
  if (!grid || typeof PROJECTS === 'undefined') return;

  const CATEGORY_I18N_KEY = { games: 'cat_games', apps: 'cat_apps', web: 'cat_web', other: 'cat_other' };
  const ACTION_I18N_KEY = { games: 'action_games', apps: 'action_apps', web: 'action_web', other: 'action_other' };

  function categoryLabel(cat) {
    const key = CATEGORY_I18N_KEY[cat];
    return key ? t(key) : cat;
  }

  function actionLabel(cat) {
    const key = ACTION_I18N_KEY[cat];
    return key ? t(key) : t('action_default');
  }

  const categoryKeys = [...new Set(PROJECTS.map((p) => p.category))];
  let activeCategory = 'all';

  function renderFilters() {
    filtersEl.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = 'filter-btn' + (activeCategory === 'all' ? ' is-active' : '');
    allBtn.textContent = t('filter_all');
    allBtn.addEventListener('click', () => {
      activeCategory = 'all';
      renderFilters();
      renderProjects();
    });
    filtersEl.appendChild(allBtn);

    categoryKeys.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'filter-btn' + (cat === activeCategory ? ' is-active' : '');
      btn.textContent = categoryLabel(cat);
      btn.addEventListener('click', () => {
        activeCategory = cat;
        renderFilters();
        renderProjects();
      });
      filtersEl.appendChild(btn);
    });
  }

  // Get localized description: supports plain string or { en, uk } object
  function getDesc(p) {
    if (!p.description) return '';
    if (typeof p.description === 'string') return p.description;
    const lang = getLang();
    return p.description[lang] || p.description.en || '';
  }

  function renderProjects() {
    const list = activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

    grid.innerHTML = '';
    emptyState.hidden = list.length !== 0;
    emptyState.textContent = t('empty_state');

    // Build all cards — detect image orientation first, then render
    const buildCard = (p, isPortrait, imgRatio) => {
      const hasRepo = p.repo && p.repo.trim() !== '';
      const ytId = extractYouTubeId(p.video);
      const photoSlides = (p.images || []).filter((src) => src && src.trim() !== '');
      const hasVideo = !!ytId;
      const hasPhotos = photoSlides.length > 0;
      const hasBoth = hasPhotos && hasVideo;
      const mediaClass = isPortrait ? 'project-card__media--portrait' : '';
      const ratioStyle = (isPortrait && imgRatio) ? `style="aspect-ratio: ${imgRatio}"` : '';

      // --- Tab strip (rendered OUTSIDE the card, above it) ---
      let tabStripEl = null;
      if (hasBoth) {
        tabStripEl = document.createElement('div');
        tabStripEl.className = 'media-tabs';
        tabStripEl.innerHTML = `
          <button type="button" class="media-tab media-tab--active" data-panel="photos">📷 Фото</button>
          <button type="button" class="media-tab" data-panel="video">▶ Відео</button>
        `;
      }

      // --- Card element ---
      const card = document.createElement('article');
      card.className = 'project-card';

      // Media area inside the card
      let mediaHtml = '';
      if (!hasPhotos && !hasVideo) {
        mediaHtml = `<div class="project-card__media project-card__media--placeholder ${mediaClass}" ${ratioStyle}>${categoryLabel(p.category)}</div>`;
      } else {
        // Photo panel — always active first if photos exist
        let photoPanelHtml = '';
        if (hasPhotos) {
          const infinite = photoSlides.length > 1;
          const slidesHtml = infinite
            ? [photoSlides[photoSlides.length - 1], ...photoSlides, photoSlides[0]]
                .map((src) => `<div class="carousel__slide"><img src="${src}" alt="${p.title}" loading="lazy"></div>`)
                .join('')
            : photoSlides.map((src) => `<div class="carousel__slide"><img src="${src}" alt="${p.title}" loading="lazy"></div>`).join('');

          photoPanelHtml = `
            <div class="media-panel media-panel--active" data-panel="photos">
              <div class="project-card__media carousel-wrap ${mediaClass}" ${ratioStyle}>
                <div class="carousel${infinite ? ' carousel--infinite' : ''}" data-total="${photoSlides.length}" data-infinite="${infinite}">
                  ${slidesHtml}
                </div>
                ${photoSlides.length > 1 ? `
                  <button type="button" class="carousel__arrow carousel__arrow--prev" aria-label="Previous">‹</button>
                  <button type="button" class="carousel__arrow carousel__arrow--next" aria-label="Next">›</button>
                  <div class="carousel__dots">
                    ${photoSlides.map((_, i) => `<button type="button" class="carousel__dot${i === 0 ? ' is-active' : ''}" aria-label="Slide ${i + 1}"></button>`).join('')}
                  </div>
                ` : ''}
              </div>
            </div>`;
        }

        // Video panel — active only if no photos
        let videoPanelHtml = '';
        if (hasVideo) {
          videoPanelHtml = `
            <div class="media-panel${!hasPhotos ? ' media-panel--active' : ''}" data-panel="video">
              <div class="project-card__media ${mediaClass}" ${ratioStyle}>
                <iframe src="https://www.youtube-nocookie.com/embed/${ytId}" title="${p.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>`;
        }

        mediaHtml = `<div class="media-body" data-portrait="${isPortrait}">${photoPanelHtml}${videoPanelHtml}</div>`;
      }

      const buttonText =
      p.category === "apps" && p.price
        ? `${actionLabel(p.category)} $${p.price}`
        : actionLabel(p.category);
      
      card.innerHTML = `
        ${mediaHtml}
        <div class="project-card__body">
          <div class="project-card__category">${categoryLabel(p.category)}</div>
          <h3></h3>
          <p></p>
          <div class="tags">${p.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
          <div class="project-card__links">
            <a class="btn btn--primary btn--small" href="${p.demo || '#'}" target="_blank" rel="noopener">${buttonText}</a>
            ${hasRepo ? `<a class="btn btn--ghost btn--small" href="${p.repo}" target="_blank" rel="noopener">${t('code_label')}</a>` : ''}
          </div>
        </div>
      `;
      card.querySelector('h3').textContent = p.title;
      card.querySelector('p').innerHTML = getDesc(p);

      // Wrap card + tabs in a container
      const wrapper = document.createElement('div');
      wrapper.className = 'card-wrapper' + (isPortrait ? ' card-wrapper--portrait' : '');
      if (tabStripEl) {
        wrapper.appendChild(tabStripEl);

        // Tab switching logic
        tabStripEl.querySelectorAll('.media-tab').forEach((tab) => {
          tab.addEventListener('click', () => {
            tabStripEl.querySelectorAll('.media-tab').forEach((tb) => tb.classList.remove('media-tab--active'));
            card.querySelectorAll('.media-panel').forEach((panel) => panel.classList.remove('media-panel--active'));
            tab.classList.add('media-tab--active');
            const targetPanel = card.querySelector(`.media-panel[data-panel="${tab.dataset.panel}"]`);
            targetPanel.classList.add('media-panel--active');

            // Re-initialize carousel position after panel becomes visible
            if (tab.dataset.panel === 'photos') {
              const track = card.querySelector('.carousel--infinite');
              if (track && track._carouselInit) track._carouselInit();
            }
          });
        });
      }
      // For portrait: move tabs inside .media-body so they sit above the image column only

      wrapper.appendChild(card);

      // --- Infinite carousel setup ---
      const track = card.querySelector('.carousel');
      if (track) {
        const isInfinite = track.dataset.infinite === 'true';
        const total = parseInt(track.dataset.total, 10);
        const dots = card.querySelectorAll('.carousel__dot');
        const prevBtn = card.querySelector('.carousel__arrow--prev');
        const nextBtn = card.querySelector('.carousel__arrow--next');

        if (!prevBtn) {
          // Single photo — nothing to wire up
        } else if (!isInfinite) {
          // Standard scroll carousel (only reached if somehow total=1 but that's caught above)
          const goTo = (index) => {
            track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
          };
          prevBtn.addEventListener('click', () => {
            const cur = Math.round(track.scrollLeft / track.clientWidth);
            goTo(Math.max(0, cur - 1));
          });
          nextBtn.addEventListener('click', () => {
            const cur = Math.round(track.scrollLeft / track.clientWidth);
            goTo(Math.min(total - 1, cur + 1));
          });
          dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
          let st;
          track.addEventListener('scroll', () => {
            clearTimeout(st);
            st = setTimeout(() => {
              const cur = Math.round(track.scrollLeft / track.clientWidth);
              dots.forEach((dot, i) => dot.classList.toggle('is-active', i === cur));
            }, 80);
          });
        } else {
          // Infinite scroll-based carousel.
          // DOM: [clone-last, real-0, ..., real-(N-1), clone-first]
          let currentReal = 0;
          let jumping = false;

          const slideW = () => track.clientWidth;

          const jumpToDOM = (domIndex) => {
            jumping = true;
            track.style.scrollBehavior = 'auto';
            track.scrollLeft = domIndex * slideW();
            requestAnimationFrame(() => {
              track.style.scrollBehavior = '';
              jumping = false;
            });
          };

          const scrollToDOM = (domIndex) => {
            track.scrollTo({ left: domIndex * slideW(), behavior: 'smooth' });
          };

          const updateDots = (realIndex) => {
            dots.forEach((dot, i) => dot.classList.toggle('is-active', i === realIndex));
          };

          const init = () => { jumpToDOM(1); updateDots(0); currentReal = 0; };
          track._carouselInit = init;

          let scrollTimer;
          track.addEventListener('scroll', () => {
            if (jumping) return;
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
              const sw = slideW() || 1;
              const domIndex = Math.round(track.scrollLeft / sw);
              if (domIndex === 0) {
                currentReal = total - 1;
                jumpToDOM(total);
              } else if (domIndex === total + 1) {
                currentReal = 0;
                jumpToDOM(1);
              } else {
                currentReal = domIndex - 1;
              }
              updateDots(currentReal);
            }, 80);
          });

          prevBtn.addEventListener('click', () => {
            if (currentReal === 0) {
              // jump to clone-last (domIndex 0), then silently land on real-last
              track.scrollTo({ left: 0, behavior: 'smooth' });
              setTimeout(() => {
                currentReal = total - 1;
                jumpToDOM(total);
                updateDots(currentReal);
              }, 350);
            } else {
              currentReal -= 1;
              scrollToDOM(currentReal + 1);
              updateDots(currentReal);
            }
          });

          nextBtn.addEventListener('click', () => {
            if (currentReal === total - 1) {
              // scroll to clone-first, then silently jump to real-first
              scrollToDOM(total + 1);
              setTimeout(() => {
                currentReal = 0;
                jumpToDOM(1);
                updateDots(0);
              }, 350);
            } else {
              currentReal += 1;
              scrollToDOM(currentReal + 1);
              updateDots(currentReal);
            }
          });

          dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
              currentReal = i;
              scrollToDOM(currentReal + 1);
              updateDots(currentReal);
            });
          });

          window.addEventListener('resize', () => jumpToDOM(currentReal + 1));
          requestAnimationFrame(() => requestAnimationFrame(init));
        }
      }

      return wrapper;
    }; // end buildCard

    // Pre-create placeholder wrapper elements to lock order in the DOM,
    // then fill them in once image orientation is known (async).
    list.forEach((p) => {
      const photoSlides = (p.images || []).filter((src) => src && src.trim() !== '');
      const firstPhoto = photoSlides[0];

      // Reserve a slot in the grid immediately — keeps PROJECTS order intact
      const slot = document.createElement('div');
      grid.appendChild(slot);

      const fill = (isPortrait, imgRatio) => {
        const wrapper = buildCard(p, isPortrait, imgRatio);
        slot.replaceWith(wrapper);
      };

      if (firstPhoto) {
        const img = new Image();
        img.onload = () => {
          const portrait = img.naturalHeight > img.naturalWidth;
          const ratio = portrait ? `${img.naturalWidth} / ${img.naturalHeight}` : null;
          fill(portrait, ratio);
        };
        img.onerror = () => fill(false, null);
        img.src = firstPhoto;
      } else {
        fill(false);
      }
    });
  }

  refreshProjects = function refresh() {
    renderFilters();
    renderProjects();
  };

  refreshProjects();
})();

/* ==========================================================
   CONTACT FORM — AJAX submit to Formspree
   ========================================================== */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = t('form_not_connected');
      status.className = 'form-status is-error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = t('sending');
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        status.textContent = t('sent_success');
        status.className = 'form-status is-success';
        form.reset();
      } else {
        status.textContent = t('sent_error');
        status.className = 'form-status is-error';
      }
    } catch (err) {
      status.textContent = t('network_error');
      status.className = 'form-status is-error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = t('submit_btn');
    }
  });
})();