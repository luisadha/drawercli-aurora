async function includeHTML(id, file, appendToHead = false) {
  try {
    // deteksi base path GitHub Pages (contoh: /drawercli-aurora/)
    const base = `/${location.pathname.split('/')[1]}`;

    // gabungkan path dengan file target
    const el = document.getElementById(id);
    const response = await fetch(`${base}/section/${file}`);
    if (!response.ok) throw new Error(`Gagal memuat ${file}: ${response.status}`);
    
    const html = await response.text();

    if (appendToHead) {
      const template = document.createElement('template');
      template.innerHTML = html.trim();

      // masukkan elemen dari brain.html ke <head>
      Array.from(template.content.children).forEach(node => {
        document.head.appendChild(node.cloneNode(true));
      });
    } else if (el) {
      el.innerHTML = html;
    }
  } catch (err) {
    console.error(err);
  }
}

// jalankan include (otomatis prefix path repo)
includeHTML("brain", "brain.html", true);
includeHTML("header", "header.html");
includeHTML("postscript", "postscript.html");
includeHTML("footer", "footer.html");
