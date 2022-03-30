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
		return res.status(500).json({ status: 500, message: err.message })
	}
}

exports.createPost = async (req, res) => {
	try {
		await postService.createPosts(req.bodys)
		return res.status(201).json({
			status: 201,
			message: "Post Succesfully Created"
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: err.message })
	}
}
