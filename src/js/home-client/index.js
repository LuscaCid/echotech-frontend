import ElementosFactory  from './elements.js';
import FuncoesFactory from './functions.js';
import dadosFalsosParaTeste from "../Recebimentos/mock.js";

const ElementosHTML =  ElementosFactory();

//desestruturacao de elementos
const { 
    saudacaoUsuario,
    inputPesquisa, 
    botaoPesquisa, 
    secaoRenderizacao 
}  = ElementosHTML;

const {
    renderizarListaSolicitacoes,
    filtrarDadosPeloInput,
    buscarHistorico,
    atualizarSaudacao,
} = FuncoesFactory({
    saudacaoUsuario,
    secaoRenderizacao
});


/**
 *  
    inputPesquisa.addEventListener("change", ()=> {
        filtrarDadosPeloInput(inputPesquisa.value, vetorHistorico);
    })

    botaoPesquisa.addEventListener("click", buscar_historico);
* 
*/

document.addEventListener("DOMContentLoaded", async () =>  {
    
    const dados = JSON.parse(localStorage.getItem("@ecotech-dados"))

    let dadosBuscados = await buscarHistorico();
    //funcao de teste
    //aqui acontecera o fetch no backend
    renderizarListaSolicitacoes(dadosBuscados);
})

