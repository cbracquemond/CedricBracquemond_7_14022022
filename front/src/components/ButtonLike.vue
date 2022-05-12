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
					console.log(error.response.data.message)
				})
		}
	}
}
</script>
<template>
	<button type="button" @click="likePost">
		<img
			class="thumbs-up-button"
			src="../assets/thumbs-up.svg"
			alt="Like button"
		/>
		<p class="button-label">Like ({{ likeTotal }})</p>
	</button>
</template>
<style scoped lang="scss">
button {
	height: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-right: 16px;
	border: none;
	background-color: #fff;
	& img {
		height: 100%;
	}
}
</style>
