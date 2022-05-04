const utils = require("../utils/utils")

function makeQueryParams(comment, id = null) {
	const keys = Object.entries(comment)
	const params = {
		sql: [],
		arg: []
	}
	keys.forEach((key) => {
		params.sql.push(" " + key[0] + " = ?")
		params.arg.push(key[1])
	})
	return params
}

exports.createComment = async function (comment, postId, userId) {
	const params = await makeQueryParams(comment)
	const sql =
		"INSERT INTO comments SET post_id = " +
		postId +
		", user_id = " +
		userId +
		", " +
		params.sql
	await utils.makeDbQueries(sql, params.arg)
}

exports.getAllCommentsFromPost = async function (postId) {
	await utils.checkIfExist(postId, "posts")
	const sql =
		"SELECT comments.*, users.username FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE post_id = ?"
	return await utils.makeDbQueries(sql, [postId])
}

exports.editComment = async function (content, commentId, userId) {
	await utils.checkIfExist(commentId, "comments")
	await utils.checkIfOwner(commentId, userId, "comments")
	const sql = "UPDATE comments SET content = '" + content + "' WHERE id = ?"
	await utils.makeDbQueries(sql, [commentId])
}

exports.deleteComment = async function (commentId, userId) {
	await utils.checkIfExist(commentId, "comments")
	await utils.checkIfOwner(commentId, userId, "comments")
	const sql = "DELETE FROM comments WHERE id = ?"
	await utils.makeDbQueries(sql, [commentId])
}
