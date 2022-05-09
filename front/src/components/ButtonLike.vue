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
	<div @click="likePost">
		<img
			class="thumbs-up-button"
			src="../assets/thumbs-up.svg"
			alt="Like button"
		/><span class="button-label">Like</span>
	</div>
</template>
<style scoped lang="scss">
.thumbs-up-button {
	// filter: invert(94%) sepia(6%) saturate(2148%) hue-rotate(299deg) brightness(99%) contrast(104%);
}
</style>
