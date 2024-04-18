

const constanteLocal = "http://localhost:8000/api/";
const constantePCThalys = "http://192.168.0.135:8000/api/"

function getChaveAcesso() {
  const {chave : token} = JSON.parse(localStorage.getItem("@ecotech-dados"))
  if(token != "") {
    return token
  } else { return "" }
} 

const constantes = {
  baseURL : constantePCThalys,
}
export { getChaveAcesso, constantes }
