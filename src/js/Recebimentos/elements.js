export function ElementosHtml() {
    const secaoRenderizacaoRecebidos = document.getElementById("secao-renderizacao-recebidos")
    const inputPesquisa = document.getElementById("pesquisa");
    const formulario = document.getElementById("pesquisa-solicitacao")
    
    return {
        secaoRenderizacaoRecebidos,
        inputPesquisa,
        formulario
    }
}