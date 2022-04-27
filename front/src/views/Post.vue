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
			post: []
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
	async created() {
		await axios
			.get("posts/" + this.$route.params.id)
			.then((response) => {
				this.post = response.data.post[0]
			})
			.catch((err) => {
				throw err
			})
	}
}
</script>

<template>
	<post-cards-vue
		:date="createDateString(this.post.post_time)"
		:title="this.post.title"
		:content="this.post.content"
		:user="this.post.username"
	/>
</template>
<style></style>
