<script>
import axios from "../config/axiosConfig"
import ButtonContainerVue from "../components/ButtonContainer.vue"
import ButtonDeleteVue from "../components/ButtonDelete.vue"
import InputCreateCommentVue from "../components/InputCreateComment.vue"
import InputEditCommentVue from "../components/InputEditComment.vue"
import PostCardsVue from "../components/PostCards.vue"
export default {
	name: "Post",
	components: {
		ButtonContainerVue,
		ButtonDeleteVue,
		InputCreateCommentVue,
		InputEditCommentVue,
		PostCardsVue
	},
	data() {
		return {
			user: this.$store.state.user,
			post: {
				username: "",
				user_id: 0,
				title: "",
				content: "",
				image_url: "",
				id: 0,
				likes: 0
			},
			dateString: "",
			comments: [],
			showCreateComment: false,
			showEditComment: false
		}
	},
	methods: {
		createDateString(timestamp) {
			const day = timestamp.slice(8, 10)
			const month = timestamp.slice(5, 7)
			const year = timestamp.slice(0, 4)
			const hour = timestamp.slice(11, 16)
			const date = "le " + day + "/" + month + "/" + year + " à " + hour
			return date
		}
	},
	mounted() {
		axios
			.get("posts/" + this.$route.params.id)
			.then((response) => {
				this.post = response.data.post
				this.dateString = this.createDateString(response.data.post.post_time)
			})
			.catch((error) => {
				console.log(error)
			})
		axios
			.get("comments/" + this.$route.params.id)
			.then((response) => {
				this.comments = response.data.comments
			})
			.catch((error) => {
				console.log(error)
			})
		/**
		 * Scroll to and display the createComment input if the comment button if
		 * the user came by clicking the comment button
		 */
		const section = this.$router.currentRoute.value.hash.replace("#", "")
		if (section) {
			this.$nextTick(() =>
				window.document.getElementById(section).scrollIntoView()
			)
			this.showCreateComment = true
		}
	}
}
</script>

<template>
	<div class="post-container">
		<post-cards-vue
			:user="this.post.username"
			:date="this.dateString"
			:title="this.post.title"
			:content="this.post.content"
			:image-url="this.post.image_url"
		/>
		<button-container-vue
			id="button-container"
			:post="post"
			@sendCommentEvent="showCreateComment = !showCreateComment"
		/>

		<input-create-comment-vue
			v-show="showCreateComment"
			class="createComment"
			:post-id="this.post.id"
		/>
		<div
			class="comment-container"
			v-for="comment in comments"
			:key="comment.id"
		>
			<post-cards-vue
				:user="comment.username"
				:date="createDateString(comment.date)"
				:content="comment.content"
			/>
			<div class="button-container">
				<div class="edit-button" @click="showEditComment = !showEditComment">
					<img
						class="edit-button__img"
						src="../assets/edit.svg"
						alt="edit button"
					/><span class="button-label">Edit</span>
				</div>
				<button-delete-vue
					class="comment-container__button"
					v-if="comment.user_id == this.user.id || this.user.is_moderator == 1"
					:id="comment.id"
					table="comments"
					:post-id="this.post.id"
				/>
			</div>
			<input-edit-comment-vue v-show="showEditComment" :comment="comment" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.post-container {
	background-color: #fff;
	padding: 8px;
}

.comment-container {
	&__button {
		height: 20px;
		cursor: pointer;
		display: flex;
	}
}
.button-container {
	display: flex;
	align-items: center;
	margin-bottom: 16px;
}

.edit-button {
	height: 20px;
	display: flex;
	margin-right: 16px;
	cursor: pointer;
	&__img {
		height: 100%;
		width: auto;
	}
}
</style>
