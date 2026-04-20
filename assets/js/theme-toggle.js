const btn = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Cek jika ada tema yang tersimpan di LocalStorage
if (currentTheme == "dark") {
  document.body.setAttribute("data-theme", "dark");
}

btn.addEventListener("click", function() {
  let theme = document.body.getAttribute("data-theme");
  
  if (theme === "dark") {
    document.body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});
