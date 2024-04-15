import { ElementosPaginaSignUp } from './elements.js'
import { FuncoesPaginaSignUp } from './functions.js'

const {

  bairro,
  cep,
  cidade,
  estado,
  numero,
  rua,

  usuario,
  senha,

  botaoAdicionarEndereco,
  formulario,
  listaEnderecos,
  secaoEnderecos,

} = ElementosPaginaSignUp()
//let arrayDeEnderecos : typeof enderecoDTO[];  
let arrayDeEnderecos = [] 

const { 
  adicionarEndereco,
  manipularEnvioDoFormulario,
  popularCamposEndereco,
  
  } = FuncoesPaginaSignUp({
    bairro, 
    cidade, 
    estado, 
    rua, 
    numero, 
    usuario,
    senha,

    listaEnderecos, 
    arrayDeEnderecos,
    secaoEnderecos
  });

cep.addEventListener("change", async () => {
  //dados contem a resposta da api da viacep
  if(cep.value.length > 6) {
    try {
      const resposta = await fetch (`https://viacep.com.br/ws/${cep.value}/json`)
      const respostaTratada = await resposta.json()
      
      popularCamposEndereco(respostaTratada)
      numero.value = 0
  
    } catch (error) {
      console.log(error)
    }
  }

})

botaoAdicionarEndereco.addEventListener("click", () => {
  const enderecoDTO = {
    bairro : bairro.value,
    cidade : cidade.value,
    cep : cep.value,
    estado : estado.value,
    rua : rua.value
  }
  adicionarEndereco(enderecoDTO, arrayDeEnderecos)
} )

formulario.addEventListener("submit", manipularEnvioDoFormulario)