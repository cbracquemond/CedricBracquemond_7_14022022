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
		bindImage(event) {
			this.image = event.target.files[0]
		},
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
		async handleSubmit() {
			this.checkPassword()
			const user = {
				first_name: this.firstName,
				last_name: this.lastName,
				username: this.username,
				email: this.email,
				password: this.password
			}
			const data = new FormData()
			data.append("user", JSON.stringify(user))
			data.append("image", this.image)
			for (let value of data.values()) {
				console.log(value)
			}
			try {
				await axios.post("users", data, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
				this.$router.push("/login")
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>
<template>
	<form class="signup_form" @submit.prevent="handleSubmit">
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
		<label id="warningParent">Password confirmation</label>
		<input type="password" required v-model="passwordCheck" />
		<input type="file" name="image_input" @change="bindImage" />
		<base-button-vue text="Validation" />
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
