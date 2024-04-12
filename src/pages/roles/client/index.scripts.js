import ElementosFactory  from './home-scripts/elements.js';
import FuncoesFactory from './home-scripts/functions.js'


const ElementosHTML =  ElementosFactory();

//desestruturacao de elementos
const { inputPesquisa, botaoPesquisa }  = ElementosHTML;

const Funcoes = FuncoesFactory();

//desestruturacao de elementos
const { buscar_historico, filtrarDadosPeloInput } = Funcoes;

const vetorHistorico = await buscar_historico();
console.log(vetorHistorico);


inputPesquisa.addEventListener("change", ()=> {
    filtrarDadosPeloInput(inputPesquisa.value, vetorHistorico);
})

botaoPesquisa.addEventListener("click", buscar_historico);

