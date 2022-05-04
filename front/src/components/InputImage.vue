<script>
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputBase",
	components: {
		ButtonBaseVue
	},
	emits: ["sendFormInput"],
	data() {
		return {
			image: null
		}
	},
	methods: {
		sendEvent() {
			this.$emit("sendFormInput", this.image)
		},
		bindImage(event) {
			this.image = event.target.files[0]
		}
	}
}
</script>
<template>
	<div>
		<form @submit="sendEvent">
			<input type="file" name="image_input" @change="bindImage" />
			<button-base-vue text="Apply" />
		</form>
	</div>
</template>
<style></style>
