<script>
import axios from "../config/axiosConfig"
import store from "../store/store"
import { mapActions } from "vuex"
import InputBaseVue from "../components/InputBase.vue"
import InputImageVue from "../components/InputImage.vue"
import InputPasswordVue from "../components/InputPassword.vue"

export default {
	name: "Account",
	components: {
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
		displayWarning() {
			const warningParent = document.querySelector(".delete-input")
			if (warningParent.querySelectorAll(".warning").length != 0) return
			const warning = document.createElement("p")
			warning.innerText = "Incorrect password"
			warning.classList.add("warning")
			warningParent.appendChild(warning)
		},
		async checkPassword(event) {
			try {
				const passwordChecked = await axios.post("users/check/", {
					password: event
				})
				console.log(passwordChecked.data.check)
				passwordChecked.data.check ? this.handleDelete() : this.displayWarning()
			} catch (error) {
				console.log(error.message)
				return
			}
		},
		async handleDelete() {
			try {
				await axios.delete("users/")
			} catch (error) {
				console.log(error.message)
			}
			this.logout()
			this.$router.push("/login")
			alert("Account successfully deleted")
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
		<input-password-vue @sendFormInput="handleUpdate($event, 'password')" />
		<input-base-vue
			class="delete-input"
			button-class="base-input__button--delete"
			first-button-text="Delete account"
			second-button-text="confirm"
			type="password"
			@sendFormInput="checkPassword($event)"
		/>
	</div>
</template>

<style lang="scss" scoped>
.warning {
	color: #fd2d01;
}
.account-form {
	background-color: #fff;
	display: flex;
	margin: auto;
	flex-direction: column;
	align-items: center;
	width: 80vw;
	padding: 1rem;
}
.delete-input {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
