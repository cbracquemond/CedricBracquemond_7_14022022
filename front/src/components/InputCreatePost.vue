<script>
import axios from "../config/axiosConfig"
import BaseButtonVue from "./BaseButton.vue"
export default {
	name: "InputCreatePost",
	components: {
		BaseButtonVue
	},
	props: {
		text: {
			type: String
		}
	},
	emits: ["sendFormInput"],
	data() {
		return {
			title: "",
			content: ""
		}
	},
	methods: {
		async sendEvent() {
			// this.$emit("sendFormInput", this.input)
			try {
				await axios.post("posts/", {
					title: this.title,
					content: this.content
				})
			} catch (error) {
				console.log(error)
			}
		}
	}
}
</script>
<template>
	<div>
		<p>Create a post</p>
		<form class="baseInput" @submit.prevent="sendEvent">
			<p>Title</p>
			<input type="text" v-model="title" label="title" />
			<p>Content</p>
			<textarea type="text" v-model="content" name="content"></textarea>
			<base-button-vue text="Post" />
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
