import { loadPage } from "../js/router.js";

document.addEventListener("DOMContentLoaded", () => {
  loadPage("index.html"); // carrega a página inicial

  // Faz com que os links da navbar funcionem sem recarregar a página
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const url = link.getAttribute("href");
      loadPage(url);
      window.history.pushState({}, "", url);
    });
  });

  // Permite voltar/avançar pelo histórico
  window.addEventListener("popstate", () => {
    loadPage(window.location.pathname.split("/").pop());
  });
});
