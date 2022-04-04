<script>
export default {
	name: "postCard",
	props: {
		title: {
			type: String,
			required: true,
			default: "Title"
		},
		date: {
			type: String,
			required: true,
			default: "01 / 01 / 2022"
		},
		user: {
			type: String,
			required: true,
			default: "User"
		},
		content: {
			type: String,
			required: true,
			default: "Text"
		}
	}
}
</script>
<template>
	<div class="postCard">
		<h2>{{ title }}</h2>
		<span>Posté le {{ date }} par {{ user }}</span>
		<p>{{ content }}</p>
	</div>
</template>
<style></style>
