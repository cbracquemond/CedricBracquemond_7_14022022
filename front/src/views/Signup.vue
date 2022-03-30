<script>
import BaseButtonVue from "../components/BaseButton.vue"
import axios from "../config/axiosConfig"
export default {
	name: "Signup",
	components: {
		BaseButtonVue
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			passwordCheck: ""
		}
	},
	methods: {
		async handleValidation() {
			const response = await axios.post("users", {
				first_name: this.firstName,
				last_name: this.lastName,
				username: this.username,
				email: this.email,
				password: this.password
			})
			console.log(response)
		}
	}
}
</script>
<template>
	<form class="signup_form" @submit.prevent="handleValidation">
		<label>First name</label>
		<input type="text" required v-model="firstName" />
		<label>Last name</label>
		<input type="text" required v-model="lastName" />
		<label>Username</label>
		<input type="text" required v-model="username" />
		<label>Email</label>
		<input type="email" required v-model="email" />
		<label>Password</label>
		<input type="password" required v-model="password" />
		<label>Password confirmation</label>
		<input type="password" required v-model="passwordCheck" />
		<BaseButtonVue text="Validation" />
	</form>
</template>

<style scoped>
.signup_form {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	max-width: fit-content;
	text-align: left;
}
</style>
