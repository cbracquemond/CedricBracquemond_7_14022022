<script>
import ButtonDeleteVue from "./ButtonDelete.vue"
import ButtonLikeVue from "./ButtonLike.vue"
export default {
	name: "ButtonContainer",
	components: {
		ButtonDeleteVue,
		ButtonLikeVue
	},
	props: {
		post: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			user: this.$store.state.user
		}
	}
}
</script>
<template>
	<div class="post-button-container">
		<button-like-vue class="post-button" :postId="post.id" />
		<button-delete-vue
			class="post-button"
			v-if="post.user_id == this.user.id || this.user.is_moderator == 1"
			:id="post.id"
		/>
	</div>
</template>
<style scoped lang="scss">
.post-button-container {
	display: flex;
	align-items: center;
}
.post-button {
	margin-right: 16px;
	display: flex;
}
</style>
