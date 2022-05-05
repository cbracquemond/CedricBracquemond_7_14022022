<script>
import axios from "../config/axiosConfig"
import ButtonDeleteVue from "../components/ButtonDelete.vue"
import ButtonLikeVue from "../components/ButtonLike.vue"
import InputCreateCommentVue from "../components/InputCreateComment.vue"
import PostCardsVue from "../components/PostCards.vue"
export default {
	name: "Post",
	components: {
		ButtonDeleteVue,
		ButtonLikeVue,
		InputCreateCommentVue,
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
			comments: []
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
	}
}
</script>

<template>
	<post-cards-vue
		:user="this.post.username"
		:date="this.dateString"
		:title="this.post.title"
		:content="this.post.content"
		:image-url="this.post.image_url"
	/>
	<input-create-comment-vue :post-id="this.post.id" />
	<button-like-vue :post-id="this.post.id" />
	<button-delete-vue
		v-if="post.user_id == this.user.id || this.user.is_moderator == 1"
		:id="post.id"
	/>
	<div v-for="comment in comments" :key="comment.id">
		<post-cards-vue
			:user="comment.username"
			:date="createDateString(comment.date)"
			:content="comment.content"
		/>
		<button-delete-vue
			v-if="comment.user_id == this.user.id || this.user.is_moderator == 1"
			:id="comment.id"
			table="comments"
			:post-id="this.post.id"
		/>
	</div>
</template>
<style></style>
