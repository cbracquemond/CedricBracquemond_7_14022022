const commentService = require("../service/comment.service")

exports.createComment = async (req, res) => {
	try {
		await commentService.createComment(
			req.body.content,
			req.params.id,
			res.locals.userId
		)
		return res.status(201).json({
			message: "Comment Succesfully Created"
		})
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}

exports.getAllCommmentsFromPost = async (req, res) => {
	try {
		const comments = await commentService.getAllCommmentsFromPost(req.params.id)
		return res
			.status(200)
			.json({ comments, message: "Comments Succesfully Retrieved" })
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}
