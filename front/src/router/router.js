import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home"
import Signup from "../views/Signup"
import Login from "../views/Login"
import Post from "../views/Post"
import Account from "../views/Account"
import store from "../store/store"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/signup",
		name: "Signup",
		component: Signup
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/post/:id",
		name: "Post",
		component: Post,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/account",
		name: "Account",
		component: Account,
		meta: {
			requiresAuth: true
		}
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!store.getters["authenticated"]) {
			next("/login")
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
