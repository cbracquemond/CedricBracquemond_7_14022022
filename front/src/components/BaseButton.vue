<script>
export default {
	name: "BaseButton",
	props: {
		text: {
			type: String,
			required: true
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
