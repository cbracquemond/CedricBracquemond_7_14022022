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
		<button-base-vue type="button" text="Update" />
		<form class="baseInput" @submit.prevent="sendEvent">
			<input :type="type" v-model="input" />
			<button-base-vue text="Apply" />
		</form>
	</div>
</template>
<style></style>
