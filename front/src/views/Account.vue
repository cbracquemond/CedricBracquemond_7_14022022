<script>
import axios from "../config/axiosConfig"
import BaseInputVue from "../components/BaseInput.vue"
import BaseButtonVue from "../components/BaseButton.vue"
import PasswordInputVue from "../components/PasswordInput.vue"
export default {
	name: "Account",
	components: {
		BaseInputVue,
		BaseButtonVue,
		PasswordInputVue
	},
	data() {
		return {
			user: this.$store.state.user
		}
	},
	methods: {
		async handleSubmit(input, param) {
			try {
				await axios.put("users/" + this.user.id, {
					[param]: input
				})
			} catch (error) {
				console.log(error.message)
			}
		}

		// async deleteAccount()
	}
}
</script>

<template>
	<base-input-vue
		:text="'Userame: ' + this.user.username"
		@sendFormInput="handleSubmit($event, 'username')"
	/>
	<base-input-vue
		:text="'First name: ' + this.user.firstName"
		@sendFormInput="handleSubmit($event, 'first_name')"
	/>
	<base-input-vue
		:text="'Last name: ' + this.user.lastName"
		@sendFormInput="handleSubmit($event, 'last_name')"
	/>
	<base-input-vue
		:text="'Email: ' + this.user.email"
		type="email"
		@sendFormInput="handleSubmit($event, 'email')"
	/>
	<password-input-vue
		text="Change password:"
		type="password"
		@sendFormInput="handleSubmit($event, 'password')"
	/>
	<base-button-vue text="Delete account" />
</template>

<style lang="scss" scoped>
.accountInput {
	display: flex;
	margin: auto;
	flex-direction: column;
	max-width: fit-content;
}
</style>
