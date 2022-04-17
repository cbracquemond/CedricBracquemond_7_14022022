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
			username: "",
			firstName: "",
			lastName: "",
			email: "",
			newPassword: "",
			passwordCheck: "",
			oldPassword: ""
		}
	},
	methods: {
		checkPassword() {
			if (this.password != this.passwordCheck) {
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
				// const paramKey = param
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
		:text="this.$store.state.user.username"
		@updateChange="handleSubmit($event, 'username')"
	/>
	<!-- <span>{{ user.firstName }}</span>
	</account-input-vue> -->
	<!-- <form class="accountInput" @submit.prevent="handleSubmit">
		<label>User name</label>
		<input :placeholder="this.user.username" type="text" v-model="username" />
		<label>First name</label>
		<input :placeholder="this.user.firstName" type="text" v-model="firstName" />
		<label>Last name</label>
		<input :placeholder="this.user.lastName" type="text" v-model="lastName" />
		<label>Email</label>
		<input :placeholder="this.user.email" type="email" v-model="email" />
		<label>Password Change</label>
		<input placeholder="password" type="password" v-model="password" />
		<label>Confirm Password Change</label>
		<input
			placeholder="password"
			id="warningParent"
			type="password"
			v-model="passwordCheck"
		/>
		<label>Old Password</label>
		<input placeholder="password" type="password" v-model="oldPassword" />

		<base-button-vue text="Update" />
	</form> -->
</template>

<style lang="scss" scoped>
.accountInput {
	display: flex;
	margin: auto;
	flex-direction: column;
	max-width: fit-content;
}
</style>
