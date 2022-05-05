<script>
import axios from "../config/axiosConfig"
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputBase",
	components: {
		ButtonBaseVue
	},
	props: {
		comment: {
			type: Object
		}
	},
	emits: ["sendFormInput"],
	data() {
		return {
			input: this.comment.content
		}
	},
	methods: {
		async editComment() {
			await axios.put("comments/" + this.comment.id, { content: this.input })
		}
	}
}
</script>
<template>
	<div>
		<button-base-vue type="button" text="Edit" />
		<form class="base-input" @submit="editComment">
			<textarea name="edit" v-model="input"> </textarea>
			<button-base-vue text="Save Edits" />
		</form>
	</div>
</template>
<style></style>
