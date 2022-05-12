<script>
import store from "../store/store"

export default {
	name: "NavBar",
	methods: {
		logout() {
			localStorage.removeItem("token")
			store.commit("SET_TOKEN", null)
			store.commit("SET_USER", null)
			this.$router.push("login")
		}
	}
}
</script>

<template>
	<header>
		<ul class="nav">
			<router-link to="/" class="nav__link">
				<img src="../assets/groupomania-logo.svg" alt="Groupomania logo" />
			</router-link>
			<div class="nav__container">
				<router-link to="/account" class="nav__link"
					><li>Account</li>
				</router-link>
				<router-link to="/login" @click="this.logout" class="nav__link">
					<li>Log Out</li>
				</router-link>
			</div>
		</ul>
	</header>
</template>

<style lang="scss" scoped>
.nav {
	display: flex;
	justify-content: space-between;
	background: #fff;
	height: 60px;
	width: 100%;
	margin-bottom: 16px;
	position: fixed;
	top: 0;

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
