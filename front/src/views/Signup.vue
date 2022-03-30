<script>
import BaseButtonVue from "../components/BaseButton.vue"
export default {
	name: "Signup",
	components: {
		BaseButtonVue
	},
	data() {
		return {
			first_name: "",
			last_name: "",
			username: "",
			email: "",
			password: "",
			passwordCheck: ""
		}
	},
	methods: {
		handleValidation() {}
	}
}
</script>
<template>
	<form class="signup_form" @submit.prevent="handleValidation">
		<label>First name</label>
		<input type="text" required v-model="first_name" />
		<label>Last name</label>
		<input type="text" required v-model="last_name" />
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
