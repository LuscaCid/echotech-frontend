export function elementsHtml() {
    const inputEmail = document.getElementById("email")
    const inputSenha = document.getElementById("senha")

    const checkPermanecerLogado = document.getElementById("checkbox_lembrar")
    const formulario = document.getElementById("login")
    return {
        checkPermanecerLogado,
        inputEmail,
        inputSenha,
        formulario,
    }
}