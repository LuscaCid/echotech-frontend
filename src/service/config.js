const {chave : token} = JSON.parse(localStorage.getItem("@ecotech-dados"))

export default {
  baseURL : "http://localhost:8000/api/",
  token
}