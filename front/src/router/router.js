import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home"
import Signup from "../views/Signup"
import Login from "../views/Login"
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
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (!store.state.identified) {
			next("/login")
		} else {
			next()
		}
	} else {
		next()
	}
})

export default router
