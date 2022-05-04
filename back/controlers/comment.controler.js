const commentService = require("../service/comment.service")

exports.createComment = async (req, res) => {
	const comment = req.body.comment ? JSON.parse(req.body.comment) : {}
	comment.image_url = req.file
		? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		: null
	try {
		await commentService.createComment(
			comment,
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

exports.getAllCommentsFromPost = async (req, res) => {
	try {
		const comments = await commentService.getAllCommentsFromPost(req.params.id)
		return res
			.status(200)
			.json({ comments, message: "Comments Succesfully Retrieved" })
	} catch (err) {
		return res.status(400).json({
			message: err.message
		})
	}
}

exports.editComment = async (req, res) => {
	try {
		const comments = await commentService.editComment(
			req.body.content,
			req.params.id,
			res.locals.userId
		)
		return res
			.status(200)
			.json({ comments, message: "Comments Succesfully edited" })
	} catch (err) {
		return res.status(400).json({
			message: err.message
		})
	}
}

exports.deleteComment = async (req, res) => {
	try {
		const comments = await commentService.deleteComment(
			req.params.id,
			res.locals.userId
		)
		return res
			.status(200)
			.json({ comments, message: "Comments Succesfully deleted" })
	} catch (err) {
		return res.status(400).json({
			message: err.message
		})
	}
}
