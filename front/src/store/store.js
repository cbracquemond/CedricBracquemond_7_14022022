import { createStore } from "vuex"
import axios from "../config/axiosConfig"

export default createStore({
	state: {
		identified: false,
		user: null,
		token: null
	},
	mutations: {
		SET_TOKEN(state, token) {
			state.token = "Bearer " + token
		},
		login(state, response) {
			if (response) {
				state.user = response.user
				state.identified = true
			}
		},
		logout(state) {
			state.user = null
			state.token = null
			state.identified = false
		}
	},
	actions: {
		async login({ dispatch }, credential) {
			try {
				const response = await axios.post("users/login", {
					email: credential.email,
					password: credential.password
				})
				dispatch("testToken", response.data.token)
			} catch (error) {
				console.log(error.message)
			}
		},
		async testToken({ commit }, token) {
			commit("SET_TOKEN", token)
		}
	},
	modules: {}
})
