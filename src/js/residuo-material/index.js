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
    selectMedida,
    telaMaterial,
    inputValor,
    telaResiduo
} = ElementosHTML()

const {
    manipularEnvioFormularioMaterial,
    manipularEnvioFormularioResiduo,
    renderizarNaListaMateriais,
    renderizarNaListaResiduos,
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
    selectMedida,
    telaResiduo,
    inputValor,
})

botaoAlteraTelaMaterial.addEventListener("click", alterarParaTelaMaterial)
botaoAlteraTelaResiduos.addEventListener("click", alterarParaTelaResiduo)

formularioResiduo.addEventListener("submit", manipularEnvioFormularioResiduo)
formularioMaterial.addEventListener("submit", manipularEnvioFormularioMaterial)

document.addEventListener("DOMContentLoaded", () => {
    renderizarNaListaResiduos()
    renderizarNaListaMateriais()
    getResiduos()

} )