<script>
import axios from "../config/axiosConfig"
import BaseButtonVue from "./BaseButton.vue"
export default {
	name: "AccountInput",
	components: {
		BaseButtonVue
	},
	props: {
		type: {
			type: String,
			default: "text"
		},
		text: {
			type: String
		}
	},
	emits: ["updateChange"],
	data() {
		return {
			userId: this.$store.state.user.id,
			input: ""
		}
	},
	methods: {
		sendData() {
			this.$emit("updateChange", this.input)
		},
		async handleSubmit(param) {
			try {
				const paramKey = param
				await axios.put("users/" + this.userId, {
					[paramKey]: this.input
				})
			} catch (error) {
				console.log(error.message)
			}
		}
	}
}
</script>
<template>
	<div>
		<span>{{ text }}</span>
		<base-button-vue type="button" text="Update" />
		<form class="accountInput" @submit="sendData">
			<input :type="type" v-model="input" />
			<base-button-vue text="Apply" />
		</form>
	</div>
</template>
<style></style>
