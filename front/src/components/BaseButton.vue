<script>
export default {
	name: "BaseButton",
	props: {
		text: {
			type: String
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
