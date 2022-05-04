<script>
import PostCardsVue from "../components/PostCards.vue"
import axios from "../config/axiosConfig"
export default {
	name: "Post",
	components: {
		PostCardsVue
	},
	data() {
		return {
			content: "",
			date: "",
			title: "",
			username: "",
			imageUrl: "",
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
				this.content = response.data.post.content
				this.date = this.createDateString(response.data.post.post_time)
				this.title = response.data.post.title
				this.username = response.data.post.username
				this.imageUrl = response.data.post.image_url
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
		:user="this.username"
		:date="this.date"
		:title="this.title"
		:content="this.content"
		:imageUrl="this.imageUrl"
	/>
	<div v-for="comment in comments" :key="comment.id">
		<post-cards-vue
			:user="comment.username"
			:date="createDateString(comment.date)"
			:content="comment.content"
			:imageUrl="comment.image_url"
		/>
	</div>
</template>
<style></style>
