<script>
export default {
	name: "NavBar",
	data() {
		return {
			user: this.$store.state.user,
			userIsIdentified: this.$store.state.identified
		}
	}
}
</script>

<template>
	<div class="nav">
		<ul>
			<router-link to="/" class="nav-link">
				<li>Home</li>
			</router-link>
			<div>
				<router-link to="/signup" class="nav-link"
					><li>Sign-up</li>
				</router-link>
				<router-link to="/login" class="nav-link">
					<li>Login</li>
				</router-link>
				<router-link
					:to="{
						name: 'Account',
						params: {
							id: this.user.id
						}
					}"
					class="nav-link"
					><li>Account</li>
				</router-link>
			</div>
		</ul>
	</div>
</template>

<style lang="scss" scoped>
.nav {
	background: #fff;
	height: 60px;

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

		&.nav-link {
			color: #000;
			text-decoration: none;
		}

		&:hover {
			background: red;
			transition: background 0.3s;
		}
	}
}
</style>
