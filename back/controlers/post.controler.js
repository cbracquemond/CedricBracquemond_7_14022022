const postService = require("../service/post.service")

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await postService.getAllPosts()
		return res.status(200).json({
			status: 200,
			data: posts,
			message: "Posts Succesfully Retrieved"
		})
	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: err.message
		})
	}
}

exports.createPost = async (req, res) => {
	try {
		await postService.createPost(req.body)
		return res.status(201).json({
			status: 201,
			message: "Post Succesfully Created"
		})
	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: err.message
		})
	}
}

exports.deletePost = async (req, res) => {
	try {
		await postService.deletePost(req.params.id)
		return res.status(200).json({
			status: 200,
			message: "Post Successfully Deleted"
		})
	} catch (err) {
		return res.status(400).json({
			status: 400,
			message: err.message
		})
	}
}
