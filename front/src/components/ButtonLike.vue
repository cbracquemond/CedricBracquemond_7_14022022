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
			likesModifier: 0
		}
	},
	computed: {
		likeTotal() {
			return this.$props.likesCounter + this.likesModifier
		}
	},
	methods: {
		async likePost() {
			axios
				.post(`posts/${this.$props.postId}/like`)
				.then((response) => {
					response.data.likesCount == "+1"
						? (this.likesModifier = this.likesModifier + 1)
						: (this.likesModifier = this.likesModifier - 1)
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
		/><span class="button-label">Like ({{ likeTotal }}) </span>
	</div>
</template>
<style scoped lang="scss"></style>
