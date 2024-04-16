// na hora de renderizar 
import dataMocked from "./mock.js"
function FabricaDeFuncoes ({
  inputPesquisar,
  renderizarProdutos, 
  renderizarCarrinho : secaoRenderizarCarrinho,
  renderizarEcoCoins //elemento html que se trata da div que contem os produtos alocados
}) {

  async function getProdutos() {
    //simulacao de fetch na api para obter os produtos
    //const resposta = await fetch("http://localhost:8000/produtos/lista")
    //const data = resposta.json()

    return dataMocked;

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
          src="${produto.caminho_imagem}" 
          >
        </div>
        
        <div id="${produto.id_produto}" class="p-2 text-zinc-100 flex flex-col gap-2">
          <h2 class="text-4xl">${produto.nome}</h2>
          <p class="text-2xl">${produto.descricao}</p>
          <span  class="text-2xl flex items-center ">
            <img src="../../../assets/coin.svg"> <p class=" text-3xl text-green-400">  ${produto.preco}</p>
          </span>
          <button" class="botao-carrinho flex items-center justify-between rounded-md p-4 transition duration-150 bg-green-600 text-zinc-100 font-bold text-2xl hover:bg-green-700">
            Adicionar <img src="../../../assets/cart-add.svg" alt="">
          </button>
        </div>
      </div>
      `
      elementoHTML.innerHTML= conteudoDiv;
    renderizarProdutos.appendChild(elementoHTML)

    
  }
  const botoesRenderizados = document.getElementsByClassName("botao-carrinho")
  
  for(const botao of botoesRenderizados) {
    botao.addEventListener("click", () => {
      const elementoPai = botao.parentElement;

      const elementoPesquisado = dataMocked.find(produto => produto.id_produto == elementoPai.id)

      console.log(elementoPesquisado)

      const produtoSelecionadoPropriedades = {
        nome_produto : elementoPesquisado.nome,
        preco_produto : elementoPesquisado.preco,
        id_produto : elementoPesquisado.id_produto
      }
      if(verificarPresencaCarrinho(produtoSelecionadoPropriedades)){
        const aceitaAdicionarOmesmo = window.confirm("Deseja adicionar o mesmo produto mais de uma vez?")
        if(!aceitaAdicionarOmesmo) {
          return
        }
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
    if(!getProdutosDoLocalstorage) {
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
        
      })
    }
    reducaoValorProdutos()
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

      })
    }
    reducaoValorProdutos()
  }

  function reducaoValorProdutos() {
    //como a remocao e a adicao de novos produtos atualizam o localstorage, eu vou apenas me basear por la

    const dadosLocastorage = localStorage.getItem("@ecotech-carrinho")
    const parsedArray = JSON.parse(dadosLocastorage)

    console.log(parsedArray)
    const totalAtualizado = parsedArray.reduce((acumulador, valorAtual) => {
      return acumulador + valorAtual.preco_produto

    })
    console.log(totalAtualizado)

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
    
    console.log(inputPesquisar.value)
    
    await new Promise(resolver => setTimeout(resolver, 3000))
  }

  return {
    renderizarCarrinhoLocalstorage,
    manipularEnvioFormularioBusca,
    renderizarSecaoProdutos,
    getProdutos,
  }
}

export default FabricaDeFuncoes