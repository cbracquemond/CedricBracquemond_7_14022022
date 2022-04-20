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

exports.getOnePost = async (req, res) => {
	try {
		const post = await postService.getOnePost(req.params.id)
		return res.status(200).json({
			post,
			message: "Post Succesfully Retrieved"
		})
	} catch (err) {
		return res.status(400).json({ message: err.message })
	}
}

exports.createPost = async (req, res) => {
	try {
		await postService.createPost(req.body, res.locals.userId)
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
		await postService.deletePost(req.params.id, res.locals.userId)
		return res.status(200).json({
			message: "Post Successfully Deleted"
		})
	} catch (err) {
		return res.status(400).json({
			message: err.message
		})
	}
}

exports.editPost = async (req, res) => {
	try {
		await postService.editPost(req.body, req.params.id, res.locals.userId)
		return res.status(200).json({
			message: "Post Successfully Edited"
		})
	} catch (err) {
		return res.status(400).json({
			message: err.message
		})
	}
}

// exports.likePost = async (req, res) => {
// 	try {
// 		await postService.likePost(req.body, req.params.id, res.locals.userId)
// 		return res.status(200).json({
// 			message: "Vote Successfully Submited"
// 		})
// 	} catch (err) {
// 		return res.status(400).json({
// 			message: err.message
// 		})
// 	}
// }
