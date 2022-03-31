import axios from "axios"

const instance = axios.create({
	baseURL: "http://127.0.0.1:3000/api/"
})

axios.defaults.headers.common["Autorisation"] =
	"Bearer" + localStorage.getItem("token")

export default instance
