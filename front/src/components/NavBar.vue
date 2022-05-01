<script>
import { mapMutations } from "vuex"
export default {
	name: "NavBar",
	methods: {
		...mapMutations(["logout"])
	}
}
</script>

<template>
	<div class="nav">
		<ul>
			<router-link to="/" class="nav__link">
				<li>Home</li>
			</router-link>
			<div>
				<router-link to="/account" class="nav__link"
					><li>Account</li>
				</router-link>
				<router-link to="/login" @click="logout" class="nav__link">
					<li>Log Out</li>
				</router-link>
			</div>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.nav {
	background: #fff;
	height: 60px;

	&__link {
		color: #000;
		text-decoration: none;
	}

	& ul {
		display: flex;
		justify-content: space-between;
	}

	& li {
		display: inline-block;
		list-style: none;
		height: 60px;
		line-height: 60px;
		padding: 0 40px;

		&:hover {
			background: red;
			transition: background 0.3s;
		}
	}
}
</style>
