<script>
import axios from "../config/axiosConfig"
export default {
	name: "ButtonLike",
	props: {
		postId: {
			type: Number,
			required: true
		}
	},
	methods: {
		async likePost() {
			await axios.post(`posts/${this.$props.postId}/like`)
		}
	}
}
</script>
<template>
	<button @click="likePost" type="button" class="postCard__button">like</button>
</template>
<style></style>
