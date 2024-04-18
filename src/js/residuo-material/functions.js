import constantes from "../../service/config.js"
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
        const resposta = await fetch(`${constantes.baseURL}residuos/lista`)
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
    async function renderizarNaListaResiduos() {
        const resposta = await fetch(`${constantes.baseURL}residuos/lista`)
        const respostaFormatada = await resposta.json()

        console.log(respostaFormatada)
        for(const elemento of respostaFormatada) {
            const elementoHTML = document.createElement("section")
            elementoHTML.className ="border border-zinc-700 p-2 rounded-md even:bg-zinc-700 odd:bg-zinc-800 flex items-center justify-between"
           
            const conteudoDiv = `
                <span class="text-2xl text-zinc-200">${elemento.nm_residuo}</span>
                <button id="${elemento.nm_residuo}" class="rounded-md  bg-zinc-700 border-zinc-600 hover:bg-zinc-800 transition duration-150 ">
                    <img src="../../../assets/trash-red.svg" alt="">
                </button>
            `;
            elementoHTML.innerHTML = conteudoDiv;
            renderizadorResiduo.appendChild(elementoHTML);
        }

    }
    async function renderizarNaListaMateriais() {
        const resposta = await fetch(`${constantes.baseURL}materiais/lista`)
        const respostaFormatada = await resposta.json()

        console.log(respostaFormatada)
        for(const elemento of respostaFormatada) {
            const elementoHTML = document.createElement("section")
            elementoHTML.className =" bg-zinc-800 p-2 rounded-md flex items-center justify-between border border-zinc-700 p-2  even:bg-zinc-700 odd:bg-zinc-800 "
           
            const conteudoDiv = `
                <span class="text-2xl text-zinc-200">${elemento.nm_material}</span>
                <span class="text-2xl text-zinc-200">${elemento.vl_ecos}</span>
                <span class="text-2xl text-zinc-200">${elemento.nm_medida}</span>
                <button id="${elemento.nm_material}" class="rounded-md bg-zinc-700 border-zinc-600 hover:bg-zinc-800 transition duration-150 ">
                    <img src="../../../assets/trash-red.svg" alt="">
                </button>
            `;
            elementoHTML.innerHTML = conteudoDiv;
            renderizadorMaterial.appendChild(elementoHTML);
        }
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