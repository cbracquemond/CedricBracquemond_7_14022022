<script>
import NavBarVue from "./components/NavBar.vue"
import { mapGetters } from "vuex"
export default {
	components: {
		NavBarVue
	},
	computed: {
		...mapGetters(["authenticated"])
	}
}
</script>
<template>
	<nav-bar-vue v-if="authenticated == true" />
	<router-view />
</template>

<style lang="scss">
body {
	height: 100%;
	width: 100%;
}

html {
	position: absolute;
	background-color: #dae0e6;
	box-sizing: border-box;
	font-size: 16px;
	height: 100%;
	width: 100%;
}
#app {
	background-color: #dae0e6;
	color: #2c3e50;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	position: absolute;
	margin: 0;
	height: 100%;
	width: 100%;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
	margin: 0;
	padding: 0;
	font-weight: normal;
}

ol,
ul {
	list-style: none;
}

img {
	max-width: 100%;
	height: auto;
}
</style>
