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
		buttonText: {
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
		<slot>
			<div class="base-input__container">
				<div class="base-input__text-container">
					<p class="base-input__text">{{ text }}</p>
					<p class="base-input__value">{{ value }}</p>
				</div>
				<button-base-vue
					type="button"
					class="base-input__button"
					text="Change"
					@click="showInput = !showInput"
				/>
			</div>
		</slot>
		<transition>
			<form
				v-show="showInput"
				class="base-input__container"
				@submit.prevent="sendEvent"
			>
				<input :type="type" v-model="input" />
				<button-base-vue class="base-input__button--apply" :text="buttonText" />
			</form>
		</transition>
	</div>
</template>
<style scoped lang="scss">
.v-enter-from {
	height: 0px;
}
.v-enter-to {
	height: 40px;
}
.v-leave-from {
	height: 40px;
}
.v-leave-to {
	height: 0;
}
.v-enter-active,
.v-leave-active {
	transition: height 0.5s ease;
}
.base-input {
	width: 100%;
	&__container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		& input {
			height: 40px;
			border: 1px solid #edeff1;
			&:focus {
				border-color: #fd2d01;
				&-visible {
					outline: none;
				}
			}
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
		display: block;
		height: 40px;
		width: 80px;
		background-color: #fff;
		border-radius: 16px;
		color: #fd2d01;
		font-weight: bold;
		text-transform: uppercase;
		text-align: center;
		font-size: 14px;
		-webkit-transition: all 0.2s ease;
		transition: all 0.2s ease;
		position: relative;
		cursor: pointer;
		margin-bottom: 16px;

		&--apply {
			border: none;
			display: block;
			height: 40px;
			width: 80px;
			background-color: #fd2d01;
			border-radius: 16px;
			color: #fff;
			font-weight: bold;
			text-transform: uppercase;
			text-align: center;
			font-size: 14px;
			-webkit-transition: all 0.2s ease;
			transition: all 0.2s ease;
			position: relative;
			cursor: pointer;
			margin-bottom: 16px;
		}
	}
}
</style>
