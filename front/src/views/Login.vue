<script>
import ButtonBaseVue from "../components/ButtonBase.vue"
import { mapActions } from "vuex"
export default {
	name: "Login",
	components: {
		ButtonBaseVue
	},
	data() {
		return {
			credential: {
				email: "",
				password: ""
			}
		}
	},
	methods: {
		...mapActions(["login"]),
		async handleSubmit() {
			this.login(this.credential)
				.then(() => {
					this.$router.push("/")
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}
}
</script>
<template>
	<div class="login">
		<form class="login__form" @submit.prevent="handleSubmit">
			<svg
				data-v-1084b650=""
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 300 300"
				aria-labelledby="svgTitle"
				role="img"
			>
				<title id="svgTitle">Groupomania logo</title>
				<rect
					data-v-1084b650=""
					fill="#FFFFFF"
					x="0"
					y="0"
					width="300px"
					height="300px"
					class="logo-background-square"
				></rect>
				<!---->
				<!---->
				<g
					data-v-1084b650=""
					id="640fb903-7c97-3a8b-d0a7-369102908d0a"
					fill="#FFD7D7"
					stroke="none"
					transform="matrix(0.8499999999999999,0,0,0.8499999999999999,22.500006484985377,22.50005836486818)"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="-205 207 100 100">
						<switch>
							<g>
								<path
									d="M-155 298.8c11.2 0 21.7-4.3 29.6-12.2 7.9-7.9 12.2-18.4 12.2-29.6 0-11.2-4.3-21.7-12.2-29.6-7.9-7.9-18.4-12.2-29.6-12.2s-21.7 4.3-29.6 12.2c-7.9 7.9-12.2 18.4-12.2 29.6 0 11.2 4.3 21.7 12.2 29.6 7.9 7.9 18.4 12.2 29.6 12.2zm2.4-7.1c-.8.1-1.6.1-2.4.1-1.1 0-2.2-.1-3.3-.2-3.6-5.6-6.3-11.6-7.9-17.9h17.7c.6 1.5 1.7 2.9 3 3.8-1.7 5-4.1 9.7-7.1 14.2zm9.5-2c1.9-3.5 3.4-7 4.6-10.7 2.9-.6 5.2-2.6 6.3-5.3h7.7c-4 7.3-10.7 13-18.6 16zm22.8-32.7c0 3.3-.5 6.5-1.3 9.6h-10.8c-.6-1.3-1.6-2.5-2.8-3.4.2-2.2.3-4.4.3-6.6 0-3.1-.2-6.2-.6-9.2h13.8c1 3 1.4 6.3 1.4 9.6zm-4.2-16.7h-12.2c-1.3-5.5-3.2-10.7-5.8-15.7 7.6 2.9 14 8.6 18 15.7zm-17.4 16.3c0 1.7-.1 3.4-.2 5.1-2.8.6-5.1 2.4-6.2 4.9h-19.3c-.4-3-.7-6.1-.7-9.1 0-1.9.1-3.8.3-5.7 2.6-.5 4.7-2.2 6-4.4h19.5c.4 3 .6 6.1.6 9.2zm-15.7-34.2c.9-.1 1.8-.1 2.6-.1 1 0 2 0 3 .1 3.6 5.6 6.3 11.6 7.9 17.9h-17.4c-.6-1.7-1.7-3.2-3.1-4.3 1.8-4.8 4.1-9.3 7-13.6zm-9.5 2c-1.7 3.2-3.2 6.6-4.4 10-3.1.6-5.6 2.9-6.6 5.8h-7.3c3.9-7.1 10.4-12.8 18.3-15.8zm-22.6 32.6c0-3.3.5-6.6 1.4-9.6h10.9c.6 1.1 1.5 2.1 2.5 2.9-.2 2.4-.4 4.8-.4 7.2 0 3.1.2 6.1.6 9.1h-13.6c-1-3.1-1.4-6.3-1.4-9.6zm16.2 16.6c1.3 5.4 3.2 10.7 5.8 15.7-7.6-3-13.9-8.6-17.8-15.7h12z"
								></path>
							</g>
						</switch>
					</svg>
				</g>
			</svg>
			<input
				placeholder="email"
				type="email"
				required
				v-model="credential.email"
				class="login__form__input"
			/>
			<input
				placeholder="password"
				type="password"
				required
				v-model="credential.password"
				class="login__form__input"
			/>
			<button-base-vue text="Log-in" />
		</form>
		<div class="login__form__nav-link">
			<p>Not a member?</p>
			<router-link to="/signup">Create an Account </router-link>
		</div>
	</div>
</template>

<style scoped lang="scss">
svg {
	border-radius: 1rem;
}

a,
a:link,
a:visited,
a:active {
	color: #3ca9e2;
	-webkit-transition: all 0.2s ease;
	transition: all 0.2s ease;
}
a:focus,
a:hover,
a:link:focus,
a:link:hover,
a:visited:focus,
a:visited:hover,
a:active:focus,
a:active:hover {
	color: #329dd5;
	-webkit-transition: all 0.2s ease;
	transition: all 0.2s ease;
}

button {
	border: none;
	display: block;
	height: 60px;
	background-color: #fd2d01;
	border-radius: 4px;
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

	&:hover {
		background-color: #329dd5;
		-webkit-transition: all 0.2s ease;
		transition: all 0.2s ease;
	}
}
.login {
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);
	padding: 20px 0 0 0;
	margin: auto;
	width: 80vw;
	position: relative;
	top: 50%;
	-webkit-transform: translateY(-50%);
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);

	&__form {
		margin: auto;
		padding: 0 60px;

		display: flex;
		flex-direction: column;

		&__input {
			display: block;
			box-sizing: border-box;
			height: 60px;
			width: 100%;
			outline: none;
			line-height: 60px;
			border-radius: 4px;
			width: 100%;
			padding: 0 0 0 10px;
			margin: 0 0 16px;
			color: #8a8b8e;
			border: 1px solid #c2c0ca;
			font-style: normal;
			font-size: 16px;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			position: relative;
			display: inline-block;
			background: none;

			&:focus {
				border-color: #fd2d01;
			}
		}

		&__nav-link {
			display: flex;
			flex-direction: column;
			background-color: #eeedf1;
			color: #8a8b8e;
			font-size: 14px;
			width: 100%;
			padding: 10px 0;
			border-radius: 0 0 4px 4px;
			text-align: center;
		}
	}
}
</style>
