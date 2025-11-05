document.querySelectorAll('.toggle-btn').forEach(header => {
    const btn = header.querySelector('button');
    const panel = document.querySelector(header.dataset.target);

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      btn.textContent = expanded ? '▸' : '▾';
      if (expanded) {
        panel.style.height = panel.scrollHeight + 'px';
        requestAnimationFrame(()=> panel.style.height = '0');
      } else {
        panel.style.height = panel.scrollHeight + 'px';
        panel.addEventListener('transitionend', function te(){
          panel.style.height = 'auto';
          panel.removeEventListener('transitionend', te);
        });
      }
    });
  });
