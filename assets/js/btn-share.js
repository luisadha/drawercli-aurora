async function share() {
  const content = document.documentElement.outerHTML;
  const blob = new Blob(["#" + content.replace("<html", "#<html").replace("</body></html>", "#</body></html>")], { type: "text/plain" });
  const file = new File([blob], "drawercli-aurora-source.txt", { type: "text/plain" });

  if (navigator.share) {
    try {
      // Coba berbagi file
      await navigator.share({
        title: document.title,
        files: [file],
      });
    } catch (err1) {
      if (err1.name === "AbortError") return; // user membatalkan share, abaikan saja
      try {
        // Fallback: berbagi URL
        await navigator.share({
          title: document.title,
          url: "https://luisadha.github.io/drawercli-aurora/",
        });
      } catch (err2) {
        if (err2.name === "AbortError") return; // user batal lagi, juga abaikan
        alert("Fitur berbagi tidak didukung di browser ini.");
      }
    }
  } else {
    alert("Fitur berbagi tidak didukung di browser ini.");
  }
}
