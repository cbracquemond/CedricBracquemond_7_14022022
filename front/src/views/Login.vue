<script>
import BaseButtonVue from "../components/BaseButton.vue"
import { mapActions } from "vuex"
export default {
	name: "Login",
	components: {
		BaseButtonVue
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
		<input
			placeholder="email"
			type="email"
			required
			v-model="credential.email"
		/>
		<input
			placeholder="password"
			type="password"
			required
			v-model="credential.password"
		/>
		<base-button-vue text="Log-in" />
	</form>
	<router-link to="/signup" class="nav-link">Sign-up </router-link>
</template>
<style></style>
