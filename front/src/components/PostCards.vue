<script>
export default {
	name: "postCard",
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
		}
	}
}
</script>
<template>
	<div class="post_card">
		<h2 v-if="title != ''">{{ title }}</h2>
		<span>Posté le {{ date }} par {{ user }}</span>
		<p>{{ content }}</p>
		<img
			v-if="imageUrl != null"
			:src="imageUrl"
			alt="Post image"
			class="post_card__image"
		/>
	</div>
</template>
<style></style>
