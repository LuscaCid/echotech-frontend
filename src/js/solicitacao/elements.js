export function ElementosHTML () 
{
    const secaoRenderizacaoSolicitacoes = document.getElementById("renderizar-solicitacoes");
    const botaoAdicionarSolicitacao = document.getElementById("adicionar_solicitacao");
    const formularioBackend = document.getElementById("enviar-array-backend");
    const materialSelect = document.getElementById("material");
    const quantidadeInput = document.getElementById("numero");
    const residuoSelect = document.getElementById("residuo");
    const formulario = document.getElementById("formulario");
    const displayEcos = document.getElementById("total-eco")
    const totalEcoDiv = document.getElementById("total-eco-div")
    return {
        secaoRenderizacaoSolicitacoes,
        botaoAdicionarSolicitacao,
        formularioBackend,
        quantidadeInput,
        materialSelect,
        residuoSelect,
        totalEcoDiv,
        displayEcos,
        formulario,
    }
};