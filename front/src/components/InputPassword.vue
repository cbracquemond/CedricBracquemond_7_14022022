<script>
import BaseButtonVue from "./BaseButton.vue"
export default {
	name: "InputPassword",
	components: {
		BaseButtonVue
	},
	props: {
		type: {
			type: String,
			default: "text"
		},
		text: {
			type: String
		}
	},
	emits: ["sendFormInput"],
	data() {
		return {
			newPassword: "",
			passwordCheck: ""
		}
	},
	methods: {
		confirmNewPassword() {
			if (this.newPassword != this.passwordCheck) {
				const warningParent = document.querySelector("#warningParent")
				const warning = document.createElement("p")
				warning.innerText = "Password does not match"
				warning.classList.add("warning")
				warningParent.appendChild(warning)
				return false
			}
		},
		sendEvent() {
			if (this.confirmNewPassword() == false) return
			this.$emit("sendFormInput", this.newPassword)
		}
	}
}
</script>
<template>
	<div>
		<span>{{ text }}</span>
		<base-button-vue type="button" text="Update" />
		<form class="passwordInput" @submit.prevent="sendEvent">
			<p>New password</p>
			<input :type="type" v-model="newPassword" />
			<p id="warningParent">Confirm password</p>
			<input type="password" v-model="passwordCheck" />
			<base-button-vue text="Apply" />
		</form>
	</div>
</template>
<style></style>
