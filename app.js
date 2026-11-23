/* =====================================================
   NovelaHub — Lógica de la aplicación
   Búsqueda · Filtros · Orden · Modal · Animaciones
   ===================================================== */

(function () {
  'use strict';

  /* ---------- Estado ---------- */
  const state = {
    query: '',
    genre: 'all',
    sort: 'recent',
    view: 'grid'
  };

  /* ---------- Referencias DOM ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const grid = $('#novelsGrid');
  const emptyState = $('#emptyState');
  const searchInput = $('#searchInput');
  const searchClear = $('#searchClear');
  const sortSelect = $('#sortSelect');
  const chips = $$('.chip');
  const viewBtns = $$('.view-btn');
  const resultsCount = $('#resultsCount');
  const modalOverlay = $('#modalOverlay');
  const modalBody = $('#modalBody');
  const modalClose = $('#modalClose');
  const backToTop = $('#backToTop');
  const siteHeader = $('#siteHeader');
  const navToggle = $('#navToggle');
  const mainNav = $('#mainNav');
  const resetFiltersBtn = $('#resetFilters');

  /* ---------- Utilidades ---------- */
  const fmtNum = (n) => {
    if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'K';
    return String(n);
  };

  const fmtDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return iso; }
  };

  const escapeHtml = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

  const debounce = (fn, ms = 200) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };

  const starsFromRating = (r) => {
    const full = Math.floor(r / 2);
    const half = (r / 2) % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  };

  /* ---------- Generación de tarjeta ---------- */
  function cardHTML(n, index) {
    const statusClass = n.status === 'Completado' ? 'badge-status-completed' : 'badge-status-ongoing';
    const statusText = n.status === 'Completado' ? 'Completado' : 'En curso';
    const adultBadge = n.isAdult ? `<span class="badge badge-adult">+18</span>` : '';
    const ratingBadge = n.rating
      ? `<div class="cover-rating">★ ${n.rating.toFixed(1)}</div>`
      : '';

    const coverContent = n.cover
      ? `<img src="${n.cover}" alt="Portada de ${escapeHtml(n.title)}" loading="lazy"
            onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
         <div class="cover-fallback" style="background:linear-gradient(135deg, ${n.coverColor || '#7c3aed'}, #1c1c2b);display:none;">
           ${escapeHtml(n.title)}
         </div>`
      : `<div class="cover-fallback" style="background:linear-gradient(135deg, ${n.coverColor || '#7c3aed'}, #1c1c2b);">
           ${escapeHtml(n.title)}
         </div>`;

    const synopsisPreview = n.synopsis.length > 110
      ? n.synopsis.slice(0, 110) + '…'
      : n.synopsis;

    return `
      <article class="novel-card" data-id="${n.id}" style="animation-delay:${index * 40}ms">
        <div class="novel-cover">
          <div class="cover-badges">
            <span class="badge badge-pdf">PDF</span>
            <span class="badge ${statusClass}">${statusText}</span>
            ${adultBadge}
          </div>
          ${ratingBadge}
          ${coverContent}
          <div class="cover-overlay">
            <div class="cover-quick-actions">
              <button class="js-synopsis" data-id="${n.id}">Sinopsis</button>
              <button class="js-download" data-id="${n.id}">Descargar</button>
            </div>
          </div>
        </div>
        <div class="novel-info">
          <span class="novel-genre-tag">${escapeHtml(n.genre)}</span>
          <h3 class="novel-title">${escapeHtml(n.title)}</h3>
          <p class="novel-synopsis-preview" style="display:none;">${escapeHtml(synopsisPreview)}</p>
          <div class="novel-meta">
            <span>📖 ${fmtNum(n.chapters)} cap.</span>
            <span class="divider"></span>
            <span>👁 ${fmtNum(n.views || 0)}</span>
          </div>
          <div class="novel-actions">
            <button class="btn btn-ghost js-synopsis" data-id="${n.id}">Sinopsis</button>
            <button class="btn btn-primary js-download" data-id="${n.id}">Descargar</button>
          </div>
        </div>
      </article>
    `;
  }

  /* ---------- Render ---------- */
  function getFiltered() {
    let list = (window.NOVELAS || []).slice();

    // Búsqueda
    if (state.query) {
      const q = state.query.toLowerCase();
      list = list.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.genre.toLowerCase().includes(q) ||
        (n.tags || []).some(t => t.toLowerCase().includes(q)) ||
        n.synopsis.toLowerCase().includes(q)
      );
    }

    // Género
    if (state.genre !== 'all') {
      list = list.filter(n => n.genre === state.genre);
    }

    // Orden
    switch (state.sort) {
      case 'popular': list.sort((a, b) => (b.views || 0) - (a.views || 0)); break;
      case 'az': list.sort((a, b) => a.title.localeCompare(b.title, 'es')); break;
      case 'chapters': list.sort((a, b) => b.chapters - a.chapters); break;
      case 'rating': list.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case 'recent':
      default:
        list.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)); break;
    }
    return list;
  }

  function render() {
    const list = getFiltered();

    if (!list.length) {
      grid.innerHTML = '';
      emptyState.hidden = false;
      resultsCount.innerHTML = 'Sin resultados';
      return;
    }
    emptyState.hidden = true;

    grid.innerHTML = list.map((n, i) => cardHTML(n, i)).join('');

    // Mostrar preview de sinopsis en modo lista
    if (state.view === 'list') {
      grid.classList.add('list-view');
      $$('.novel-synopsis-preview').forEach(p => p.style.display = '-webkit-box');
    } else {
      grid.classList.remove('list-view');
    }

    // Contador de resultados
    const total = (window.NOVELAS || []).length;
    if (state.query || state.genre !== 'all') {
      resultsCount.innerHTML = `Mostrando <span>${list.length}</span> de <span>${total}</span> novelas`;
    } else {
      resultsCount.innerHTML = `Mostrando las <span>${total}</span> novelas disponibles`;
    }
  }

  /* ---------- Modal ---------- */
  function openModal(id) {
    const n = (window.NOVELAS || []).find(x => x.id === id);
    if (!n) return;

    const statusBadge = n.status === 'Completado'
      ? '<span class="badge badge-status-completed">Completado</span>'
      : '<span class="badge badge-status-ongoing">En curso</span>';

    const downloadsHTML = (n.downloads || []).map(d => `
      <div class="download-item">
        <div class="download-item-info">
          <span class="dl-label">${escapeHtml(d.label)}</span>
          <span class="dl-meta">${d.size ? '📄 ' + d.size + ' · ' : ''}PDF</span>
        </div>
        <a class="dl-btn ${d.vip ? 'vip' : ''}" href="${escapeHtml(d.link)}" target="_blank" rel="noopener nofollow">
          ${d.vip ? 'VIP ⬇' : 'Descargar ⬇'}
        </a>
      </div>
    `).join('');

    const tagsHTML = (n.tags || []).map(t =>
      `<span class="modal-tag">${escapeHtml(t)}</span>`
    ).join('');

    const coverContent = n.cover
      ? `<img src="${n.cover}" alt="Portada de ${escapeHtml(n.title)}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
         <div class="cover-fallback" style="background:linear-gradient(135deg, ${n.coverColor || '#7c3aed'}, #1c1c2b);display:none;">
           ${escapeHtml(n.title)}
         </div>`
      : `<div class="cover-fallback" style="background:linear-gradient(135deg, ${n.coverColor || '#7c3aed'}, #1c1c2b);">
           ${escapeHtml(n.title)}
         </div>`;

    modalBody.innerHTML = `
      <div class="modal-cover">
        <div class="cover-badges">
          <span class="badge badge-pdf">PDF</span>
          ${statusBadge}
          ${n.isAdult ? '<span class="badge badge-adult">+18</span>' : ''}
        </div>
        ${coverContent}
      </div>
      <div class="modal-content">
        <span class="modal-genre-tag">${escapeHtml(n.genre)}</span>
        <h2 class="modal-title" id="modalTitle">${escapeHtml(n.title)}</h2>

        <div class="modal-meta-row">
          <div class="meta-item">
            <span class="label">Capítulos</span>
            <span class="value">${fmtNum(n.chapters)}</span>
          </div>
          ${n.volumes ? `
          <div class="meta-item">
            <span class="label">Tomos</span>
            <span class="value">${n.volumes}</span>
          </div>` : ''}
          <div class="meta-item">
            <span class="label">Estado</span>
            <span class="value">${escapeHtml(n.status)}</span>
          </div>
          <div class="meta-item">
            <span class="label">Vistas</span>
            <span class="value">${fmtNum(n.views || 0)}</span>
          </div>
          ${n.rating ? `
          <div class="meta-item">
            <span class="label">Valoración</span>
            <span class="value value-stars">${starsFromRating(n.rating)} ${n.rating.toFixed(1)}/10</span>
          </div>` : ''}
          <div class="meta-item">
            <span class="label">Actualizado</span>
            <span class="value">${fmtDate(n.lastUpdate)}</span>
          </div>
        </div>

        <h3 class="modal-section-title">📖 Sinopsis</h3>
        <p class="modal-synopsis">${escapeHtml(n.synopsis)}</p>

        ${tagsHTML ? `
        <h3 class="modal-section-title">🏷 Etiquetas</h3>
        <div class="modal-tags">${tagsHTML}</div>` : ''}

        <h3 class="modal-section-title">⬇ Descargas disponibles</h3>
        <div class="downloads-grid">${downloadsHTML || '<p style="color:var(--text-3)">No hay descargas disponibles todavía.</p>'}</div>
      </div>
    `;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------- Stats counter ---------- */
  function animateStats() {
    const stats = $$('.stat-num');
    const novels = window.NOVELAS || [];
    const totalChapters = novels.reduce((s, n) => s + (n.chapters || 0), 0);
    const totalDownloads = novels.reduce((s, n) => s + (n.downloads?.length || 0) * 1247, 0);
    const genres = new Set(novels.map(n => n.genre)).size;
    const targets = [novels.length, totalChapters, genres, totalDownloads];

    stats.forEach((el, i) => {
      const target = targets[i] || 0;
      const duration = 1500;
      const start = performance.now();
      const startVal = 0;
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.floor(startVal + (target - startVal) * eased);
        el.textContent = fmtNum(val);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = fmtNum(target);
      };
      requestAnimationFrame(step);
    });
  }

  /* ---------- Eventos ---------- */
  // Búsqueda en tiempo real
  const onSearch = debounce((val) => {
    state.query = val.trim();
    searchClear.hidden = !state.query;
    render();
  }, 180);

  searchInput.addEventListener('input', (e) => onSearch(e.target.value));
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    state.query = '';
    searchClear.hidden = true;
    render();
    searchInput.focus();
  });

  // Filtros por género
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.genre = chip.dataset.genre;
      render();
    });
  });

  // Orden
  sortSelect.addEventListener('change', (e) => {
    state.sort = e.target.value;
    render();
  });

  // Vista
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.view = btn.dataset.view;
      render();
    });
  });

  // Reset filtros
  resetFiltersBtn.addEventListener('click', () => {
    state.query = '';
    state.genre = 'all';
    state.sort = 'recent';
    searchInput.value = '';
    searchClear.hidden = true;
    sortSelect.value = 'recent';
    chips.forEach(c => c.classList.toggle('active', c.dataset.genre === 'all'));
    render();
  });

  // Delegación: click en botones de tarjeta
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-id]');
    if (!btn) return;
    openModal(btn.dataset.id);
  });

  // Modal cerrar
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });

  // Header scroll
  const onScroll = () => {
    if (window.scrollY > 30) siteHeader.classList.add('scrolled');
    else siteHeader.classList.remove('scrolled');

    if (window.scrollY > 600) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Mobile nav
  navToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  // Cerrar nav al hacer click en un enlace (con soporte para filtros)
  mainNav.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-filter]');
    if (a) {
      const genre = a.dataset.filter;
      chips.forEach(c => c.classList.toggle('active', c.dataset.genre === genre));
      state.genre = genre;
      render();
    }
    if (window.innerWidth <= 768) {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Footer filter links
  $$('.footer-col a[data-filter]').forEach(a => {
    a.addEventListener('click', () => {
      const genre = a.dataset.filter;
      chips.forEach(c => c.classList.toggle('active', c.dataset.genre === genre));
      state.genre = genre;
      render();
    });
  });

  // Año en footer
  $('#year').textContent = new Date().getFullYear();

  // Soporte para ?q= en la URL (SEO SearchAction)
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  if (q) {
    searchInput.value = q;
    state.query = q;
    searchClear.hidden = false;
  }

  /* ---------- Init ---------- */
  render();
  // Animar stats cuando entren en viewport
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateStats();
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe($('#heroStats'));
  } else {
    animateStats();
  }
})();
