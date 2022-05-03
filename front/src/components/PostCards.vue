<script>
import ButtonBaseVue from "./ButtonBase.vue"
import axios from "../config/axiosConfig"
export default {
	name: "postCard",
	components: {
		ButtonBaseVue
	},
	props: {
		title: {
			type: String
		},
		date: {
			type: String,
			required: true
		},
		user: {
			type: String,
			required: true
		},
		content: {
			type: String
		},
		imageUrl: {
			type: String
		},
		postId: {
			type: Number,
			required: true
		}
	},
	methods: {
		async likePost() {
			await axios.post(`posts/${this.$props.postId}/like`)
		}
	}
}
</script>
<template>
	<div class="postCard">
		<h2>{{ title }}</h2>
		<span>Posté le {{ date }} par {{ user }}</span>
		<p>{{ content }}</p>
		<img
			v-if="imageUrl != null"
			:src="imageUrl"
			alt="Post image"
			class="postcard__image"
		/>
		<button-base-vue
			text="like"
			class="postCard__button"
			type="button"
			@click="likePost"
		/>
	</div>
</template>
<style></style>
