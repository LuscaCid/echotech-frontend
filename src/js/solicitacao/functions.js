export function FuncoesSolicitacao ({
  secaoRenderizacaoSolicitacoes
}) {

  function adicionarSolicitacaoArray () {}
  function adicionarSolicitacaoLocalstorage () {}
  function adicionarSolicitacaoHTML() {}
  function renderizarListaSolicitacoesLocalstorage() {}

  async function  carregarEnderecosCliente() {

    const dados = JSON.parse(localStorage.getItem('@ecotech-dados'));                            
    const {chave} = dados

    const resposta = await fetch(
        "http://192.168.0.135:8000/api/usuario/enderecos", 
        {
          method : "GET",
          headers : {
            Authorization : 'Bearer ' + chave,
        },
    })
    const respostaFormatada = await resposta.json()
    console.log(respostaFormatada)
    
    const { enderecos } = respostaFormatada;

    // Adicionar as opções dos endereços dos clientes ao select
    enderecos.forEach(endereco => {
      const option = document.createElement('option');
      option.value = endereco.id_endereco;

      option.textContent = endereco.nm_complemento;

      enderecoClienteSelect.appendChild(option);
    });
  }

  
  const resposta = await fetch("http://192.168.0.135:8000/api/residuos/lista")
            const respostaFormatada = await resposta.json()

            function renderizarListaSelect (){
                for(const element of respostaFormatada) {
                    
                    const elementoOption = document.createElement("option")
                    
                    elementoOption.value = element.id_residuo;
                    elementoOption.innerText = element.nm_residuo;

                    tipoResiduoSelect.appendChild(elementoOption)
                }
            }

  return {
    renderizarListaSolicitacoesLocalstorage,
    adicionarSolicitacaoArray,
    adicionarSolicitacaoHTML,
  }
}