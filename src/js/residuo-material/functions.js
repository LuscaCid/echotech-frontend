function FuncoesFabrica ({
    botaoAlteraTelaResiduos,
    botaoAlteraTelaMaterial,
    renderizadorMaterial,
    renderizadorResiduo,
    inputNomeMaterial,
    inputNomeResiduo,
    selectResiduo,
    telaMaterial,
    telaResiduo,
    inputValor,
}) 
{

    function alterarParaTelaResiduo() {
        telaMaterial.classList.add("hidden")
        telaResiduo.classList.remove("hidden")
        
    }

    function alterarParaTelaMaterial() {

        telaMaterial.classList.remove("hidden")
        telaResiduo.classList.add("hidden")
    }
    async function getResiduos() 
    {
        const resposta = await fetch("http://192.168.0.135:8000/api/residuos/lista")
        const respostaFormatada = await resposta.json()
        renderizarListaSelectResiduos(respostaFormatada)
    }

    function renderizarListaSelectResiduos(respostaFormatada) 
    {
        for(const element of respostaFormatada) {
            const elementoOption = document.createElement("option")
            
            elementoOption.value = element.id_residuo;
            elementoOption.innerText = element.nm_residuo;
            elementoOption.id = element.nm_residuo
            selectResiduo.appendChild(elementoOption)
        }
    }
    function renderizarNaListaResiduos() {

    }
    function renderizarNaListaMateriais() {

    }
    return {
        renderizarNaListaMateriais,
        renderizarNaListaResiduos,
        alterarParaTelaMaterial,
        alterarParaTelaResiduo,
        getResiduos,
    }
}

export {FuncoesFabrica}