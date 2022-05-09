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
	},
	computed: {
		currentRouteName() {
			return this.$route.name
		}
	}
}
</script>
<template>
	<div class="post_card">
		<span>Posté le {{ date }} par {{ user }}</span>
		<h2 v-if="title != '' && currentRouteName.indexOf('Post') != 0">
			{{ title }}
		</h2>
		<h1 v-if="title != '' && currentRouteName.indexOf('Post') != -1">
			{{ title }}
		</h1>
		<p>{{ content }}</p>
		<img
			v-if="imageUrl != null"
			:src="imageUrl"
			alt="Post image"
			class="post_card__image"
		/>
	</div>
</template>
<style scoped lang="scss"></style>
