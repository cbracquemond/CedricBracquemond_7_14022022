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
	<form class="login_form" @submit.prevent="handleSubmit">
		<img
			src="../assets/icon-above-font.png"
			alt="Groupomania icon"
			class="login_form__logo"
		/>
		<input
			placeholder="email"
			type="email"
			required
			v-model="credential.email"
			class="login_form__input"
		/>
		<input
			placeholder="password"
			type="password"
			required
			v-model="credential.password"
			class="login_form__input"
		/>
		<button-base-vue text="Log-in" />
	</form>
	<router-link to="/signup" class="nav-link">Sign-up </router-link>
</template>

<style scoped lang="scss"></style>
