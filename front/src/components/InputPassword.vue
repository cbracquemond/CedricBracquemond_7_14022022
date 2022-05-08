<script>
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputPassword",
	components: {
		ButtonBaseVue
	},
	emits: ["sendFormInput"],
	data() {
		return {
			newPassword: "",
			passwordCheck: "",
			showInput: false
		}
	},
	methods: {
		//Check if both passwords are the same, then display a warning if not
		confirmNewPassword() {
			if (this.newPassword != this.passwordCheck) {
				const container = document.querySelector("#password-input")
				if (container.querySelectorAll(".warning").length != 0) return
				const warningParent = document.querySelector("#warningParent")
				const warning = document.createElement("p")
				warning.innerText = "Password does not match"
				warning.classList.add("warning")
				warningParent.appendChild(warning)
				return false
			}
		},
		sendEvent() {
			if (!this.confirmNewPassword()) return
			this.$emit("sendFormInput", this.newPassword)
		}
	}
}
</script>
<template>
	<div class="password-input" id="password-input">
		<div class="button-container">
			<p>Change password</p>
			<button-base-vue
				type="button"
				text="Change"
				@click="showInput = !showInput"
			/>
		</div>
		<transition>
			<form
				id="warningParent"
				class="form"
				@submit.prevent="sendEvent"
				v-show="showInput"
			>
				<input
					placeholder="New password"
					type="password"
					v-model="newPassword"
				/>
				<input
					placeholder="Confirm password"
					type="password"
					v-model="passwordCheck"
				/>
				<button-base-vue class="form__button" text="Apply" />
			</form>
		</transition>
	</div>
</template>
<style scoped lang="scss">
.warning {
	color: #fd2d01;
	font-weight: bold;
}

p {
	font-weight: bold;
}

.password-input {
	width: 100%;
}
.button-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 8px 0;

	& button {
		border: 2px solid #fd2d01;
		color: #fd2d01;
		display: block;
		height: 40px;
		width: 80px;
		background-color: #fff;
	}
}

.form {
	display: flex;
	flex-direction: column;
	align-items: center;
	&__button {
		background-color: #fd2d01;
		border: none;
		color: #fff;
	}
	& input {
		height: 40px;
		border: 1px solid #edeff1;
		margin-bottom: 8px;
		&:focus {
			border-color: #fd2d01;
			&-visible {
				outline: none;
			}
		}
	}
}
.v-enter-from {
	height: 0;
	opacity: 0;
}
.v-enter-to {
	height: 40px;
	opacity: 1;
}
.v-leave-from {
	height: 40px;
	opacity: 1;
}
.v-leave-to {
	height: 0;
	opacity: 0;
}
.v-enter-active,
.v-leave-active {
	transition: height 1s ease, opacity 0.5s ease-in;
}
</style>
