export function FabricaFuncoesRecebimentos({
    inputPesquisa,
    secaoRenderizacaoRecebidos
}) {
    
    const getRecebidos = async (query = "") => {
        //const response = await fetch();
        //const data =await response.json();

    }
    const renderizarNaTabela = (listaRecebidos) => {
        for(const elemento of listaRecebidos) {//tr element inside html
            const elementoHTML = document.createElement("tr")
            elementoHTML.className="w-full border-collapse"
            elementoHTML.id=`${elemento.id}`
            const conteudoDiv = `
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap">${elemento.nome_cliente}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.quantidade} ${elemento.medida}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.material}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap ">${elemento.data_solicitacao}</td>
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