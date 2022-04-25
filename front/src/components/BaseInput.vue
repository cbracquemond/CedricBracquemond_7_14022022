<script>
import BaseButtonVue from "./BaseButton.vue"
export default {
	name: "BaseInput",
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
		<form class="baseInput" @submit.prevent="sendEvent">
			<input :type="type" v-model="input" />
			<base-button-vue text="Apply" />
		</form>
	</div>
</template>
<style></style>
