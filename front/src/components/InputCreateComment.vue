<script>
import axios from "../config/axiosConfig"
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputCreatePost",
	components: {
		ButtonBaseVue
	},
	props: {
		postId: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			content: ""
		}
	},
	methods: {
		async sendNewComment() {
			try {
				await axios.post("comments/" + this.postId, { content: this.content })
				location.reload()
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>
<template>
	<div>
		<form class="comment_input" @submit.prevent="sendNewComment">
			<textarea
				placeholder="Leave a comment"
				type="text"
				v-model="content"
				name="content"
			></textarea>
			<button-base-vue text="Comment" />
		</form>
	</div>
</template>
<style scoped lang="scss">
textarea {
	height: 10rem;
	width: 20rem;
	resize: none;
}
</style>
