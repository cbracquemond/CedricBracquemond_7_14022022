<script>
import ButtonDeleteVue from "./ButtonDelete.vue"
import ButtonLikeVue from "./ButtonLike.vue"
export default {
	name: "ButtonContainer",
	components: {
		ButtonDeleteVue,
		ButtonLikeVue
	},
	props: {
		post: {
			type: Object,
			required: true
		}
	},
	emits: ["sendCommentEvent"],
	methods: {
		commentEvent() {
			this.$emit("sendCommentEvent")
		}
	},
	data() {
		return {
			user: this.$store.state.user
		}
	},
	mounted() {
		console.log(this.post)
	}
}
</script>
<template>
	<div class="post-button-container">
		<button-like-vue
			class="post-button"
			:postId="post.id"
			:likesCounter="post.likes"
		/>
		<div class="post-button" @click="commentEvent">
			<img
				class="comment-button"
				src="../assets/comment.svg"
				alt="Like button"
			/><span class="button-label">Comment</span>
		</div>
		<button-delete-vue
			class="post-button"
			v-if="post.user_id == this.user.id || this.user.is_moderator == 1"
			:id="post.id"
		/>
	</div>
</template>
<style scoped lang="scss">
.post-button-container {
	display: flex;
	align-items: center;
	margin: 16px 0 8px;
}
.post-button {
	height: 20px;
	cursor: pointer;
	display: flex;
	margin-right: 16px;
}
</style>
