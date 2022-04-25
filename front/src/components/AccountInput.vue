<script>
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
		<span>{{ text }}</span>
		<base-button-vue type="button" text="Update" />
		<form class="accountInput" @submit.prevent="sendData">
			<slot name="label"></slot>
			<input :type="type" v-model="input" />
			<slot name="password-check"></slot>
			<base-button-vue text="Apply" />
		</form>
	</div>
</template>
<style></style>
