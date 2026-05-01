// ============================================
// Tabs
// ============================================
(function() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('tab-btn-active'));
      tabPanels.forEach(p => p.classList.remove('tab-panel-active'));
      btn.classList.add('tab-btn-active');
      const panel = document.querySelector(`.tab-panel[data-tab="${tab}"]`);
      if (panel) panel.classList.add('tab-panel-active');
    });
  });
})();

// ============================================
// Sidebar Active Link Highlighting
// ============================================
(function() {
  const sections = document.querySelectorAll('.section[id], .subsection[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar-link, .sidebar-sublink');

  if (!('IntersectionObserver' in window) || sections.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${id}`) {
            link.style.background = 'var(--bg-soft)';
            link.style.color = 'var(--text)';
          } else {
            link.style.background = '';
            link.style.color = '';
          }
        });
      }
    });
  }, {
    rootMargin: '-100px 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
})();

// ============================================
// Smooth scroll offset for sticky topbar
// ============================================
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const topbarHeight = 60;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - topbarHeight - 16;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
      history.pushState(null, '', `#${targetId}`);
    });
  });
})();
