<script>
import BaseButtonVue from "./BaseButton.vue"
export default {
	name: "AccountInput",
	components: {
		BaseButtonVue
	},
	props: {
		placeholder: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: "text"
		},
		vmodel: {
			type: String,
			required: true
		}
	}
}
</script>
<template>
	<div class="accountInput">
		<input :placeholder="placeholder" :type="type" :v-model="vmodel" />
		<base-button-vue text="Update" />
	</div>
</template>
<style></style>
