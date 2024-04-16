import { ElementosHtml } from "./elements.js"
import { FabricaFuncoesRecebimentos } from "./functions.js"

const  {
    secaoRenderizacaoRecebidos,
    inputPesquisa,
    formulario,
    fecharModal,
    fadeModal,
    modal
} = ElementosHtml();

const {
    getRecebidos,
    renderizarNaTabela
} = FabricaFuncoesRecebimentos({
    inputPesquisa, 
    secaoRenderizacaoRecebidos
})

fecharModal.addEventListener("click", () => {
    modal.classList.add("hidden")
})
document.addEventListener("DOMContentLoaded", async () => {
    //const recebidos = getRecebidos();
    const dadosRecebidos = await getRecebidos()
   
    console.log(dadosRecebidos)
    renderizarNaTabela(dadosRecebidos)
   // renderizarNaTabela(dadosRecebidos)
})