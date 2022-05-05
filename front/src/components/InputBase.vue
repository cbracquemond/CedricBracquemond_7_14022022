<script>
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputBase",
	components: {
		ButtonBaseVue
	},
	props: {
		type: {
			type: String,
			default: "text"
		},
		prompt: {
			type: String
		},
		buttonText: {
			type: String,
			default: "Apply"
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
		<slot>
			<span>{{ prompt }}</span>
			<button-base-vue type="button" text="Update" />
		</slot>
		<form class="base-input" @submit="sendEvent">
			<input :type="type" v-model="input" />
			<button-base-vue :text="buttonText" />
		</form>
	</div>
</template>
<style></style>
