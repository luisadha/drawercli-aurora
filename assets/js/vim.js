const editor = document.getElementById("editor");
const status = document.getElementById("status");
const copyBtn = document.getElementById("copyBtn");

let mode = "insert";

/* copy button */
copyBtn.addEventListener("click", () => {
  const text = editor.textContent;
  navigator.clipboard.writeText(text);
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = "Copy", 1000);
});

/* vim-like mode */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    mode = "normal";
    status.textContent = "-- NORMAL --";
  }

  if (mode === "normal" && e.key === "i") {
    mode = "insert";
    status.textContent = "-- INSERT --";
  }

  if (mode === "normal") {
    e.preventDefault();
  }
});
