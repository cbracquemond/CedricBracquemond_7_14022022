<script>
import InputCreatePostVue from "../components/InputCreatePost.vue"
import PostCardsVue from "../components/PostCards.vue"
import axios from "../config/axiosConfig"
export default {
	name: "Home",
	components: {
		InputCreatePostVue,
		PostCardsVue
	},
	data() {
		return {
			posts: []
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
	async beforeCreate() {
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
	<router-link v-for="post in posts" :key="post.id" :to="`/post/` + post.id">
		<post-cards-vue
			:title="post.title"
			:date="createDateString(post.post_time)"
			:content="post.content"
			:user="post.username"
			:imageUrl="post.image_url"
		/>
	</router-link>
</template>
<style></style>
