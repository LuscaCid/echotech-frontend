import {ElementosHtml} from "./elements.js"
import { FabricaFuncoesRecebimentos } from "./functions.js"
import dadosFalsos from "./mock.js"
const  {
    secaoRenderizacaoRecebidos,
    inputPesquisa,
    formulario
} = ElementosHtml();

const {
    getRecebidos,
    renderizarNaTabela
} = FabricaFuncoesRecebimentos({
    inputPesquisa, 
    secaoRenderizacaoRecebidos
})


document.addEventListener("DOMContentLoaded", () => {
    //const recebidos = getRecebidos();
    
    const arrayRecebidos = dadosFalsos;
    renderizarNaTabela(arrayRecebidos)
})