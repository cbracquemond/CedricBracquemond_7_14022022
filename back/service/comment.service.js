const utils = require("../utils/utils")

exports.createComment = async function (comment, postId, userId) {
	const sql = "INSERT INTO comments SET content = ?, post_id = ?, user_id = ?"
	await utils.makeDbQueries(sql, [comment, postId, userId])
}

exports.getAllCommmentsFromPost = async function (post_id) {
	const sql = "SELECT * from comments where post_id = ?"
	return await utils.makeDbQueries(sql, [post_id])
}

exports.editComment = async function (req, commentId, userId) {
	await utils.checkIfExist(commentId, "comments")
	await utils.checkIfOwner(commentId, userId)
	const sql = "UPDATE posts SET content = '" + req.content + "' WHERE id = ?"
	await utils.makeDbQueries(sql, [commentId])
}
