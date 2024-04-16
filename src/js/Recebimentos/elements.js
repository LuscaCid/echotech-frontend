export function ElementosHtml() {
    const secaoRenderizacaoRecebidos = document.getElementById("secao-renderizacao-recebidos")
    const inputPesquisa = document.getElementById("pesquisa");
    const formulario = document.getElementById("pesquisa-solicitacao")
    const fecharModal = document.getElementById("fechar-modal")
    const modal = document.getElementById("modal")
    const fadeModal = document.getElementById("fade")
    return {
        secaoRenderizacaoRecebidos,
        inputPesquisa,
        fecharModal,
        formulario,
        fadeModal,
        modal,
    }
}