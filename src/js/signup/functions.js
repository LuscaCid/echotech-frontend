import { constantes } from "../../service/config.js"

function FuncoesPaginaSignUp({
  bairro, 
  cidade,
  estado, 
  rua, 
  numero,
  senha,
  nome,
  email,
  listaEnderecos,
  arrayDeEnderecos,
  secaoEnderecos,
  btnDeleteArr
}) {

  function verificarEnderecoJaCriado(enderecoDTO) 
  { // returns a boolean
    return arrayDeEnderecos.filter(endereco => endereco.rua === enderecoDTO.rua && endereco.cidade === enderecoDTO.cidade)
 
  }

  function certificarCamposEnderecoVazios() 
  {
    if(!(rua.value || estado.value || cidade.value || bairro.value || numero.value ))return false
    else return true
  }

  function adicionarEndereco (enderecoDTO) 
  {
    //thats will be update
    const campoVazio = certificarCamposEnderecoVazios()
    
    if(!campoVazio) 
    {
      return alert("Preencha todos os campos!") 
    }

    const jaExiste = verificarEnderecoJaCriado(enderecoDTO)
    
    if(jaExiste.length > 0) return window.alert("Endereco ja criado!")
    
    arrayDeEnderecos.push(enderecoDTO)
    secaoEnderecos.classList.remove("hide")

    const elementoHTML = document.createElement("section")
    const insercaoDeDadosContudo = `
        ${enderecoDTO.rua}
        <button class="botao-excluir" id="${enderecoDTO.rua}">
            <img class="excluir" src="../../assets/trash-red.svg" alt="icone de lixeira">
        </button>
      
    `
    elementoHTML.innerHTML = insercaoDeDadosContudo;
    listaEnderecos.appendChild(elementoHTML);
  
    btnDeleteArr = document.querySelectorAll(".botao-excluir")

    btnDeleteArr.forEach(botao => {
      botao.addEventListener("click" ,()=> deletarEndereco(botao))
    })
    console.log(arrayDeEnderecos)
  }

  function deletarEndereco(elemento) 
  {
    //pegando o elemento pai do botao que esta sendo selecionado para o abate
    const elementoPai = elemento.parentNode
    elementoPai.remove()
    
    arrayDeEnderecos = arrayDeEnderecos.filter(endereco => endereco.rua != elemento.id)

    //isso vai esconder o elemento quando o array de enderecos estiver vazio
    if(arrayDeEnderecos.length === 0)secaoEnderecos.classList.add("hide")
    
  }

  function certificarCamposCredenciais() 
  {
    return nome.value != "" && senha.value != ""
  }
  //e : FormEvent<HTMLFormELement>
  async function manipularEnvioDoFormulario(e) 
  {
    e.preventDefault()

    if(!certificarCamposCredenciais())return alert("Preencha todos os campos de credenciais!")
    //test
    
    if(arrayDeEnderecos.length == 0 )return alert("Adicione ao menos um endereco!")
    //test
    const formData = new FormData()
    formData.append("nm_usuario" , nome.value)
    formData.append("nm_email" , email.value)
    formData.append("nm_senha" , senha.value)
    formData.append("lista_enderecos" ,JSON.stringify(arrayDeEnderecos) )

    const resposta = await fetch(`${constantes.baseURL}cadastrar`, {
      body : formData,
      method : "POST"
    });
    return console.log( resposta.json()) ;

    //const resposta = await api.post("clients/registrar", formData);
    //return resposta.data ;
    
    // agora e so conectar com a api, acessando o endpoint de cadastro de cliente passando o array de enderecos
    // e as credenciais
    
  }

  function popularCamposEndereco(dadosViaCep) 
  {
    bairro.value = dadosViaCep.bairro
    rua.value = dadosViaCep.logradouro
    cidade.value = dadosViaCep.localidade
    estado.value = dadosViaCep.uf
    
  }
  return {
    adicionarEndereco,
    manipularEnvioDoFormulario,
    popularCamposEndereco,
    deletarEndereco
  }
}
export { FuncoesPaginaSignUp }