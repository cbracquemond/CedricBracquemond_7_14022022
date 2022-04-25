import { createStore } from "vuex"

export default createStore({
	state: {
		identified: false,
		user: null,
		token: null
	},
	mutations: {
		login(state, response) {
			if (response) {
				state.user = response.user
				state.token = "Bearer " + response.token
				state.identified = true
			}
		},
		logout(state) {
			state.user = null
			state.token = null
			state.identified = false
		}
	},
	actions: {},
	modules: {}
})
