<script>
import axios from "../config/axiosConfig"
export default {
	name: "ButtonDelete",
	props: {
		table: {
			type: String,
			default: "posts"
		},
		id: {
			type: Number
		},
		postId: {
			type: Number
		}
	},
	methods: {
		async deleteCard(table) {
			await axios.delete(`${table}/${this.$props.id}`)
			table == "comments" ? location.reload() : this.$router.push("/")
		}
	}
}
</script>
<template>
	<button
		@click="deleteCard(this.table)"
		type="button"
		class="postCard__button--delete"
	>
		Delete
	</button>
</template>
<style></style>
