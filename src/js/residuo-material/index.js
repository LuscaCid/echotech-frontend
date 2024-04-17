import { ElementosHTML } from "./elements.js";
import { FuncoesFabrica } from "./functions.js"

const {
    botaoAlteraTelaMaterial,
    botaoAlteraTelaResiduos,
    renderizadorMaterial,
    renderizadorResiduo,
    formularioMaterial,
    formularioResiduo,
    inputNomeMaterial,
    inputNomeResiduo,
    selectResiduo,
    telaMaterial,
    inputValor,
    telaResiduo
} = ElementosHTML()

const {
    alterarParaTelaMaterial,
    alterarParaTelaResiduo,
    getResiduos,
} = FuncoesFabrica({
    botaoAlteraTelaResiduos,
    botaoAlteraTelaMaterial,
    renderizadorMaterial,
    renderizadorResiduo,
    inputNomeMaterial,
    inputNomeResiduo,
    selectResiduo,
    telaMaterial,
    telaResiduo,
    inputValor,
})

botaoAlteraTelaMaterial.addEventListener("click", alterarParaTelaMaterial)
botaoAlteraTelaResiduos.addEventListener("click", alterarParaTelaResiduo)

document.addEventListener("DOMContentLoaded", getResiduos)