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
		}
	},
	computed: {
		currentRouteName() {
			return this.$route.name
		}
	},
	methods: {
		async deleteCard(table) {
			if (confirm("Are you sure you want to delete this post?")) {
				await axios.delete(`${table}/${this.$props.id}`)
				alert("Your post has been deleted")
				if (
					table == "comments" ||
					this.currentRouteName.indexOf("Home") != -1
				) {
					location.reload()
				}
				if (this.currentRouteName.indexOf("Post") != -1) this.$router.push("/")
			}
		}
	}
}
</script>
<template>
	<button type="button" @click="deleteCard(this.table)">
		<img
			class="trashcan-button"
			src="../assets/trashcan.svg"
			alt="Delete button"
		/>
		<span class="button-label">Delete</span>
	</button>
</template>
<style scoped lang="scss">
button {
	height: 20px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-right: 16px;
	border: none;
	background-color: #fff;
	& img {
		height: 100%;
	}
}
</style>
