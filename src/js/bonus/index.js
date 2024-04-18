//inicialmente eu vou precisar ter dados mockados para a geracao automatica pelo lado do javascript no html
import FabricaDeFuncoes from "./functions.js";
import ElementosHtmlFactory from "./elements.js";

const {
  totalEcosDisplayCarrinho,
  inputPesquisar,
  formularioBuscaProdutos,
  botaoComprar,
  renderizarCarrinho,
  renderizarEcoCoins,
  renderizarProdutos,
  
} = ElementosHtmlFactory()


/**
 * [{
 *    nome : string
 *    descricao : string
 *    preco : number
 *    caminho_imagem : string
 * },]
 * 
*/
const dadosEmJson = localStorage.getItem("@ecotech-carrinho") || null;
const produtosCarrinho = JSON.parse(dadosEmJson);

const {
  getProdutos,
  renderizarSecaoProdutos,
  manipularEnvioFormularioBusca,
  renderizarCarrinhoLocalstorage
} = FabricaDeFuncoes({
  totalEcosDisplayCarrinho,
  inputPesquisar,
  renderizarProdutos, 
  renderizarCarrinho,
  renderizarEcoCoins,
  botaoComprar
})

document.addEventListener("DOMContentLoaded", async () => {
  
   // este contexto contera os produtos a serem renderizados,
    const contextoProdutos = await getProdutos();
   
    renderizarSecaoProdutos(contextoProdutos)
    const dataStorage = localStorage.getItem("@ecotech-carrinho")
    const parsed = JSON.parse(dataStorage)
    if(dataStorage) 
    {
      renderizarCarrinhoLocalstorage(parsed)
    }
    
    const dadosUsuarioLogado  =JSON.parse(localStorage.getItem("@ecotech-dados"))
    const {qt_ecosaldo} = dadosUsuarioLogado  
    renderizarEcoCoins.textContent = qt_ecosaldo;
  //contem um array retornado do backend com os produtos cadastrados pelos funcionarios
})

//preciso observar campo de pesquisa, caso vazio, entao nao se pode apertar o botao de pesquisar

//o envio deste formulario mudará o valor
formularioBuscaProdutos.addEventListener("submit", manipularEnvioFormularioBusca)

//para renderizar os produtos inicialmente, precisa-se busca-los no backend, entao primeiramente se chama a funcao getprodutos
