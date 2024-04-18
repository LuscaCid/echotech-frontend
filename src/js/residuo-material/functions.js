import {constantes, getChaveAcesso} from "../../service/config.js"
function FuncoesFabrica ({
    botaoAlteraTelaResiduos,
    botaoAlteraTelaMaterial,
    renderizadorMaterial,
    renderizadorResiduo,
    inputNomeMaterial,
    inputNomeResiduo,
    selectResiduo,
    telaMaterial,
    selectMedida,
    telaResiduo,
    inputValor,
}) 
{
    async function manipularEnvioFormularioResiduo(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nm_residuo", inputNomeResiduo.value)
        
        const resposta = await fetch(`${constantes.baseURL}residuos/adicionar`, {
            method : "POST",
            body : formData,
            headers : {
                Authorization : "Bearer " + getChaveAcesso()
            }
        })
        const respostaFormatada = await resposta.json()

        window.alert(respostaFormatada)
    }
    
    async function manipularEnvioFormularioMaterial(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("nm_residuo", selectResiduo.value)
        formData.append("nm_material",inputNomeMaterial.value)
        formData.append("vl_eco",inputNomeMaterial.value)
        formData.append("sg_medida", selectMedida.value)
        
        const resposta = await fetch(`${constantes.baseURL}materiais/adicionar`, {
            method : "POST",
            body : formData,
            headers : {
                Authorization : "Bearer " + getChaveAcesso()
            }
        })
        const respostaFormatada = await resposta.json()
        console.log(respostaFormatada)
        window.alert(respostaFormatada)
        
    }

    function alterarParaTelaResiduo() {
        telaMaterial.classList.add("hidden")
        telaResiduo.classList.remove("hidden")
        
    }

    function alterarParaTelaMaterial() {

        telaMaterial.classList.remove("hidden")
        telaResiduo.classList.add("hidden")
        getResiduos()
    }
    async function getResiduos() 
    {
        const resposta = await fetch(`${constantes.baseURL}residuos/lista`)
        const respostaFormatada = await resposta.json()
        console.log(respostaFormatada)
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
            console.log(elemento)
            const conteudoDiv = `
                <span class="text-2xl text-zinc-200">${elemento.nm_material}</span>
                <span class="text-2xl text-zinc-200">${elemento.vl_eco} ecos</span>
                <span class="text-2xl text-zinc-200">${elemento.sg_medida}</span>
                <button id="${elemento.nm_material}" class="rounded-md bg-zinc-700 border-zinc-600 hover:bg-zinc-800 transition duration-150 ">
                    <img src="../../../assets/trash-red.svg" alt="">
                </button>
            `;
            elementoHTML.innerHTML = conteudoDiv;
            renderizadorMaterial.appendChild(elementoHTML);
        }
    }
    return {
        manipularEnvioFormularioMaterial,
        manipularEnvioFormularioResiduo,
        renderizarNaListaMateriais,
        renderizarNaListaResiduos,
        alterarParaTelaMaterial,
        alterarParaTelaResiduo,
        getResiduos,
    }
}

export {FuncoesFabrica}