<script>
import { mapActions } from "vuex"
export default {
	name: "NavBar",
	methods: {
		...mapActions(["logout"])
	}
}
</script>

<template>
	<ul class="nav">
		<router-link to="/" class="nav__link">
			<img src="../assets/icon.svg" alt="Groupomania logo" />
		</router-link>
		<div class="nav__container">
			<router-link to="/account" class="nav__link"
				><li>Account</li>
			</router-link>
			<router-link to="/login" @click="logout" class="nav__link">
				<li>Log Out</li>
			</router-link>
		</div>
	</ul>
</template>

<style lang="scss" scoped>
.nav {
	display: flex;
	justify-content: space-between;
	background: #fff;
	height: 60px;
	width: 100%;
	margin-bottom: 16px;
	box-shadow: 0px 30px 50px 0px rgba(0, 0, 0, 0.2);

	&__link {
		color: #000;
		text-decoration: none;
		padding: 0 16px;
		max-height: 60px;
		max-width: 120px;
		overflow: hidden;
		object-fit: cover;
		& img {
			width: 60px;
			height: 60px;
			object-fit: cover;
		}
	}

	&__container {
		display: flex;
		justify-content: space-around;
	}

	& ul {
		width: 100%;
	}

	& li {
		list-style: none;
		height: 60px;
		line-height: 60px;
		margin: auto;

		&:hover {
			background: red;
			transition: background 0.3s;
		}
	}
}
</style>
