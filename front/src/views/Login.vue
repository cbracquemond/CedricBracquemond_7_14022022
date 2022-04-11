<script>
import BaseButtonVue from "../components/BaseButton.vue"
import axios from "../config/axiosConfig"
import store from "../store/store"
import { mapGetters } from "vuex"
export default {
	name: "Login",
	components: {
		BaseButtonVue
	},
	data() {
		return {
			email: "",
			password: ""
		}
	},
	computed: {
		...mapGetters(["setToken", "setUser"])
	},
	methods: {
		async handleSubmit() {
			try {
				const response = await axios.post("users/login", {
					email: this.email,
					password: this.password
				})
				this.setToken(response.token)
				this.setUser(response.user)
				console.log(store.state.token)
				this.$router.push("/")
			} catch (error) {
				console.log(error.message)
			}
		}
	}
}
</script>
<template>
	<form class="login_form" @submit.prevent="handleSubmit">
		<input placeholder="email" type="email" required v-model="email" />
		<input placeholder="password" type="password" required v-model="password" />
		<base-button-vue text="Se connecter" />
	</form>
</template>
<style></style>
