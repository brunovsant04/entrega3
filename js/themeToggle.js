console.log("themeToggle.js carregado");

// Função para ativar o modo escuro acessível
export function initThemeToggle() {
  const btn = document.getElementById("toggleTheme");
  if (!btn) return;

  // Carrega o tema salvo (modo claro ou escuro)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  // Alternar ao clicar
  btn.addEventListener("click", toggleTheme);

  // Atalho de teclado: Alt + D
  document.addEventListener("keydown", e => {
    if (e.altKey && e.key.toLowerCase() === "d") {
      toggleTheme();
    }
  });

  function toggleTheme() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }
}