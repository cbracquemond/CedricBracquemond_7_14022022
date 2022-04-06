<script>
export default {
	name: "postCard",
	props: {
		title: {
			type: String,
			required: true
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
			type: String,
			required: true
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
