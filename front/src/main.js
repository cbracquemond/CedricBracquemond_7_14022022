import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/router"
import store from "./store/store"

store.dispatch("testToken", localStorage.getItem("token")).then(() => {
	createApp(App).use(store).use(router).mount("#app")
})
