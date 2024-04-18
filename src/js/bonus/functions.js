// na hora de renderizar 
import {constantes, getChaveAcesso} from "../../service/config.js"
function FabricaDeFuncoes ({
  botaoComprar,
  inputPesquisar,
  renderizarProdutos, 
  renderizarCarrinho : secaoRenderizarCarrinho,
  totalEcosDisplayCarrinho,
  renderizarEcoCoins //elemento html que se trata da div que contem os produtos alocados
}) {

  async function getProdutos() {
    //simulacao de fetch na api para obter os produtos
    const resposta = await fetch(`${constantes.baseURL}produtos/lista`, {
      headers : {
        Authorization : "Bearer " + getChaveAcesso()
      }
    })
    const data = await resposta.json()
    console.log(data)
    return data.lista;

  }

  function renderizarSecaoProdutos(vetorDeProdutos) {
  
    //metodo foreach para renderizar os dados no frontend
    for(const produto of vetorDeProdutos) {
      const elementoHTML = document.createElement("div");
      elementoHTML.className ="group";
      
      const conteudoDiv = `
      <div class="bg-transparent  h-[400px] max-w-96 w-fit rounded-lg flex flex-col gap-1 hover:bg-zinc-800 transition duration-200 ">
      <div class="overflow-hidden">
      <img 
      class="group-hover:scale-110 min-h[360px] transition duration-300 w-96 h-96 rounded-t-lg "
      src="${produto.nm_imagem}" 
      >
      </div>
      
      <div id="${produto.id_produto}" class="p-2 text-zinc-100 flex flex-col gap-2">
      <h2 class="text-4xl">${produto.nm_produto}</h2>
      <p class="text-2xl">${produto.ds_produto}</p>
      <span  class="text-2xl flex items-center ">
      <img src="../../../assets/coin.svg"> <p class=" text-3xl text-green-400"> ${produto.vl_eco} ecos</p>
      </span>
      <button" class="disabled:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-10 botao-carrinho flex items-center justify-between rounded-md p-4 transition duration-150 bg-green-600 text-zinc-100 font-bold text-2xl hover:bg-green-700">
      Adicionar <img src="../../../assets/cart-add.svg" alt="">
      </button>
      </div>
      </div>
      `
      elementoHTML.innerHTML= conteudoDiv;
      renderizarProdutos.appendChild(elementoHTML)
    
  }
  //apos renderizar os elementos, pego os botoes e aciono eventos para cada um
  const botoesRenderizados = document.getElementsByClassName("botao-carrinho")
  
  for(const botao of botoesRenderizados) {
    botao.addEventListener("click", () => {
      const elementoPai = botao.parentElement;

      const elementoPesquisado = vetorDeProdutos.find(produto => produto.id_produto == elementoPai.id)
      const produtoSelecionadoPropriedades = {
        nome_produto : elementoPesquisado.nm_produto,
        preco_produto : elementoPesquisado.vl_eco,
        id_produto : elementoPesquisado.id_produto
      }
      if(verificarPresencaCarrinho(produtoSelecionadoPropriedades)){
        return window.alert("Não é possivel adicionar o mesmo produto ao carrinho")
      } 
      adicionarAoLocalStorage(produtoSelecionadoPropriedades)
      renderizarCarrinhoAdicionando(produtoSelecionadoPropriedades)
    })
  }

  }

  function adicionarAoLocalStorage(produtoSelecionadoPropriedades) {
    //dados para array, pois oq sera inserido é um array

    const getProdutosDoLocalstorage = localStorage.getItem("@ecotech-carrinho")
    let arrayParaInsercaoLocalStorage; // isto vai ser retornado para ser renderizado
    if(!getProdutosDoLocalstorage)
    {
      arrayParaInsercaoLocalStorage = [produtoSelecionadoPropriedades]
      let jsonStrinfied = JSON.stringify(arrayParaInsercaoLocalStorage)
      localStorage.setItem("@ecotech-carrinho", jsonStrinfied)
    } else {
      arrayParaInsercaoLocalStorage = JSON.parse(getProdutosDoLocalstorage)
      arrayParaInsercaoLocalStorage.push(produtoSelecionadoPropriedades)

      localStorage.setItem("@ecotech-carrinho", JSON.stringify(arrayParaInsercaoLocalStorage))
    }
    return arrayParaInsercaoLocalStorage;
  }
  function renderizarCarrinhoAdicionando (produtoCarrinho) {
    const conteudoDiv = `
        <td class=" py-4 px-8 w-full first:rounded-l-md last:rounded-r-md ">${produtoCarrinho.nome_produto}</td>
        <td class=" py-4 px-8 w-full first:rounded-l-md last:rounded-r-md">$${produtoCarrinho.preco_produto}</td>
        <td class="py-4 px-8 w-full first:rounded-l-md last:rounded-r-md">
          <button id="${produtoCarrinho.id_produto}" class="botao-apagar bg-zinc-500 p-1 rounded-md text-red-500 hover:bg-zinc-600 transition duration-200">
            X
          </button>
        </td>
      `;
      const elementoHTML = document.createElement("tr");
      elementoHTML.className = "w-full border-collapse odd:bg-zinc-700 even:bg-zinc-800";
      elementoHTML.innerHTML = conteudoDiv
      secaoRenderizarCarrinho.append(elementoHTML);
      atualizarRenderizadorDeValor()
      const botoesRenderizados = document.getElementsByClassName("botao-apagar")
  
    for(const botao of botoesRenderizados) {
      botao.addEventListener("click", () => {
        //deletando da lista
        const idExcluido = botao.id;  
        const td = botao.parentNode
        const tr = td.parentNode
        tr.remove()

        //deletando do localhost

        const getProdutosDoLocalstorage = localStorage.getItem("@ecotech-carrinho")
        const arrayParsed = JSON.parse(getProdutosDoLocalstorage)

        const arrayFiltrado = arrayParsed.filter(element => element.id_produto != idExcluido)
        localStorage.setItem("@ecotech-carrinho", JSON.stringify(arrayFiltrado))
        atualizarRenderizadorDeValor()
      })
    }
    const ecoCoinsDisplay = reducaoValorProdutos()
    totalEcosDisplayCarrinho.innerText = ecoCoinsDisplay
    
  }
  function renderizarCarrinhoLocalstorage(arrayParaRenderizar) {
    
    for(const produtoCarrinho of arrayParaRenderizar) {
      const conteudoDiv = `
        <td class=" py-4 px-8 w-full first:rounded-l-md last:rounded-r-md ">${produtoCarrinho.nome_produto}</td>
        <td class=" py-4 px-8 w-full first:rounded-l-md last:rounded-r-md">$${produtoCarrinho.preco_produto}</td>
        <td class="py-4 px-8 w-full first:rounded-l-md last:rounded-r-md">
          <button id="${produtoCarrinho.id_produto}"  class="botao-apagar bg-zinc-500 p-1 rounded-md text-red-500 hover:bg-zinc-600 transition duration-200">
            X
          </button>
        </td>
      `;
      const elementoHTML = document.createElement("tr");
      elementoHTML.className = "w-full border-collapse odd:bg-zinc-700 even:bg-zinc-800";
      elementoHTML.innerHTML = conteudoDiv


      secaoRenderizarCarrinho.append(elementoHTML);
    }
    atualizarRenderizadorDeValor()
    const botoesRenderizados = document.getElementsByClassName("botao-apagar")
  
    for(const botao of botoesRenderizados) {
      botao.addEventListener("click", () => {
        //deletando da lista
        const idExcluido = botao.id;  
        const td = botao.parentNode
        const tr = td.parentNode
        tr.remove()

        //deletando do localhost

        const getProdutosDoLocalstorage = localStorage.getItem("@ecotech-carrinho")
        const arrayParsed = JSON.parse(getProdutosDoLocalstorage)

        const arrayFiltrado = arrayParsed.filter(element => element.id_produto != idExcluido)
        localStorage.setItem("@ecotech-carrinho", JSON.stringify(arrayFiltrado))

        atualizarRenderizadorDeValor()
      })
     
    }
    atualizarRenderizadorDeValor()
  }

  function atualizarRenderizadorDeValor() {
    const displayTotalCarrinho = reducaoValorProdutos()
    if(Number(renderizarEcoCoins.textContent) < displayTotalCarrinho){
      console.log("true ")
      totalEcosDisplayCarrinho.classList.add("text-red-500")
      totalEcosDisplayCarrinho.classList.remove("text-zinc-200")
      botaoComprar.setAttribute("disabled", "")
    } 
    
    totalEcosDisplayCarrinho.innerText = displayTotalCarrinho ?? 0 + " ecos"
  }

  function reducaoValorProdutos() {
    //como a remocao e a adicao de novos produtos atualizam o localstorage, eu vou apenas me basear por la

    const dadosLocastorage = localStorage.getItem("@ecotech-carrinho")
    const parsedArray = JSON.parse(dadosLocastorage)

    if(parsedArray.length > 0) {
      let total = 0;
      for(let i = 0; i < parsedArray.length; i++){
        let valorPorElemento = Number(parsedArray[i].preco_produto) ;
        total += valorPorElemento ;
      }
      console.log(total)
      return total;
    }
  }

  function verificarPresencaCarrinho (produtoSelecionadoPropriedades) {
    
    const getProdutosDoLocalstorage = localStorage.getItem("@ecotech-carrinho")
    const arrayParsed = JSON.parse(getProdutosDoLocalstorage)
    
    if(getProdutosDoLocalstorage) {
      const estaDentro = arrayParsed.find(produto => produto.id_produto == produtoSelecionadoPropriedades.id_produto) 
      return estaDentro;    
    }
  }
  async function manipularEnvioFormularioBusca(event) {
    event.preventDefault()
    
    await new Promise(resolver => setTimeout(resolver, 3000))
  }

  async function finalizarCompra(arrayDoCarrinho) {
    const formData = new FormData()
    const novoArrayApenasDeId = arrayDoCarrinho.map(element => element.id_produto)

    formData.append("lista_produtos", JSON.stringify({lista : novoArrayApenasDeId}))

    const response = await fetch(`${constantes.baseURL}produtos/comprar`, {
      method : "POST",
      body : formData,
      headers : {
        Authorization : "Bearer " + getChaveAcesso()
      }
    })
    const respostaFormatada = await response.json()

    renderizarEcoCoins.textContent = respostaFormatada.saldo
    const storage = JSON.parse(localStorage.getItem("@ecotech-dados"))
    storage.qt_ecosaldo = respostaFormatada.saldo
    localStorage.setItem("@ecotech-dados", JSON.stringify(storage))
    
    window.alert(respostaFormatada.codigo);
  }

  return {
    atualizarRenderizadorDeValor,
    renderizarCarrinhoLocalstorage,
    manipularEnvioFormularioBusca,
    renderizarSecaoProdutos,
    finalizarCompra,
    getProdutos,
  }
}

export default FabricaDeFuncoes