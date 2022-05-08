<script>
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputBase",
	components: {
		ButtonBaseVue
	},
	emits: ["sendFormInput", "setImage"],
	props: {
		src: {
			type: String
		}
	},
	data() {
		return {
			image: null,
			imagesrc: this.src
		}
	},
	computed: {
		currentRouteName() {
			return this.$route.name
		}
	},
	methods: {
		applyImage() {
			this.$emit("sendFormInput", this.image)
		},
		handleImage(event) {
			const file = event.target.files[0]
			if (file) {
				const reader = new FileReader()
				reader.readAsDataURL(file)
				reader.onload = (event) => {
					this.imagesrc = event.target.result
				}
				this.image = file
				this.$emit("setImage", this.image)
			}
		}
	}
}
</script>
<template>
	<div>
		<form class="img-form" @submit="applyImage">
			<div class="img-form__container">
				<img
					:src="imagesrc"
					alt="Profile Picture"
					class="img-form__img"
					@click="$refs.file.click()"
				/>
			</div>
			<input
				class="img-form__input"
				ref="file"
				type="file"
				name="image_input"
				@change="handleImage"
			/>
			<button-base-vue
				class="img-form__button"
				v-if="currentRouteName.indexOf('Account') != -1"
				text="Apply"
			/>
		</form>
	</div>
</template>
<style lang="scss" scoped>
.img-form {
	display: flex;
	flex-direction: column;
	align-items: center;

	&__input {
		display: none;
	}

	&__container {
		width: 150px;
		height: 150px;
		overflow: hidden;
		-webkit-border-radius: 50%;
		-moz-border-radius: 50%;
		-ms-border-radius: 50%;
		-o-border-radius: 50%;
		border-radius: 50%;
	}
	&__button {
		margin-top: 8px;
		background-color: #fd2d01;
		border: none;
		display: block;
		color: #fff;
	}
}
</style>
