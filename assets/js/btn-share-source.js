async function shareSource() {
  const content = document.documentElement.outerHTML;
  const blob = new Blob([content], { type: 'text/plain' });
  const file = new File([blob], 'source.txt', { type: 'text/plain' });

  if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({
        title: document.title,
        text: 'Berbagi sumber halaman ini:',
        files: [file]
      });
    } catch (err) {
      alert("Gagal membagikan file: " + err.message);
    }
  } else {
    alert("Browser ini tidak mendukung fitur berbagi file.");
  }
}
