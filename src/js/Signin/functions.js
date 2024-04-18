import {constantes, getChaveAcesso } from "../../service/config.js"

export function funcoesSingin({
    inputSenha,
    inputEmail
}) {
    // public function 
    async function ManipularEnvioFormulario (event) {
        event.preventDefault();

        if(inputEmail.value == "" || inputSenha == "")return window.alert("Preencha todos os campos!")

        const formularioCampos = new FormData();
        formularioCampos.append("nm_email", inputEmail.value);
        formularioCampos.append("nm_senha", inputSenha.value);
        const resposta = await fetch(`${constantes.baseURL}logar`, {
            method : "POST",
            body : formularioCampos
        });
        const respostaFormatada = await resposta.json();

        localStorage.setItem('@ecotech-dados', JSON.stringify(respostaFormatada));

        
        if(respostaFormatada.codigo == "falha") {
            return window.alert(respostaFormatada.codigo, "Ao Logar.")
        }
        switch(respostaFormatada.nu_cargo) {
            case 0: 
                return window.location.href = "../roles/client/index.html"
            case 1:
                return window.location.href = "../roles/admin/paginahomefuncionario/index.html"
        }

    } 

    return {
        ManipularEnvioFormulario
    }
}