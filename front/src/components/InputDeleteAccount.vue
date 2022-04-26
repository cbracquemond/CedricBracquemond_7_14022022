<script>
import BaseButtonVue from "./BaseButton.vue"
export default {
	name: "InputDeleteAccount",
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
		<base-button-vue text="Delete account" />
		<form class="baseInput" @submit.prevent="sendEvent">
			<input :type="type" v-model="input" />
			<base-button-vue text="Confirm" />
		</form>
	</div>
</template>
<style></style>
