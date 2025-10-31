export function initFormValidation() {
  // Tenta ativar imediatamente (caso o formulário já exista no DOM)
  if (!attachValidation()) {
    // Caso ainda não exista (por causa do carregamento via SPA), tenta de novo a cada 100ms
    const interval = setInterval(() => {
      if (attachValidation()) {
        clearInterval(interval); // para o loop quando o formulário for encontrado
      }
    }, 100);
  }
}

function attachValidation() {
  const form = document.getElementById("cadastroForm");
  if (!form) return false; // o formulário ainda não está no DOM

  console.log("✅ Formulário encontrado e validação ativada!");

  // Remove qualquer listener anterior, evitando duplicidade
  form.removeEventListener("submit", handleSubmit);
  form.addEventListener("submit", handleSubmit);

  return true; // indica que o formulário foi encontrado
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  let errors = [];

  const nome = form.nome?.value.trim();
  const email = form.email?.value.trim();
  const telefone = form.telefone?.value.trim();
  const cpf = form.cpf?.value.trim();
  const nascimento = form.nascimento?.value;
  const cep = form.cep?.value.trim();
  const endereco = form.endereco?.value.trim();
  const sexo = form.sexo?.value.trim();
  const aceito = form.aceito?.checked;

  if (!nome || nome.length < 2) errors.push("O nome deve ter pelo menos 2 caracteres.");
  if (!email || !email.includes("@")) errors.push("E-mail inválido!");
  if (telefone && !telefone.match(/^\(\d{2}\)\s?\d{5}-\d{4}$/)) errors.push("Telefone inválido.");
  if (cpf && !cpf.match(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)) errors.push("CPF inválido.");
  if (cep && !cep.match(/^\d{5}-\d{3}$/)) errors.push("CEP inválido.");
  if (!endereco || endereco.length < 5) errors.push("Informe um endereço com logradouro e número.");
  if (!sexo) errors.push("Selecione ou digite uma opção de sexo.");
  if (!nascimento) errors.push("Informe sua data de nascimento.");
  if (!aceito) errors.push("É preciso aceitar os termos.");

  if (errors.length > 0) {
    alert("Há erros de preenchimento no formulário:\n\n" + errors.join("\n"));
    return;
  }

  alert("Cadastro realizado com sucesso! Obrigado! ❤");
  form.reset();
}
