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
		bindImage(event) {
			this.image = event
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
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>
<template>
	<div class="signup_form__container">
		<form class="signup_form" @submit.prevent="handleSubmit">
			<input-image-vue :src="imagesrc" @setImage="bindImage" />
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
				class="signup_form__input"
				placeholder="Username"
				type="text"
				required
				v-model="username"
			/>
			<input
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
			<button-base-vue text="Confirm" />
		</form>
		<div class="signup_form__nav-link">
			<p>Already a member?</p>
			<router-link to="/login">Login</router-link
			><span> to browse our content</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
button {
	border: none;
	display: block;
	width: 70%;
	height: 60px;
	background-color: #fd2d01;
	border-radius: 50px;
	color: #fff;
	font-weight: bold;
	text-transform: uppercase;
	text-align: center;
	font-size: 18px;
	-webkit-transition: all 0.2s ease;
	transition: all 0.2s ease;
	position: relative;
	cursor: pointer;
	margin-bottom: 16px;
}
.image_preview {
	width: 300px;
	min-height: 100px;
	border: 2px solid lightgray;
	margin-top: 15px;

	&__image {
		width: 100%;
	}
}
.signup_form {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
	padding: 20px;
	width: 100%;

	&__container {
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 80vw;
		position: relative;
		top: 50%;
		-webkit-transform: translateY(-50%);
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	&__input {
		display: block;
		box-sizing: border-box;
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
			border-color: #fd2d01;
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
