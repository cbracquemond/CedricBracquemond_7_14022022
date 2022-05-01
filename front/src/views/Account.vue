<script>
import axios from "../config/axiosConfig"
import InputBaseVue from "../components/InputBase.vue"
import InputPasswordVue from "../components/InputPassword.vue"
import InputDeleteAccountVue from "../components/InputDeleteAccount.vue"
import { mapActions } from "vuex"
import { mapGetters } from "vuex"

export default {
	name: "Account",
	components: {
		InputBaseVue,
		InputPasswordVue,
		InputDeleteAccountVue
	},
	data() {
		return {
			user: this.$store.state.user
		}
	},
	computed: {
		...mapGetters(["user"])
	},
	methods: {
		...mapActions(["logout"]),
		async handleUpdate(input, param) {
			try {
				await axios.put("users/" + this.user.id, {
					[param]: input
				})
			} catch (error) {
				console.log(error.message)
			}
		},
		async handleDelete(event) {
			try {
				await axios.post("users/check/", {
					email: this.user.email,
					password: event
				})
			} catch (error) {
				console.log(error.message)
				return
			}
			try {
				await axios.delete("users/" + this.user.id)
			} catch (error) {
				console.log(error.message)
			}
			this.logout()
		}
	}
}
</script>

<template>
	<input-base-vue
		:text="'Userame: ' + user.username"
		@sendFormInput="handleSubmit($event, 'username')"
	/>
	<input-base-vue
		:text="'First name: ' + user.first_name"
		@sendFormInput="handleSubmit($event, 'first_name')"
	/>
	<input-base-vue
		:text="'Last name: ' + user.last_name"
		@sendFormInput="handleSubmit($event, 'last_name')"
	/>
	<input-base-vue
		:text="'Email: ' + user.email"
		type="email"
		@sendFormInput="handleSubmit($event, 'email')"
	/>
	<input-password-vue
		text="Change password:"
		type="password"
		@sendFormInput="handleSubmit($event, 'password')"
	/>
	<input-delete-account-vue
		text="Delete account"
		type="password"
		@sendFormInput="handleDelete($event)"
	/>
</template>

<style lang="scss" scoped>
.accountInput {
	display: flex;
	margin: auto;
	flex-direction: column;
	max-width: fit-content;
}
</style>
