<script>
import axios from "../config/axiosConfig"
import ButtonBaseVue from "./ButtonBase.vue"
export default {
	name: "InputCreatePost",
	components: {
		ButtonBaseVue
	},
	props: {
		text: {
			type: String
		}
	},
	data() {
		return {
			title: "",
			content: "",
			image: null,
			imagesrc: "",
			placeholder: "Create a post"
		}
	},
	methods: {
		displayCreatePost() {
			document.querySelector(".tabs__container").style.display = "block"
			this.placeholder = "Title"
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
				document.querySelector(".image__tabs__button").style.display = "none"
				document.querySelector(".image__tabs__img").style.display = "block"
			}
		},

		handleTabs(event) {
			if (event.target.className.includes("active")) return
			const currentTabs = document.querySelector(".active")
			currentTabs.className = currentTabs.className.replace(" active", "")
			event.target.className += " active"
			const tabsToShow = event.target.className.includes("article")
				? document.querySelector(".article__tabs")
				: document.querySelector(".image__tabs")
			const tabsToHide = event.target.className.includes("image")
				? document.querySelector(".article__tabs")
				: document.querySelector(".image__tabs")
			tabsToShow.style.display = "block"
			tabsToHide.style.display = "none"
		},
		async sendNewPost() {
			const post = {
				title: this.title,
				content: this.content
			}
			const data = new FormData()
			data.append("post", JSON.stringify(post))
			data.append("image", this.image)
			try {
				await axios.post("posts/", data, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
			} catch (error) {
				console.log(error.response.data.message)
			}
		}
	}
}
</script>
<template>
	<form class="createPostForm" @submit="sendNewPost">
		<input
			:placeholder="this.placeholder"
			class="createPostForm__title"
			type="text"
			v-model="title"
			label="title"
			@focus="displayCreatePost"
		/>

		<div class="tabs__container">
			<div class="tabs__label__container">
				<button
					type="button"
					class="article tabs__label active"
					@click="handleTabs"
				>
					Article
				</button>
				<button type="button" class="image tabs__label" @click="handleTabs">
					Image
				</button>
			</div>
			<textarea
				class="article__tabs tabs"
				type="text"
				v-model="content"
				name="content"
			></textarea>
			<div class="image__tabs tabs">
				<button-base-vue
					class="image__tabs__button"
					type="button"
					text="Upload"
					@click="$refs.file.click()"
				/>
				<img
					class="image__tabs__img"
					:src="imagesrc"
					alt="Post image"
					@click="$refs.file.click()"
				/>
				<input
					class="image__tabs__input"
					type="file"
					ref="file"
					name="image_input"
					@change="handleImage"
				/>
			</div>
			<button-base-vue text="Post" />
		</div>
	</form>
</template>
<style scoped lang="scss">
button {
	border: 2px solid #da3338;
	background-color: #fff;
	color: #da3338;
}

h1 {
	font-size: 16px;
	margin: 16px 0 8px;
}

.tabs {
	height: 160px;
	width: 100%;
	margin: 0 0 16px;
	border: 1px solid #edeff1;
	border-radius: 4px;
	background-color: #f6f7f8;
	&__container {
		display: none;
	}
	&__label {
		cursor: pointer;
		background-color: #ffd7d7;
		border: 1px solid #edeff1;
		height: 40px;
		line-height: 40px;
		width: 80px;
		text-align: center;
		color: #1c1c1c;
		&__container {
			display: flex;
			flex-direction: row;
		}
	}
	&:hover,
	&:focus {
		background-color: #ffffff;
		border: 1px solid #da3338;
	}
}
.article {
	&__tabs {
		resize: none;
		outline: none;
	}
}

.image {
	&__tabs {
		position: relative;
		display: none;
		&__button {
			margin: 0;
			margin: 0;
			position: absolute;
			top: 50%;
			left: 50%;
			-ms-transform: translate(-50%, -50%);
			transform: translate(-50%, -50%);
		}
		&__input {
			display: none;
		}
		&__img {
			display: none;
			cursor: pointer;
			height: 100%;
			width: auto;
			position: absolute;
			left: 50%;
			-ms-transform: translate(-50%, 0);
			transform: translate(-50%, 0);
		}
	}
}

.createPostForm {
	background-color: #fff;
	padding: 16px;
	min-height: 40px;

	&__title {
		background-color: #f6f7f8;
		border-radius: 4px;
		border: 1px solid #edeff1;
		color: #1c1c1c;
		display: block;
		height: 40px;
		font-size: 16px;
		outline: none;
		padding: 0 16px;
		margin: 8px 0 16px;

		&:hover,
		&:focus {
			background-color: #fff;
			border: 1px solid #da3338;
		}
	}
	&__image-input {
		display: none;
	}
}

.active {
	background-color: #da3338;
	color: #fff;
}
</style>
