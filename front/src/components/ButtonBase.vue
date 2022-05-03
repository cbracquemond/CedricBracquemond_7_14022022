<script>
export default {
	name: "ButtonBase",
	props: {
		text: {
			type: String,
			required: false
		},
		type: {
			type: String,
			default: "submit"
		}
	}
}
</script>
<template>
	<button :type="type">{{ text }}</button>
</template>
<style></style>
