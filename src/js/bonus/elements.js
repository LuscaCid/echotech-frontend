function ElementosHtmlFactory () {
  const renderizarProdutos = document.getElementById("renderizador-produtos");
  const renderizarCarrinho = document.getElementById("renderizador-carrinho");
  const renderizarEcoCoins = document.getElementById("ecocoins")

  const inputPesquisar = document.getElementById("pesquisar")
  const botaoPesquisar = document.getElementById("botao-pesquisar")

  const botaoComprar = document.getElementById("botao-comprar");
  
  const formularioBuscaProdutos = document.getElementById("formulario-busca-produto");

  return {

    formularioBuscaProdutos,
    renderizarProdutos,
    renderizarCarrinho,
    renderizarEcoCoins,
    inputPesquisar,
    botaoComprar
  }
}

export default ElementosHtmlFactory 