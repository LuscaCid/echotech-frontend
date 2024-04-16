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
        console.log(dadosFormatados)
        return dadosFormatados.dados.lista
        } catch (e) {
            console.error(e)
        }
        
    }
    const renderizarNaTabela = (listaRecebidos) => {
        for(const elemento of listaRecebidos) {//tr element inside html
            const elementoHTML = document.createElement("tr")
            elementoHTML.className="w-full border-collapse"
            elementoHTML.id=`${elemento.id}`
            const conteudoDiv = `
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap">${elemento.nm_usuario}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.qt_material} ${elemento.medida}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.nm_material}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.dt_solicitacao}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md">
                    <button id="" class=" border border-zinc-600 rounded-md bg-zinc-800 px-5 py-2 transition duration-200 hover:bg-green-600" >abrir</button>
                </td>
            `
            elementoHTML.innerHTML = conteudoDiv
            secaoRenderizacaoRecebidos.appendChild(elementoHTML)
        }
    }
    return {
        getRecebidos,
        renderizarNaTabela
    }
}