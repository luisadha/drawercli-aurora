function toggleInfo(el) { 
  const info = el.parentElement.nextElementSibling; 
  info.style.display = info.style.display === "none" ? "block" : "none";
}
