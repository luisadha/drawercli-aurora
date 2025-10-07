async function share() {
  const content = document.documentElement.outerHTML;
  const blob = new Blob([content], { type: 'text/plain' });
  const file = new File([blob], 'drawercli-source.txt', { type: 'text/plain' });

  if (navigator.share) {
    try {
      // 1️⃣ Coba berbagi URL dulu
      await navigator.share({
        title: document.title,
        url: 'https://luisadha.github.io/drawercli-aurora/'
      });
    } catch (err1) {
      try {
        // 2️⃣ Jika gagal, coba berbagi file
        await navigator.share({
          title: document.title,
          files: [file],
        });
      } catch (err2) {
        // 3️⃣ Jika keduanya gagal
        alert("Fitur berbagi tidak berfungsi di browser ini.");
      }
    }
  } else {
    alert("Fitur berbagi tidak didukung di browser ini.");
  }
}
