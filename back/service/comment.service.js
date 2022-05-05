const utils = require("../utils/utils")

exports.createComment = async function (comment, postId, userId) {
	const sql = "INSERT INTO comments SET content = ?, post_id = ?, user_id = ? "
	await utils.makeDbQueries(sql, [comment, postId, userId])
}

exports.getAllCommentsFromPost = async function (postId) {
	await utils.checkIfExist(postId, "posts")
	const sql =
		"SELECT comments.*, users.username FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE post_id = ?"
	return await utils.makeDbQueries(sql, [postId])
}

exports.editComment = async function (content, commentId, userId) {
	await utils.checkIfExist(commentId, "comments")
	const isModerator = await utils.checkIfModerator(userId)
	if (!isModerator) await utils.checkIfOwner(commentId, userId, "comments")
	const sql = "UPDATE comments SET content = '" + content + "' WHERE id = ?"
	await utils.makeDbQueries(sql, [commentId])
}

exports.deleteComment = async function (commentId, userId) {
	await utils.checkIfExist(commentId, "comments")
	const isModerator = await utils.checkIfModerator(userId)
	if (!isModerator) await utils.checkIfOwner(commentId, userId, "comments")
	const sql = "DELETE FROM comments WHERE id = ?"
	await utils.makeDbQueries(sql, [commentId])
}
