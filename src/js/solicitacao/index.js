import { ElementosHTML } from "./elements.js";
import { FuncoesSolicitacao } from "./functions.js";

const { 
    secaoRenderizacaoSolicitacoes,
    botaoAdicionarSolicitacao,
    enderecoClienteSelect,
    formularioBackend,
    quantidadeInput,
    materialSelect,
    residuoSelect,
    displayEcos,
    totalEcoDiv,
    formulario : formularioAdicionarSolicitacao
} = ElementosHTML();

let arrayDeSolicitacoesParaEnviar = []


const {
    dispararEventoParaMudarValoresSelectMateriais,
    adicionarAoArrayDeSolicitacoes,
    getResiduosRenderizarSelect,
    manipularEnvioFormulario,

} = FuncoesSolicitacao({
    arrayDeSolicitacoesParaEnviar,
    secaoRenderizacaoSolicitacoes,
    quantidadeInput,
    materialSelect,
    residuoSelect,
    displayEcos,
    totalEcoDiv
})

residuoSelect.addEventListener("change", dispararEventoParaMudarValoresSelectMateriais)

formularioBackend.addEventListener("submit", manipularEnvioFormulario)

formularioAdicionarSolicitacao.addEventListener("submit", adicionarAoArrayDeSolicitacoes)

botaoAdicionarSolicitacao.addEventListener("click", (a) =>  a)

document.addEventListener("DOMContentLoaded",  getResiduosRenderizarSelect)