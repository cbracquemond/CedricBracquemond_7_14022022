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
			content: "",
			image: null
		}
	},
	methods: {
		bindImage(event) {
			this.image = event.target.files[0]
		},
		async sendEvent() {
			const post = {
				title: this.title,
				content: this.content
			}
			const data = new FormData()
			data.append("post", JSON.stringify(post))
			data.append("image", this.image)
			for (let value of data.values()) {
				console.log(value)
			}

			try {
				await axios.post("posts/", data, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
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
			<p>Image</p>
			<input type="file" name="image_input" @change="bindImage" />
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
