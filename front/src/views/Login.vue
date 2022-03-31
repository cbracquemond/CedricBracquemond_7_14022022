<script>
import BaseButtonVue from "../components/BaseButton.vue"
import axios from "../config/axiosConfig"
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
		async handleSubmit() {
			try {
				const response = await axios.post("users/login", {
					email: this.email,
					password: this.password
				})
				localStorage.setItem("token", response.data.token)
				this.$router.push("/home")
			} catch (error) {
				console.log(error.message)
			}
		}
	}
}
</script>
<template>
	<form class="login_form" @submit.prevent="handleSubmit">
		<label>Email</label>
		<input type="email" required v-model="email" />
		<label>Password</label>
		<input type="password" required v-model="password" />
		<BaseButtonVue text="Se connecter" />
	</form>
</template>
<style></style>
