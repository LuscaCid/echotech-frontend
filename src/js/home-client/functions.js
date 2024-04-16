
export default function FactoryFuncoes ({
    saudacaoUsuario,
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
    async function buscarHistorico(query) {
        //const params = new FormData()
        //params.append("busca" , query)
        
        const dadosLocalstorage = localStorage.getItem("@ecotech-dados")
        const parsed = JSON.parse(dadosLocalstorage)
        const {chave} = parsed

        const response = await fetch("http://192.168.0.135:8000/api/solicitacoes/listaUsuario", {
            method : "GET",
            headers : {
                Authorization : "Bearer " + chave
            }
        })

        const jsonResponse = await  response.json();
        console.log(jsonResponse)
        return jsonResponse.dados.lista
    
    } 

    function renderizarListaSolicitacoes (lista) {
        console.log(lista)
        for(const elemento of lista) {
            const elementoHTML = document.createElement("tr");
            const statusDisplay = {
                text : "",
                color : "" 
            };
            switch(elemento.vl_status) {
                case 1: 
                        statusDisplay.text = "Aprovado"
                        statusDisplay.color = "text-green-600"
                    break;
                    case 0: 
                        statusDisplay.text = "Aguardando"
                        statusDisplay.color = "text-yellow-600"
                    break;
                    case -1:
                        statusDisplay.text = "Cancelado"
                        statusDisplay.color = "text-red-600"
                    break;
            } 
            console.log(statusDisplay)
            elementoHTML.className = "w-full border-collapse";
            const conteudoDiv = `
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left">${elemento.nm_material
                }</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left">${elemento.qt_material}kg</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left">${elemento.dt_solicitacao}</td>
                <td class="bg-zinc-700 py-6 px-8 w-full first:rounded-l-md last:rounded-r-md whitespace-nowrap text-left" ><span class=" ${statusDisplay.color}"> ${statusDisplay.text}</span> </td>
            `
            elementoHTML.innerHTML = conteudoDiv;

            secaoRenderizacao.appendChild(elementoHTML);
        }
    }

    function atualizarSaudacao (nm_usuario) {
        saudacaoUsuario.innerText = nm_usuario
    }
    return {
        renderizarListaSolicitacoes,
        filtrarDadosPeloInput,
        atualizarSaudacao,
        buscarHistorico,
    }
}