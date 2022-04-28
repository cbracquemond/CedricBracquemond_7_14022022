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
			imageUrl: ""
		}
	},
	computed: {
		timestampToDateString() {
			const day = this.date.slice(8, 10)
			const month = this.date.slice(5, 7)
			const year = this.date.slice(0, 4)
			const hour = this.date.slice(11, 16)
			const date = "le " + day + "/" + month + "/" + year + " à " + hour
			return date
		}
	},
	async mounted() {
		await axios
			.get("posts/" + this.$route.params.id)
			.then((response) => {
				this.content = response.data.post[0].content
				this.date = response.data.post[0].post_time
				this.title = response.data.post[0].title
				this.username = response.data.post[0].username
				this.imageUrl = response.data.post[0].image_url
				console.log(response.data.post[0])
			})
			.catch((err) => {
				throw err
			})
	}
}
</script>

<template>
	<post-cards-vue
		:user="this.username"
		:date="timestampToDateString"
		:title="this.title"
		:content="this.content"
		:imageUrl="this.imageUrl"
	/>
</template>
<style></style>
