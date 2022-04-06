<script>
export default {
	name: "NavBar"
}
</script>
<template>
	<div class="nav">
		<ul>
			<router-link to="/" class="nav-link"><li>Home</li></router-link>
			<router-link to="/signup" class="nav-link"><li>Sign-up</li></router-link>
			<router-link to="/login" class="nav-link"><li>Login</li></router-link>
			<li><a href="#" class="nav-link">Contact Us</a></li>
		</ul>
	</div>
</template>
<style scoped>
.nav {
	background: #000;
	height: 60px;
}

.nav li {
	display: inline-block;
	list-style: none;
	height: 60px;
	line-height: 60px;
	padding: 0 40px;
}

.nav li:hover {
	background: red;
	transition: background 0.3s;
}

.nav-link {
	color: #fff;
	text-decoration: none;
}
</style>
