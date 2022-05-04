<script>
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputDeleteAccount",
	components: {
		ButtonBaseVue
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
	emits: ["sendFormInput"],
	data() {
		return {
			input: ""
		}
	},
	methods: {
		sendEvent() {
			this.$emit("sendFormInput", this.input)
		}
	}
}
</script>
<template>
	<div>
		<button-base-vue text="Delete account" />
		<form class="baseInput" @submit="sendEvent">
			<input :type="type" v-model="input" />
			<button-base-vue text="Confirm" />
		</form>
	</div>
</template>
<style></style>
