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
		<slot class="base-input">
			<span>{{ prompt }}</span>
			<button-base-vue type="button" class="base-input__button" text="Change" />
		</slot>
		<form class="base-input" @submit.prevent="sendEvent">
			<input :type="type" v-model="input" />
			<button-base-vue class="base-input__button--apply" :text="buttonText" />
		</form>
	</div>
</template>
<style></style>
