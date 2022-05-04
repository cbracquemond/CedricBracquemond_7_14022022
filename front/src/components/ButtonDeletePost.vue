<script>
import axios from "../config/axiosConfig"
export default {
	name: "ButtonDeletePost",
	props: {
		postId: {
			type: Number,
			required: true
		}
	},
	methods: {
		async deletePost() {
			await axios.delete(`posts/${this.$props.postId}`)
		}
	}
}
</script>
<template>
	<button @click="deletePost" type="button" class="postCard__button--delete">
		Delete
	</button>
</template>
<style></style>
