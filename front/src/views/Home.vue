<script>
import axios from "../config/axiosConfig"
import InputCreatePostVue from "../components/InputCreatePost.vue"
import PostCardsVue from "../components/PostCards.vue"
import ButtonLikeVue from "../components/ButtonLike.vue"
import ButtonDeleteVue from "../components/ButtonDelete.vue"
export default {
	name: "Home",
	components: {
		InputCreatePostVue,
		PostCardsVue,
		ButtonLikeVue,
		ButtonDeleteVue
	},
	data() {
		return {
			posts: [],
			user: this.$store.state.user
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
			.get("posts")
			.then((response) => {
				this.posts = response.data.posts
			})
			.catch((err) => {
				throw err
			})
	}
}
</script>

<template>
	<input-create-post-vue />
	<div class="router_link_countainer" v-for="post in posts" :key="post.id">
		<router-link :to="`/post/` + post.id">
			<post-cards-vue
				:title="post.title"
				:date="createDateString(post.post_time)"
				:content="post.content"
				:user="post.username"
				:imageUrl="post.image_url"
			/>
		</router-link>
		<button-like-vue :postId="post.id" />
		<button-delete-vue
			v-if="post.user_id == this.user.id || this.user.is_moderator == 1"
			:id="post.id"
		/>
	</div>
</template>
<style></style>
