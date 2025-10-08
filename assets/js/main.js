async function includeHTML(id, file, appendToHead = false) {
  const el = document.getElementById(id);
  const response = await fetch(file);
  const html = await response.text();

  if (appendToHead) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    // ambil semua elemen di dalam brain.html dan append satu-satu
    Array.from(template.content.children).forEach(node => {
      document.head.appendChild(node.cloneNode(true));
    });
  } else {
    el.innerHTML = html;
  }
}

// jalankan include
includeHTML("brain", "/section/brain.html", true);
includeHTML("header", "/section/header.html");
includeHTML("postscript", "/section/postscript.html");
includeHTML("footer", "/section/footer.html");
