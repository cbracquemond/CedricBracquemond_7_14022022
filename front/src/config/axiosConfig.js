import axios from "axios"

const instance = axios.create({
	baseURL: "http://127.0.0.1:3000/api/"
})

instance.interceptors.request.use(
	(config) => {
		config.headers["Authorization"] = "toto"
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default instance
