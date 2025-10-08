async function include(id, path) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Gagal memuat ${path}`);

    const text = await res.text();

    // Kalau targetnya head (brain)
    if (id === "brain") {
      const temp = document.createElement("template");
      temp.innerHTML = text;

      // Tambahkan semua child ke head dengan cara yang benar
      Array.from(temp.content.children).forEach(node => {
        if (node.tagName === "LINK" || node.tagName === "META" || node.tagName === "TITLE") {
          document.head.appendChild(node);
        } else if (node.tagName === "SCRIPT") {
          const s = document.createElement("script");
          if (node.src) s.src = node.src;
          if (node.innerText) s.innerText = node.innerText;
          document.head.appendChild(s);
        }
      });
    } else {
      el.innerHTML = text;
    }
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  include("brain", "section/brain.html");
  include("header", "section/header.html");
  include("postscript", "section/postscript.html");
  include("footer", "section/footer.html");
});
