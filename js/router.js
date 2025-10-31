
export async function loadPage(page) {
  const main = document.querySelector("main.container");

  try {
    console.log("Carregando:", page);

    const response = await fetch(page);
    const text = await response.text();

  
    const match = text.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (!match) {
      main.innerHTML = "<p>Erro: página sem tag <main>.</p>";
      return;
    }

    const content = match[1];
    main.innerHTML = content;
    console.log("Conteúdo carregado com sucesso");

    
    if (page.includes("cadastro.html")) {
      console.log("Carregando formValidation.js...");
      import("../css/formValidation.js")
        .then(module => {
          module.initFormValidation();
          console.log("Validação de formulário ativada");
        })
        .catch(err => console.error("Erro ao carregar formValidation.js", err));
    }

  } catch (err) {
    console.error("Erro ao carregar página:", err);
    main.innerHTML = "<p>Erro ao carregar página.</p>";
  }
}
