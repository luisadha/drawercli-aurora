async function includeHTML(id, file, appendToHead = false) {
  try {
    const base = `/${location.pathname.split('/')[1]}`;
    const el = document.getElementById(id);
    const response = await fetch(`${base}/section/${file}`);
    if (!response.ok) throw new Error(`Gagal memuat ${file}: ${response.status}`);

    const html = await response.text();

    if (appendToHead) {
      const template = document.createElement("template");
      template.innerHTML = html.trim();
      Array.from(template.content.children).forEach(node => {
        document.head.appendChild(node.cloneNode(true));
      });
    } else if (el) {
      // masukkan teks apa adanya tanpa parsing
      const pre = document.createTextNode(html);
      el.appendChild(pre);
    }
  } catch (err) {
    console.error(err);
  }
}

includeHTML("brain", "brain.html", true);
includeHTML("header", "header.html");
includeHTML("postscript", "postscript.html");
includeHTML("footer", "footer.html");
