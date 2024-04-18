import {constantes,getChaveAcesso} from "../../service/config.js"

const inputNomeProduto = document.getElementById("nome")
const inputDescricaoProduto = document.getElementById("descricao")
const inputLinkImagemProduto = document.getElementById("link-imagem")
const inputValorProduto = document.getElementById("preco")
const inputQuantidadeProduto = document.getElementById("quantidade")
const botaoCadastrarProduto = document.getElementById("cadastrar")
const formulario = document.getElementById("formulario")


function verificarCamposVazios () {
    if(
        !inputNomeProduto.value ||
        !inputDescricaoProduto.value||
        !inputValorProduto.value ||
        !inputQuantidadeProduto.value
    ) {
        return window.alert("Preencha todos os campos!")
    }
}

async function adicionarProduto(e) {
    e.preventDefault()
    verificarCamposVazios()

    const formData = new FormData();
    formData.append("nm_produto", inputNomeProduto.value)
    formData.append("ds_produto", inputDescricaoProduto.value)
    formData.append("vl_eco", inputValorProduto.value)
    formData.append("qt_estoque", inputQuantidadeProduto.value)
    formData.append("nm_imagem", inputLinkImagemProduto.value)

    const resposta = await fetch (`${constantes.baseURL}produtos/adicionar`, {
        method : "POST",
        body : formData,
        headers : {
            Authorization : "Bearer " + getChaveAcesso()
        }
    })
    const respostaFormatada = await resposta.json()
    window.alert(respostaFormatada.codigo)
    return window.location.href = "../paginahomefuncionario/index.html" 
}

formulario.addEventListener("submit", adicionarProduto)