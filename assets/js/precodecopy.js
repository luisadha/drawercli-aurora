document.querySelectorAll('pre > code').forEach(el => {
  const btn = document.createElement('span');
  btn.className = 'copy-button';
  btn.onclick = () => navigator.clipboard.writeText(el.innerText);
  el.parentNode.append(btn);
});
