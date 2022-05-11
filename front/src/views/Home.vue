<script>
import axios from "../config/axiosConfig"
import ButtonContainerVue from "../components/ButtonContainer.vue"
import InputCreatePostVue from "../components/InputCreatePost.vue"
import PostCardsVue from "../components/PostCards.vue"
export default {
	name: "Home",
	components: {
		ButtonContainerVue,
		InputCreatePostVue,
		PostCardsVue
	},
	data() {
		return {
			posts: [],
			user: this.$store.state.user
		}
	},
	methods: {
		createDateString(timestamp) {
			if (timestamp != null) {
				const day = timestamp.slice(8, 10)
				const month = timestamp.slice(5, 7)
				const year = timestamp.slice(0, 4)
				const hour = timestamp.slice(11, 16)
				const date = "le " + day + "/" + month + "/" + year + " à " + hour
				return date
			}
		},
		handleCommentButton(id) {
			this.$router.push("/post/" + id + "#button-container")
		}
	},
	mounted() {
		axios
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
	<div class="post-card-container" v-for="post in posts" :key="post.id">
		<div class="router-link-container">
			<router-link :to="`/post/` + post.id">
				<post-cards-vue
					:title="post.title"
					:date="createDateString(post.post_time)"
					:content="post.content"
					:user="post.username"
					:imageUrl="post.image_url"
				/>
			</router-link>
		</div>
		<button-container-vue
			:post="post"
			@sendCommentEvent="handleCommentButton(post.id)"
		/>
	</div>
</template>
<style scoped lang="scss">
a {
	text-decoration: none;
	color: #000;
}
.post-card-container {
	margin: 16px 0;
	padding: 8px;
	background-color: #fff;
}
.router-link-container {
	max-height: 280px;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
