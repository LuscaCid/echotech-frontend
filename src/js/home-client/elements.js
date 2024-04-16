export default function ElementsFactory () {
    const inputPesquisa = document.getElementById("input-pesquisa");
    const botaoPesquisa = document.getElementById("botao-pesquisa");
    const secaoRenderizacao = document.getElementById("secao-lista");

    const saudacaoUsuario = document.getElementById("saudacao");
    return {
        saudacaoUsuario,
        secaoRenderizacao,
        inputPesquisa,
        botaoPesquisa
    };
}
