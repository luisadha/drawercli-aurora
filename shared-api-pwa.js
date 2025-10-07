// shared-api-pwa.js
(async () => {
  // Cek apakah halaman dijalankan sebagai PWA (standalone mode)
  const isPWA =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true;

  if (!isPWA) return; // keluar jika bukan mode PWA

  // Buat tombol "Share kode ini" kalau belum ada
  let btn = document.getElementById("share");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "share";
    btn.textContent = "Share kode ini";
    btn.style.position = "fixed";
    btn.style.bottom = "1rem";
    btn.style.right = "1rem";
    btn.style.padding = "0.6rem 1rem";
    btn.style.borderRadius = "8px";
    btn.style.background = "#007aff";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    document.body.appendChild(btn);
  }

  btn.addEventListener("click", async () => {
    try {
      // Ambil isi sumber halaman ini
      const response = await fetch(location.href);
      const source = await response.text();

      // Bungkus jadi file teks
      const blob = new Blob([source], { type: "text/plain" });
      const file = new File([blob], "source.txt", { type: "text/plain" });

      // Share jika API tersedia
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Source File",
          text: "Berikut sumber kodenya",
          files: [file],
        });
      } else {
        // Fallback: buat tautan unduhan
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "source.txt";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      alert("Gagal membagikan kode: " + e);
    }
  });
})();
