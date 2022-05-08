<script>
import axios from "../config/axiosConfig"
import store from "../store/store"
import { mapActions } from "vuex"
import ButtonBaseVue from "../components/ButtonBase.vue"
import InputBaseVue from "../components/InputBase.vue"
import InputImageVue from "../components/InputImage.vue"
import InputPasswordVue from "../components/InputPassword.vue"

export default {
	name: "Account",
	components: {
		ButtonBaseVue,
		InputBaseVue,
		InputImageVue,
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
				await axios.put("users/", data, {
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
				await axios.delete("users/")
			} catch (error) {
				console.log(error.message)
			}
			this.logout()
		}
	}
}
</script>

<template>
	<div class="account-form">
		<input-image-vue
			:src="this.user.image_url"
			@sendFormInput="handleUpdate($event)"
		/>
		<input-base-vue
			:text="'Username'"
			:value="this.user.username"
			@sendFormInput="handleUpdate($event, 'username')"
		/>
		<input-base-vue
			:text="'First name'"
			:value="this.user.first_name"
			@sendFormInput="handleUpdate($event, 'first_name')"
		/>
		<input-base-vue
			:text="'Last name'"
			:value="this.user.last_name"
			@sendFormInput="handleUpdate($event, 'last_name')"
		/>
		<input-base-vue
			:text="'Email'"
			:value="this.user.email"
			type="email"
			@sendFormInput="handleUpdate($event, 'email')"
		/>
		<input-password-vue
			text="Change password:"
			type="password"
			@sendFormInput="handleUpdate($event, 'password')"
		/>
		<input-base-vue
			button-text="confirm"
			type="password"
			@sendFormInput="handleDelete($event)"
		>
			<slot>
				<button-base-vue text="Delete account" />
			</slot>
		</input-base-vue>
	</div>
</template>

<style lang="scss" scoped>
.account-form {
	background-color: #fff;
	display: flex;
	margin: auto;
	flex-direction: column;
	align-items: center;
	width: 80vw;
	padding: 1rem;
}
</style>
