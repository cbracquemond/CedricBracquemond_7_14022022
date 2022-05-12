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
				console.log(error.response.data.message)
			}
		}
	}
}
</script>

<template>
	<div class="comment-form">
		<form @submit.prevent="sendNewComment">
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
button {
	border: 2px solid #da3338;
	background-color: #fff;
	color: #da3338;
	width: auto;
}
.comment-form {
	margin: 16px 0;
}
</style>
