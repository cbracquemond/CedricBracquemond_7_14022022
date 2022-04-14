<script>
import AccountInputVue from "../components/AccountInput.vue"
import axios from "../config/axiosConfig"
export default {
	name: "Account",
	components: {
		AccountInputVue
	},
	data() {
		return {}
	},
	created() {
		axios
			.get("posts")
			.then((response) => {
				this.posts = response.data.posts
			})
			.catch((err) => {
				throw err
			})
	}
}
</script>
<template>
	<account-input-vue placeholder="" />
</template>
<style></style>
