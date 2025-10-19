
  document.addEventListener("DOMContentLoaded", () => {
    CopyButton.init({
      selector: 'pre code', // Elemen mana yang dikasih tombol copy
      tooltipText: 'Copied!', // (opsional)
      buttonText: 'Copy'      // (opsional)
    });
  });
