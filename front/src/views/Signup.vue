<script>
import ButtonBaseVue from "../components/ButtonBase.vue"
import InputImageVue from "../components/InputImage.vue"
import axios from "../config/axiosConfig"
export default {
	name: "Signup",
	components: {
		ButtonBaseVue,
		InputImageVue
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			passwordCheck: "",
			image: null,
			imagesrc: require("../assets/Default-profile-picture.jpg")
		}
	},
	methods: {
		handleDuplicata(message) {
			console.log(message)
			const input = message.split("'")[3].split("_").pop()
			const warningParent = document.getElementById("warningParent")
			const warning = document.createElement("p")
			warning.innerText = `This ${input} is already used`
			warning.classList.add("warning")
			warningParent.appendChild(warning)
		},

		bindImage(event) {
			this.image = event
		},

		checkPassword() {
			const allWarning = document.querySelectorAll(".warning")
			allWarning.forEach((warning) => {
				warning.remove()
			})
			if (this.password != this.passwordCheck) {
				const warningParent = document.getElementById("warningParent")
				const warning = document.createElement("p")
				warning.innerText = "Password does not match"
				warning.classList.add("warning")
				warningParent.appendChild(warning)
				return false
			}
			return true
		},

		async handleSubmit() {
			if (!this.checkPassword()) return
			const user = {
				firstName: this.firstName,
				lastName: this.lastName,
				username: this.username,
				email: this.email,
				password: this.password
			}
			const data = new FormData()
			data.append("user", JSON.stringify(user))
			data.append("image", this.image)
			try {
				await axios.post("users", data, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
				this.$router.push("/login")
				alert("Account successfully created, you can now login")
			} catch (error) {
				this.handleDuplicata(error.response.data.message)
				console.log(error.response.data.message)
			}
		}
	}
}
</script>
<template>
	<div class="container">
		<form class="signup_form" id="warningParent" @submit.prevent="handleSubmit">
			<input-image-vue :src="imagesrc" @sendFormInput="bindImage" />
			<input
				class="signup_form__input"
				placeholder="First Name"
				type="text"
				required
				v-model="firstName"
			/>
			<input
				class="signup_form__input"
				placeholder="Last Name"
				type="text"
				required
				v-model="lastName"
			/>
			<input
				id="warningUsername"
				class="signup_form__input"
				placeholder="Username"
				type="text"
				required
				v-model="username"
			/>
			<input
				id="warningEmail"
				class="signup_form__input"
				placeholder="Email"
				type="email"
				required
				v-model="email"
			/>
			<input
				class="signup_form__input"
				placeholder="Password"
				type="password"
				required
				v-model="password"
			/>
			<input
				class="signup_form__input"
				placeholder="Confirm Password"
				type="password"
				required
				v-model="passwordCheck"
			/>
			<button-base-vue class="full-button" text="Confirm" />
		</form>
		<div class="signup_form__nav-link">
			<p>Already a member?</p>
			<router-link to="/login">Login</router-link
			><span> to browse our content</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
.full-button {
	background-color: #da3338;
	border: none;
	color: #fff;
	margin-bottom: 16px;
	width: 70%;
	height: 60px;
}

.container {
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 100%;
}
.signup_form {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 4px;
	background-color: #fff;
	padding: 20px;
	width: 100%;

	&__input {
		display: block;
		height: 60px;
		width: 70%;
		outline: none;
		line-height: 60px;
		padding: 0 0 0 10px;
		margin: 0 0 16px;
		color: #8a8b8e;
		border: none;
		border-bottom: 2px solid #b0b3b9;
		font-style: normal;
		font-size: 16px;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		position: relative;
		background: none;

		&:focus {
			border-color: #da3338;
		}
	}
	&__nav-link {
		background-color: #eeedf1;
		color: #8a8b8e;
		font-size: 14px;
		width: 100%;
		padding: 10px 0;
		border-radius: 0 0 4px 4px;
		text-align: center;
	}
}
</style>
