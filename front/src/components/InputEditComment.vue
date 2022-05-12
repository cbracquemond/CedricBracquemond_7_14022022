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
		<form class="base-input" @submit="editComment">
			<textarea name="edit" v-model="input"> </textarea>
			<button-base-vue text="Save Edits" />
		</form>
	</div>
</template>
<style scoped lang="scss">
button {
	border: 2px solid #da3338;
	background-color: #fff;
	color: #da3338;
	width: auto;
}
</style>
