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
				id: 0
			},
			dateString: "",
			comments: [],
			showCreateComment: false
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
	async mounted() {
		await axios
			.get("posts/" + this.$route.params.id)
			.then((response) => {
				this.dateString = this.createDateString(response.data.post.post_time)
				this.post = response.data.post
			})
			.catch((err) => {
				throw err
			})
		await axios.get("comments/" + this.$route.params.id).then((response) => {
			this.comments = response.data.comments
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
			<button-delete-vue
				class="comment-container__button"
				v-if="comment.user_id == this.user.id || this.user.is_moderator == 1"
				:id="comment.id"
				table="comments"
				:post-id="this.post.id"
			/>
			<input-edit-comment-vue :comment="comment" />
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
		margin: 0 16px 0 8px;
		display: flex;
	}
}
</style>
