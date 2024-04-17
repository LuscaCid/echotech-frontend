export function ElementosHTML () {
    const enderecoClienteSelect = document.getElementById('endereco_cliente');
    const materialSelect = document.getElementById('material');
    const quantidadeInput = document.getElementById('numero');
    const formulario = document.getElementById("formulario")

    const secaoRenderizacaoSolicitacoes = document.getElementById("renderizar-solicitacoes")

    return {
        secaoRenderizacaoSolicitacoes,
        enderecoClienteSelect,
        quantidadeInput,
        materialSelect,
    }
}