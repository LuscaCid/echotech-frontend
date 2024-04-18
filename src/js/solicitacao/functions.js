import constantes from "../../service/config.js"

export function FuncoesSolicitacao ({
  arrayDeSolicitacoesParaEnviar,
  secaoRenderizacaoSolicitacoes,
  quantidadeInput,
  materialSelect,
  residuoSelect,
  displayEcos,
  totalEcoDiv,
}) 
{
  // desacoplamento de funcoes para buscar dados e fazer a renderizacao de dados
  async function getResiduosRenderizarSelect() {
    const resposta = await fetch(`${constantes.baseURL}residuos/lista`)
    const respostaFormatada = await resposta.json()
    
    renderizarListaSelect(respostaFormatada)
  } 
  //renderizar dados
  function renderizarListaSelect (respostaFormatada){
    for(const element of respostaFormatada) {
      const elementoOption = document.createElement("option")
      
      elementoOption.value = element.id_residuo;
      elementoOption.innerText = element.nm_residuo;
      elementoOption.id = element.nm_residuo
      residuoSelect.appendChild(elementoOption)
    }
  }
  //cricao dos campos e envio para endpoint
  async function manipularEnvioFormulario(e) { // aside formlulario
    e.preventDefault()

    const formData = new FormData()
    //os dados serao enviados dentro de um array
    formData.append("lista_materiais",JSON.stringify(arrayDeSolicitacoesParaEnviar))
    
    const localstorage = localStorage.getItem("@ecotech-dados")
    const tokenParsed = JSON.parse(localstorage)
    const { chave } = tokenParsed
    try {
      const resposta = await fetch (`${constantes.baseURL}solicitacoes/adicionar`, {
        method : "POST",
        body : formData,
        headers : {  
          Authorization : "Bearer " + chave
        }
      })
      const respostaFormatada = await resposta.json()
      
      window.alert(respostaFormatada.codigo)
      window.location.href = "/src/pages/roles/client/index.html"
    } catch (exception) {
        alert(exception)
    }
  }

  async function dispararEventoParaMudarValoresSelectMateriais() {        
    const selectResiduosId = residuoSelect.value
    if(selectResiduosId != "Selecione") {
      console.log(selectResiduosId)
      const respostaMateriais = await fetch(`${constantes.baseURL}materiais/obter?id_residuo=${selectResiduosId}`)
      
      const respostaMateriaisFormatada = await respostaMateriais.json()

      console.log(respostaMateriaisFormatada, "231  ")

      //logica para deletar cada uma das options dentro do select
      const options = materialSelect.querySelectorAll("option")
      for(const option of options) {
          console.log(option)
          option.remove()
      }
      //logica para renderizar os novos dados dentro do select posteriormente limpo
      for(const element of respostaMateriaisFormatada) {
          
        const elementoOption = document.createElement("option")
    
        elementoOption.value = element.nm_material + "," + element.sg_medida + "," + element.vl_eco;
        elementoOption.textContent = element.nm_material;
        elementoOption.className = `option`

        materialSelect.appendChild(elementoOption)
        console.log(residuoSelect)
      }
    }  
  } 
  function adicionarAoArrayDeSolicitacoes(e) {
    e.preventDefault();
    try {
      verificarDadosPadres();
      const [nm_material, sg_medida, vl_eco ] = materialSelect.value.split(",")
      const objetoSolicitacao = {
        id_material : materialSelect.value,
        qt_material : quantidadeInput.value,
        sg_medida : sg_medida,
        nm_material : nm_material,
        vl_eco : vl_eco
        
      } 
      
      totalEcoDiv.classList.remove("hidden")
      arrayDeSolicitacoesParaEnviar.push(objetoSolicitacao)
      
      const total = calcularValorEmEcosCadaElemento(arrayDeSolicitacoesParaEnviar)
      displayEcos.textContent = total
      console.log(total)
      renderizarListaSolicitacoes(objetoSolicitacao)
    } catch (exception) {
      window.alert(exception.message)
    }

  }
  function calcularValorEmEcosCadaElemento(array) {
    let total = 0;
    console.log(array)
    for(let i = 0; i < array.length; i++){
      let valorPorElemento = Number(array[i].vl_eco) * Number(array[i].qt_material);
      console.log(valorPorElemento)
      total += valorPorElemento ;
    }
    console.log(total)
    return total
  }
  function renderizarListaSolicitacoes (objetoSolicitacao) {
    const elementoHTML = document.createElement("section")
    elementoHTML.className = "flex justify-between items-center py-2 px-3 rounded-md bg-zinc-900 border-zinc-600 w-full"
    const conteudoDiv = `
      <span>${objetoSolicitacao.nm_material}</span>
      <span>${objetoSolicitacao.qt_material} ${objetoSolicitacao.sg_medida}</span>
      <button id="${objetoSolicitacao.nm_material}" class="rounded-md bg-zinc-700 border-zinc-600  border hover:bg-zinc-800 transition duration-200 ">
          <img src="../../../assets/trash-red.svg" alt="icone de lixeira para deletar endereco">
      </button>

    `       
    elementoHTML.innerHTML = conteudoDiv

    secaoRenderizacaoSolicitacoes.appendChild(elementoHTML)
    const botaoElementoHTML = elementoHTML.lastElementChild

    botaoElementoHTML.addEventListener("click", () => deletarElementoSolicitado(botaoElementoHTML))
    console.log(botaoElementoHTML)
  }

  function verificarDadosPadres() {
    const inputQuantidade = quantidadeInput.value;
    const valorSelectMaterial = materialSelect.value;
    const valorSelectResiduo = residuoSelect.value;

    if(!inputQuantidade || valorSelectMaterial == "Selecione" || valorSelectResiduo == "Selecione") {
      throw new Error("Preencha todos os campos")
    }
  }

  
  function deletarElementoSolicitado(botaoElementoHTML) {
    const nm_material = botaoElementoHTML.id;
    const elementoPaiBotao = botaoElementoHTML.parentNode
    elementoPaiBotao.remove()

    arrayDeSolicitacoesParaEnviar = arrayDeSolicitacoesParaEnviar.filter(elemento => {
      console.log(nm_material,elemento.nm_material)
      return elemento.nm_material != nm_material
    }   )
    console.log(arrayDeSolicitacoesParaEnviar)
    if(arrayDeSolicitacoesParaEnviar.length == 0)totalEcoDiv.classList.add("hidden")
    
  }

  return {
    dispararEventoParaMudarValoresSelectMateriais,
    adicionarAoArrayDeSolicitacoes,
    getResiduosRenderizarSelect,
    manipularEnvioFormulario,
  }
}
