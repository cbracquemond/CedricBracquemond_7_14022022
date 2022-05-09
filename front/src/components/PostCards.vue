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
	<div class="post-card">
		<span>Posté le {{ date }} par {{ user }}</span>
		<h2
			v-if="title != '' && currentRouteName.indexOf('Post') != 0"
			class="post-card__title"
		>
			{{ title }}
		</h2>
		<h1
			v-if="title != '' && currentRouteName.indexOf('Post') != -1"
			class="post-card__title"
		>
			{{ title }}
		</h1>
		<div class="post-card__content">
			<p v-if="content != ''" class="post-card__article">{{ content }}</p>
			<img
				v-if="imageUrl != null"
				:src="imageUrl"
				alt="Post image"
				class="post-card__image"
			/>
		</div>
	</div>
</template>
<style scoped lang="scss">
span {
	color: #787c7e;
	font-size: 12px;
}

.post-card {
	background-color: #fff;
	&__content {
		height: 100%;
	}
	&__title {
		font-size: 24px;
		font-weight: bold;
		margin: 8px 0;
	}
	&__image {
		height: 100%;
		width: auto;
	}
	&__article {
		margin: 16px 0;
	}
}
</style>
