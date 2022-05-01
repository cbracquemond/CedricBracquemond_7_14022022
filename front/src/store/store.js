import { createStore } from "vuex"
import axios from "../config/axiosConfig"

export default createStore({
	state: {
		user: null,
		token: null
	},
	getters: {
		authenticated(state) {
			if (state.token && state.user) return true
			return false
		},
		user(state) {
			return state.user
		}
	},

	mutations: {
		SET_TOKEN(state, token) {
			state.token = token ? "Bearer " + token : null
		},
		SET_USER(state, user) {
			state.user = user
		}
	},
	actions: {
		logout({ commit }) {
			localStorage.removeItem("token")
			commit("SET_TOKEN", null)
			commit("SET_USER", null)
		},
		async login({ dispatch }, credential) {
			const response = await axios.post("users/login", {
				email: credential.email,
				password: credential.password
			})
			return dispatch("testToken", response.data.token)
		},
		async testToken({ commit }, token) {
			if (token) commit("SET_TOKEN", token)
			if (!this.state.token) return
			try {
				const response = await axios.get("users/me")
				localStorage.setItem("token", token)
				commit("SET_USER", response.data.user)
			} catch (error) {
				console.log(error)
				localStorage.removeItem("token")
				commit("SET_TOKEN", null)
				commit("SET_USER", null)
			}
		}
	},
	modules: {}
})
