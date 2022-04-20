<script>
import axios from "../config/axiosConfig"
import AccountInputVue from "../components/AccountInput.vue"
export default {
	name: "Account",
	components: {
		AccountInputVue
	},
	data() {
		return {
			user: this.$store.state.user,
			passwordCheck: ""
		}
	},
	methods: {
		confirmNewPassword(newPassword) {
			if (newPassword != this.passwordCheck) {
				const warningParent = document.querySelector("#warningParent")
				const warning = document.createElement("p")
				warning.innerText = "Password does not match"
				warning.classList.add("warning")
				warningParent.appendChild(warning)
				throw Error("Password does not match")
			}
		},

		async handleSubmit(input, param) {
			try {
				this.confirmNewPassword(input)
				await axios.put("users/" + this.user.id, {
					[param]: input
				})
			} catch (error) {
				console.log(error.message)
			}
		}
	}
}
</script>

<template>
	<account-input-vue
		:text="'Userame: ' + this.user.username"
		@updateChange="handleSubmit($event, 'username')"
	/>
	<account-input-vue
		:text="'First name: ' + this.user.firstName"
		@updateChange="handleSubmit($event, 'first_name')"
	/>
	<account-input-vue
		:text="'Last name: ' + this.user.lastName"
		@updateChange="handleSubmit($event, 'last_name')"
	/>
	<account-input-vue
		:text="'Email: ' + this.user.email"
		type="email"
		@updateChange="handleSubmit($event, 'email')"
	/>
	<account-input-vue
		text="Change password:"
		type="password"
		@updateChange="handleSubmit($event, 'password')"
	>
		<template v-slot:label>
			<p>New password</p>
		</template>
		<template v-slot:password-check>
			<p id="warningParent">Confirm password</p>
			<input type="password" v-model="passwordCheck" />
		</template>
	</account-input-vue>
</template>

<style lang="scss" scoped>
.accountInput {
	display: flex;
	margin: auto;
	flex-direction: column;
	max-width: fit-content;
}
</style>
