export function ElementosHTML () {
    const enderecoClienteSelect = document.getElementById('endereco_cliente');
    const tipoResiduoSelect = document.getElementById('tipo_residuo');
    const materialSelect = document.getElementById('material');
    const quantidadeInput = document.getElementById('numero');

    return {
        enderecoClienteSelect,
        tipoResiduoSelect,
        materialSelect,
        quantidadeInput,
    }
}