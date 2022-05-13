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
		<button
			type="button"
			class="edit-button"
			@click="showEditPost = !showEditPost"
			v-if="comment.user_id == this.user.id || this.user.is_moderator == 1"
		>
			<img
				class="edit-button__img"
				src="../assets/edit.svg"
				alt="edit comment button"
			/><span class="button-label">Edit</span>
		</button>
		<button type="button" class="post-button" @click="commentEvent">
			<img src="../assets/comment.svg" alt="Comment button" /><span
				class="button-label"
				>Comment</span
			>
		</button>
		<button-delete-vue
			class="post-button"
			v-if="post.user_id == this.user.id || this.user.is_moderator == 1"
			:id="post.id"
		/>
	</div>
</template>
<style scoped lang="scss">
.edit-button {
	height: 20px;
	display: flex;
	margin-right: 16px;
	border: none;
	background-color: #fff;
	&__img {
		height: 100%;
		width: auto;
	}
}
.post-button-container {
	display: flex;
	align-items: center;
	margin: 16px 0 8px;
}
.post-button {
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
