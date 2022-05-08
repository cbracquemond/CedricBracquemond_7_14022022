<script>
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputBase",
	components: {
		ButtonBaseVue
	},
	props: {
		type: {
			type: String,
			default: "text"
		},
		text: {
			type: String
		},
		value: {
			type: String
		},
		buttonClass: {
			type: String,
			default: "base-input__button"
		},
		firstButtonText: {
			type: String,
			default: "Change"
		},
		secondButtonText: {
			type: String,
			default: "Apply"
		}
	},
	emits: ["sendFormInput"],
	data() {
		return {
			input: "",
			showInput: false
		}
	},

	methods: {
		sendEvent() {
			this.$emit("sendFormInput", this.input)
		}
	}
}
</script>
<template>
	<div class="base-input">
		<div class="base-input__container">
			<div v-if="this.text != null" class="base-input__text-container">
				<p class="base-input__text">{{ text }}</p>
				<p class="base-input__value">{{ value }}</p>
			</div>
			<button-base-vue
				type="button"
				:class="buttonClass"
				:text="firstButtonText"
				@click="showInput = !showInput"
			/>
		</div>
		<transition>
			<form
				v-show="showInput"
				class="base-input__container--hidden"
				@submit.prevent="sendEvent"
			>
				<input :type="type" v-model="input" />
				<button-base-vue
					class="base-input__button--apply"
					:text="secondButtonText"
				/>
			</form>
		</transition>
	</div>
</template>
<style scoped lang="scss">
input {
	height: 40px;
	border: 1px solid #edeff1;
	&:focus {
		border-color: #fd2d01;
		&-visible {
			outline: none;
		}
	}
}
.base-input {
	width: 100%;
	&__container {
		margin: 8px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		&--hidden {
			margin: 0;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}

	&__text {
		font-weight: bold;
	}
	&__value {
		font-size: 14px;
		color: #7c7c7c;
	}
	&__button {
		border: 2px solid #fd2d01;
		background-color: #fff;
		color: #fd2d01;

		&--apply {
			background-color: #fd2d01;
			border: none;
			color: #fff;
		}
		&--delete {
			width: 168px;
			background-color: #fd2d01;
			border: none;
			color: #fff;
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
