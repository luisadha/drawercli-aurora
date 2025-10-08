async function include(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Gagal memuat ${path}`);
    el.innerHTML = await res.text();
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
