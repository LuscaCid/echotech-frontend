import {constantes, getChaveAcesso} from "../../service/config.js"

export function FabricaFuncoesRecebimentos({
    inputPesquisa,
    secaoRenderizacaoRecebidos
}) {
    
    const getRecebimentosInitial = async () => {
        //const response = await fetch();
        //const data =await response.json();
        //return data
    }

    async function getRecebidos () {
        const dados = JSON.parse(localStorage.getItem("@ecotech-dados")) 
        const { chave } = dados
        try {
            const response = await fetch("http://192.168.0.135:8000/api/solicitacoes/lista", {
                method : "GET",
                headers : {
                    Authorization : "Bearer " + chave
                }
            });
        const dadosFormatados = await response.json();

        return dadosFormatados.dados.lista
        } catch (e) {
            console.error(e)
        }
        
    }
    const renderizarNaTabela = (listaRecebidos) => {
        for(const elemento of listaRecebidos) {//tr element inside html
            const elementoHTML = document.createElement("tr")
            elementoHTML.className="w-full border-collapse"

            let elementoComBotoesAceitarOuNegar;

            if(elemento.vl_status == 0) {
                elementoComBotoesAceitarOuNegar = `
                    <td class=" bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md">
                        <button id="${elemento.id_solicitacao}" class="aceitar border border-zinc-600 rounded-md bg-zinc-800 px-5 py-2 transition duration-200 hover:bg-green-600" >Aceitar</button>
                    </td>
                    <td class=" bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md">
                        <button id="${elemento.id_solicitacao}" class="negar border border-zinc-600 rounded-md bg-zinc-800 px-5 py-2 transition duration-200 hover:bg-red-600" >Negar</button>
                    </td>
                `
            }  else if (elemento.vl_status == -1) {
                elementoComBotoesAceitarOuNegar = `
                    <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-red-500">Negado</td>
                `
            } else if (elemento.vl_status == 1) {
                elementoComBotoesAceitarOuNegar = `
                    <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-green-500">Aceito</td>
                `
            }

            elementoHTML.id=`${elemento.id}`
            const conteudoDiv = `
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap">id: ${elemento.id_solicitacao}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap">${elemento.nm_usuario}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.qt_material} ${elemento.sg_medida}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.nm_material}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.dt_solicitacao}</td>
                ${elementoComBotoesAceitarOuNegar}

            `
            elementoHTML.innerHTML = conteudoDiv
            secaoRenderizacaoRecebidos.appendChild(elementoHTML)
        }
        const botoesAceitar = document.getElementsByClassName("aceitar")
        for(const botao of botoesAceitar) {
            botao.addEventListener("click", async () => {
                const formData = new FormData()
                formData.append("id_solicitacao", botao.id)

                const respostaApi = await fetch(`${constantes.baseURL}solicitacoes/aceitar`, { 
                    method : "POST",
                    headers : {
                        Authorization : "Bearer " + getChaveAcesso()
                    },
                    body : formData,
                })

                const respostaFormatada = await respostaApi.json()
                
                //solicitacoes/negar/ ==> id_solicitacao
                //solicitacoes/aceitar/ ==> id_solicitacao
                location.reload()
            })
        }
        const botoesNegar = document.getElementsByClassName("negar")
        for(const botao of botoesNegar) {
            botao.addEventListener("click", async () => {
                const formData = new FormData()
                formData.append("id_solicitacao", botao.id)
                const respostaApi = await fetch(`${constantes.baseURL}solicitacoes/negar`, { 
                    method : "POST", 
                    headers : {
                        Authorization : "Bearer " + getChaveAcesso()
                    },
                    body : formData,
                })
                const respostaFormatada = await respostaApi.json()
                
                //solicitacoes/negar/ ==> id_solicitacao
                //solicitacoes/aceitar/ ==> id_solicitacao
                location.reload()
            })
        }
    }
    return {
        getRecebidos,
        renderizarNaTabela
    }
}