//inicialmente eu vou precisar ter dados mockados para a geracao automatica pelo lado do javascript no html
import FabricaDeFuncoes from "./functions.js";
import ElementosHtmlFactory from "./elements.js";

const {
  inputPesquisar,
  formularioBuscaProdutos,
  botaoComprar,
  renderizarCarrinho,
  renderizarEcoCoins,
  renderizarProdutos
} = ElementosHtmlFactory()


let contextoProdutos = [] // este contexto contera os produtos a serem renderizados,
/**
 * [{
 *    nome : string
 *    descricao : string
 *    preco : number
 *    caminho_imagem : string
 * },]
 * 
 */
let dadosEmJson = localStorage.getItem("@ecotech-carrinho") || null;
let produtosCarrinho = JSON.parse(dadosEmJson);

const {
  getProdutos,
  renderizarSecaoProdutos,
  manipularEnvioFormularioBusca,
  renderizarCarrinhoLocalstorage
  } = FabricaDeFuncoes({
  inputPesquisar,
  renderizarProdutos, 
  renderizarCarrinho,
  renderizarEcoCoins
})

document.addEventListener("DOMContentLoaded", async () => {
  
    contextoProdutos = await getProdutos();
   
    renderizarSecaoProdutos(contextoProdutos)
    const dataStorage = localStorage.getItem("@ecotech-carrinho")
    const parsed = JSON.parse(dataStorage)
    if(dataStorage) 
    {
      renderizarCarrinhoLocalstorage(parsed)
    }
  
  
  //contem um array retornado do backend com os produtos cadastrados pelos funcionarios
})

//preciso observar campo de pesquisa, caso vazio, entao nao se pode apertar o botao de pesquisar

//o envio deste formulario mudará o valor
formularioBuscaProdutos.addEventListener("submit", manipularEnvioFormularioBusca)

//para renderizar os produtos inicialmente, precisa-se busca-los no backend, entao primeiramente se chama a funcao getprodutos
