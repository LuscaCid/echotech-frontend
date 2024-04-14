
export default function FactoryFuncoes (){ 
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
        
            const response = await fetch("http://localhost:3000/historico")
            const jsonResponse = await  response.json();
            return response
        
        
    } 

    return {
        buscar_historico,
        filtrarDadosPeloInput
    }
}