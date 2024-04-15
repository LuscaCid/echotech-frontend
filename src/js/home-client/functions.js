
export default function FactoryFuncoes ({
    secaoRenderizacao
}){ 
    //apenas filtrar o que foi retornado a partir do input 
    function filtrarDadosPeloInput(query, historico  /* array */ ) {
        let novoVetorDeHistorico = historico.filter(element => { 
            if(element.material.toLowerCase().includes(query))return element;
        }) 
        console.log(novoVetorDeHistorico)
        return novoVetorDeHistorico;
    }

    //ao clicar no botao de busca
    async function buscar_historico(query) {
        const params = new FormData()
        params.append("busca" , query)
        
        //const response = await fetch("http://localhost:3000/historico")
        //const jsonResponse = await  response.json();
        //return response
    
        
    } 

    function renderizarListaSolicitacoes (lista) {
        console.log(lista)
        for(const elemento of lista) {
            const elementoHTML = document.createElement("tr");
            let statusDisplay;
            switch(elemento.status) {
                case 1: 
                    statusDisplay = "Aprovado"
                    break;
                case 0: 
                    statusDisplay = "Aguardando"
                    break;
                case -1:
                    statusDisplay = "Cancelado"
                    break;
            } 
            elementoHTML.className = "w-full border-collapse";
            const conteudoDiv = `
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left">${elemento.material}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left">$${elemento.quantidade_ecocoins}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left">${elemento.data_solicitacao}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left">${statusDisplay}</td>
            `
            elementoHTML.innerHTML = conteudoDiv;

            secaoRenderizacao.appendChild(elementoHTML);
        }

    }

    return {
        renderizarListaSolicitacoes,
        buscar_historico,
        filtrarDadosPeloInput
    }
}