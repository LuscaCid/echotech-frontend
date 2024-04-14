function ElementosPaginaSignUp() {
  
  //credenciais
  const usuario = document.getElementById("usuario");
  const senha = document.getElementById("senha");
  
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
    usuario,
    senha,
    estado,
    cidade,
    bairro,
    numero,
    rua,
    cep,
  }
}

export {ElementosPaginaSignUp}