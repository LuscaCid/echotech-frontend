import ElementosFactory  from './elements.js';
import FuncoesFactory from './functions.js';
import dadosFalsosParaTeste from "../Recebimentos/mock.js";

const ElementosHTML =  ElementosFactory();

//desestruturacao de elementos
const { 
    inputPesquisa, 
    botaoPesquisa, 
    secaoRenderizacao 
}  = ElementosHTML;

const {
    buscar_historico,
    filtrarDadosPeloInput,
    renderizarListaSolicitacoes
} = FuncoesFactory({secaoRenderizacao});

//desestruturacao de elementos
let dadosMockados;
/**
 *  const vetorHistorico = await buscar_historico();
    console.log(vetorHistorico);


    inputPesquisa.addEventListener("change", ()=> {
        filtrarDadosPeloInput(inputPesquisa.value, vetorHistorico);
    })

    botaoPesquisa.addEventListener("click", buscar_historico);

 * 
 */

document.addEventListener("DOMContentLoaded", () =>  {
    dadosMockados = dadosFalsosParaTeste;
    console.log(dadosMockados)
    //funcao de teste
    //aqui acontecera o fetch no backend
    renderizarListaSolicitacoes(dadosMockados)
})

