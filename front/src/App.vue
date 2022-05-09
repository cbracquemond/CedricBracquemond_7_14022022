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
	width: 100vw;
}

html {
	position: absolute;
	background-color: #dae0e6;
	font-size: 16px;
	height: 100%;
	width: 100vw;
}
#app {
	background-color: #dae0e6;
	color: #2c3e50;
	font-family: verdana, arial, helvetica, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	position: absolute;
	margin: 76px 0 0;
	height: 100%;
	width: 100%;
}

*,
*:before,
*:after {
	box-sizing: border-box;
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

textarea {
	height: 160px;
	width: 100%;
	margin: 0 0 16px;
	border: 1px solid #edeff1;
	border-radius: 4px;
	background-color: #f6f7f8;
	resize: none;
	outline: none;
	&:hover,
	&:focus {
		background-color: #fff;
		border: 1px solid #fd2d01;
	}
}

.button-label {
	margin: auto 0;
	height: fit-content;
	font-size: 12px;
	font-weight: bold;
	color: #878a8c;
}
</style>
