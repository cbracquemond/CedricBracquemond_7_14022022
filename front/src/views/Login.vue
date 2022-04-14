<script>
import BaseButtonVue from "../components/BaseButton.vue"
import axios from "../config/axiosConfig"
import { mapMutations } from "vuex"
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
	methods: {
		...mapMutations(["login"]),
		async handleSubmit() {
			try {
				const response = await axios.post("users/login", {
					email: this.email,
					password: this.password
				})
				this.login(response.data)
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
		<base-button-vue text="Log-in" />
	</form>
	<router-link to="/signup" class="nav-link">Sign-up </router-link>
</template>
<style></style>
