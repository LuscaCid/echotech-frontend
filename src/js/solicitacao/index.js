import { ElementosHTML } from "./elements.js";
import { FuncoesSolicitacao } from "./functions.js";

const { 
    secaoRenderizacaoSolicitacoes,
    enderecoClienteSelect,
    tipoResiduoSelect,
    materialSelect,
    quantidadeInput
} = ElementosHTML();

const {
    renderizarListaSolicitacoesLocalstorage,
    adicionarSolicitacaoArray,
    adicionarSolicitacaoHTML,
    
} = FuncoesSolicitacao({
    secaoRenderizacaoSolicitacoes
})