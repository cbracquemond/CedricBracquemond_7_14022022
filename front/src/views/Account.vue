<script>
import axios from "../config/axiosConfig"
import store from "../store/store"
import { mapActions } from "vuex"
import InputBaseVue from "../components/InputBase.vue"
import InputImageVue from "../components/InputImage.vue"
import InputDeleteAccountVue from "../components/InputDeleteAccount.vue"
import InputPasswordVue from "../components/InputPassword.vue"

export default {
	name: "Account",
	components: {
		InputBaseVue,
		InputImageVue,
		InputDeleteAccountVue,
		InputPasswordVue
	},
	data() {
		return {
			user: this.$store.state.user,
			image: null
		}
	},
	methods: {
		...mapActions(["logout"]),
		async handleUpdate(input, param) {
			const data = new FormData()
			if (typeof input === "string") {
				const user = { [param]: input }
				data.append("user", JSON.stringify(user))
			}
			if (typeof input === "object") data.append("image", input)
			try {
				await axios.put("users/" + this.user.id, data, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
				await store.dispatch("testToken", localStorage.getItem("token"))
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
	<img :src="this.user.image_url" alt="Profile Picture" />
	<input-image-vue @sendFormInput="handleUpdate($event)" />

	<input-base-vue
		:text="'Username: ' + this.user.username"
		@sendFormInput="handleUpdate($event, 'username')"
	/>
	<input-base-vue
		:text="'First name: ' + this.user.first_name"
		@sendFormInput="handleUpdate($event, 'first_name')"
	/>
	<input-base-vue
		:text="'Last name: ' + this.user.last_name"
		@sendFormInput="handleUpdate($event, 'last_name')"
	/>
	<input-base-vue
		:text="'Email: ' + this.user.email"
		type="email"
		@sendFormInput="handleUpdate($event, 'email')"
	/>
	<input-password-vue
		text="Change password:"
		type="password"
		@sendFormInput="handleUpdate($event, 'password')"
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
