import { initThemeToggle } from "./themeToggle.js";
initThemeToggle();
import { loadPage } from "./router.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPage("index.html");

  
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const url = link.getAttribute("href");
      loadPage(url);
      window.history.pushState({}, "", url);
    });
  });

  window.addEventListener("popstate", () => {
    loadPage(window.location.pathname.split("/").pop());
  });
});
