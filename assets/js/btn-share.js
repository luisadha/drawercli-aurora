
async function share() {
  const content = document.documentElement.outerHTML;
  const blob = new Blob([content], { type: 'text/plain' });
  const file = new File([blob], 'drawercli-source.sh', { type: 'text/plain' });

  if (navigator.share) {
    try {
      // Coba berbagi file
      await navigator.share({
        title: document.title,
        files: [file],
      });
    } catch (err1) {
      try {
        // Jika gagal (misalnya browser tidak mendukung share file), fallback ke share URL
        await navigator.share({
          title: document.title,
          url: 'https://luisadha.github.io/drawercli-aurora/'
        });
      } catch (err2) {
        // Jika keduanya gagal
        alert();
      }
    }
  } else {
    alert("Fitur berbagi tidak didukung di browser ini.");
  }
}
