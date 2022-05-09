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
			if (confirm("Are you sure you want to delete this post?")) {
				await axios.delete(`${table}/${this.$props.id}`)
				table == "comments" ? location.reload() : this.$router.push("/")
				location.reload()
				alert("Your post has been deleted")
			}
		}
	}
}
</script>
<template>
	<div>
		<img
			class="trashcan-button"
			src="../assets/trashcan.svg"
			alt="Delete button"
			@click="deleteCard(this.table)"
		/><span class="button-label">Delete</span>
	</div>
</template>
<style scoped lang="scss">
.trashcan-button {
	height: 20px;
	cursor: pointer;
}
</style>
