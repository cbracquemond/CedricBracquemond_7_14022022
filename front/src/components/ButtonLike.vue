<script>
import axios from "../config/axiosConfig"
export default {
	name: "ButtonLike",
	props: {
		postId: {
			type: Number,
			required: true
		},
		likesCounter: {
			type: Number
		}
	},
	data() {
		return {
			likesData: this.likesCounter
		}
	},
	methods: {
		async likePost() {
			axios
				.post(`posts/${this.$props.postId}/like`)
				.then((response) => {
					response.data.likesCount == "+1"
						? (this.likesData = this.likesData + 1)
						: (this.likesData = this.likesData - 1)
				})
				.catch((error) => {
					console.log(error)
				})
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
		/><span class="button-label">Like ({{ this.likesData }}) </span>
	</div>
</template>
<style scoped lang="scss"></style>
