export default function ElementsFactory () {
    const inputPesquisa = document.getElementById("input-pesquisa");
    
    const botaoPesquisa = document.getElementById("botao-pesquisa");

    return {
        inputPesquisa,
        botaoPesquisa
    };
}
