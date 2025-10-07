// Tombol "Bagikan Sumber"
async function shareSelf() {
  try {
    const html = await fetch(location.href).then(r => r.text());
    const file = new File([html], document.title + ".html", { type: "text/plain" });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: document.title,
        text: "Bagikan sumber halaman ini",
        files: [file],
      });
    } else {
      alert("Fitur berbagi file tidak didukung di browser ini.");
    }
  } catch (err) {
    console.error("Gagal membagikan:", err);
    alert("Terjadi kesalahan saat membagikan sumber.");
  }
}

document.getElementById("share").onclick = shareSelf;

// Registrasi Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker terdaftar."))
    .catch(err => console.error("Gagal daftar Service Worker:", err));
}
