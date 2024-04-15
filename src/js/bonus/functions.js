// na hora de renderizar 
import dataMocked from "./mock.js"
function FabricaDeFuncoes ({
  inputPesquisar,
  renderizarProdutos, 
  renderizarCarrinho,
  renderizarEcoCoins //elemento html que se trata da div que contem os produtos alocados
}) {

  async function getProdutos() {
    //simulacao de fetch na api para obter os produtos
    //const resposta = await fetch("http://localhost:8000/produtos/lista")
    //const data = resposta.json()

    return dataMocked;

  }

  function renderizarSecaoProdutos({vetorDeProdutos}) {
    
    let divsParaRenderizar = []
    //metodo foreach para renderizar os dados no frontend
    vetorDeProdutos.foreach(element => {
      const conteudoDiv = `
        <div class="bg-transparent max-w-96 w-fit rounded-lg flex flex-col gap-1 hover:bg-zinc-800 transition duration-200 ">
          <div class="overflow-hidden">
            <img 
            class="group-hover:scale-110 transition duration-300 w-96 h-96 rounded-t-lg "
            src="${element.caminho_imagem}" 
            >
          </div>
          
          <div class="p-2 text-zinc-100 flex flex-col gap-2">
            <h2 class="text-4xl">${element.nome}</h2>
            <p class="text-2xl">${element.descricao}</p>
            <span  class="text-2xl"><img src="../../../assets/coin.svg" ${element.preco}</span>
            <button class="botao-adicionar flex items-center justify-between rounded-md p-4 transition duration-150 bg-green-600 text-zinc-100 font-bold text-2xl hover:bg-green-700">
              Adicionar <img src="../../../assets/cart-add.svg" alt="">
            </button>
          </div>
        </div>
        `
        const elementoHTML = document.createElement("div");
        elementoHTML.className("group");
        elementoHTML.innerHTML(conteudoDiv);
      renderizarProdutos.appendChild(elementoHTML)

    })
    
  }
  async function manipularEnvioFormularioBusca(event) {
    event.preventDefault()
    console.log(inputPesquisar.value)
    await new Promise(resolver => setTimeout(resolver, 3000))
  }

  return {
    manipularEnvioFormularioBusca,
    renderizarSecaoProdutos,
    getProdutos,
  }
}

export default FabricaDeFuncoes