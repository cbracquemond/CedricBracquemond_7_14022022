<script>
export default {
	name: "ButtonBase",
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
<style scoped lang="scss">
button {
	display: block;
	height: 40px;
	width: 80px;
	border-radius: 9999px;
	font-weight: bold;
	text-transform: uppercase;
	text-align: center;
	font-size: 14px;
	cursor: pointer;
}
</style>
