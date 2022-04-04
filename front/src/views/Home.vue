<script>
import PostCardsVue from "../components/PostCards.vue"
import axios from "../config/axiosConfig"
export default {
	name: "Home",
	components: {
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
	created() {
		axios
			.get("posts")
			.then((response) => {
				this.posts = response.data.posts
				console.log(this.posts)
			})
			.catch()
	}
}
</script>

<template>
	<post-cards-vue
		v-for="post in posts"
		:key="post.id"
		:title="post.title"
		:date="createDateString(post.post_time)"
		:content="post.content"
		:user="post.user"
	/>
</template>
