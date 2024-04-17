function ElementosHTML () {
    const renderizadorResiduo = document.getElementById("renderizador-residuo")
    const renderizadorMaterial = document.getElementById("renderizador-material")
    const formularioMaterial = document.getElementById("formulario-material")
    const selectResiduo = document.getElementById("residuo")
    const inputNomeResiduo = document.getElementById("nome-residuo")
    
    const formularioResiduo = document.getElementById("formulario-residuo")
    const inputValor = document.getElementById("valor")
    const inputNomeMaterial = document.getElementById("nome")
    
    const telaResiduo = document.getElementById("tela-residuo");
    const telaMaterial = document.getElementById("tela-material");

    const botaoAlteraTelaMaterial = document.getElementById("material-link");
    const botaoAlteraTelaResiduos = document.getElementById("residuo-link");


    return {
        botaoAlteraTelaMaterial,
        botaoAlteraTelaResiduos,
        renderizadorMaterial,
        renderizadorResiduo,
        formularioMaterial,
        formularioResiduo,
        inputNomeMaterial,
        inputNomeResiduo,
        selectResiduo,
        telaMaterial,
        telaResiduo,
        inputValor,
    }
}

export {ElementosHTML}