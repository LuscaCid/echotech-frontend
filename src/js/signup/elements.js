function ElementosPaginaSignUp() {
  
  //credenciais
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");
  const nome = document.getElementById("nome")
  
  // elementos de endereço
  const estado = document.getElementById("estado");
  const cidade = document.getElementById("cidade");
  const bairro = document.getElementById("bairro");
  const rua = document.getElementById("rua");
  const cep = document.getElementById("cep");
  const numero = document.getElementById("numero");
  // elementos do html como divs ou botoes para manipulacao
  const formulario = document.getElementById("form-registro");
  const botaoAdicionarEndereco = document.getElementById("adicionar-endereco")
  const listaEnderecos = document.getElementById("lista-enderecos")
  const secaoEnderecos = document.querySelector(".secao-enderecos")
  let btnDeleteArr = document.querySelectorAll(".botao-excluir")
  
  return {
    btnDeleteArr,
    botaoAdicionarEndereco,
    secaoEnderecos,
    listaEnderecos,
    formulario,
    email,
    senha,
    estado,
    cidade,
    bairro,
    numero,
    nome,
    rua,
    cep,
  }
}

export {ElementosPaginaSignUp}