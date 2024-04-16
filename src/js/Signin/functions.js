export function funcoesSingin({
    inputSenha,
    inputEmail
}) {
    // public function 
    async function ManipularEnvioFormulario (event) {
        event.preventDefault();

        const formularioCampos = new FormData();
        formularioCampos.append("nm_email", inputEmail.value);
        formularioCampos.append("nm_senha", inputSenha.value);
        console.log(inputSenha)
        const resposta = await fetch(`http://192.168.0.135:8000/api/logar`, {
            method : "POST",
            body : formularioCampos
        });
        const respostaFormatada = await resposta.json();

        console.log(respostaFormatada)
        if(respostaFormatada.codigo == "falha") {
            return window.alert(respostaFormatada.codigo, "Ao Logar.")
        }
        
        
    } 
    //private function
    function redirecionamentoUsuario(retornoLogin) {
        const {
            nm_usuario : nome,
            nm_cargo : cargo
        } = retornoLogin
        
        switch(cargo) {
            //client
            case 0: 
                break;
            //funcionario
            case 1:

                break;
            // admin
            case 2: 
                break;
                
        }
    }

    return {
        ManipularEnvioFormulario
    }
}