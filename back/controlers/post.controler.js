const postService = require("../service/post.service")

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await postService.getAllPosts()
		return res
			.status(200)
			.json({ posts, message: "Posts Succesfully Retrieved" })
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}

exports.createPost = async (req, res) => {
	try {
		await postService.createPost(req.body)
		return res.status(201).json({
			message: "Post Succesfully Created"
		})
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}

exports.deletePost = async (req, res) => {
	try {
		await postService.deletePost(req.params.id)
		return res.status(200).json({
			message: "Post Successfully Deleted"
		})
	} catch (err) {
		return res.status(400).json({
			message: err.message
		})
	}
}
