import { elementsHtml } from "./elements.js";
import { funcoesSingin } from "./functions.js";
const {
    checkPermanecerLogado,
    inputEmail,
    inputSenha,
    formulario
} = elementsHtml() ;


console.log(inputSenha)
console.log(inputEmail)

const { ManipularEnvioFormulario } = funcoesSingin({
    inputEmail,
    inputSenha
});

formulario.addEventListener("submit", ManipularEnvioFormulario )