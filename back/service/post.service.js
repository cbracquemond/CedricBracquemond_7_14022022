const utils = require("../utils/utils")

function makeQueryParams(post, id = null) {
	const keys = Object.entries(post)
	const params = {
		sql: [],
		arg: [],
		id: [`${id}`]
	}
	keys.forEach((key) => {
		params.sql.push(" " + key[0] + " = ?")
		params.arg.push(key[1])
	})
	return params
}

exports.getAllPosts = async function () {
	const sql =
		"SELECT p.id, p.post_time, p.title, p.content, p.likes, p.dislikes, u.username FROM posts p LEFT JOIN users u ON p.user_id = u.id "
	return await utils.makeDbQueries(sql)
}

exports.getOnePost = async function (id) {
	await utils.checkIfExist(id, "posts")
	const sql =
		"SELECT p.id, p.post_time, p.title, p.content, p.likes, p.dislikes, u.username FROM posts p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = ?"
	const queryResult = await utils.makeDbQueries(sql, [id])
	return queryResult
}

exports.createPost = async function (post, userId) {
	const params = await makeQueryParams(post)
	const sql = "INSERT INTO posts SET user_id = " + userId + "," + params.sql
	await utils.makeDbQueries(sql, params.arg)
}

exports.deletePost = async function (postId, userId) {
	await utils.checkIfExist(postId, "posts")
	await utils.checkIfOwner(postId, userId, "posts")
	const sql = "DELETE FROM posts WHERE id = ?"
	await utils.makeDbQueries(sql, [postId])
}

exports.editPost = async function (req, postId, userId) {
	await utils.checkIfExist(postId, "posts")
	await utils.checkIfOwner(postId, userId, "posts")
	const sql = "UPDATE posts SET content = '" + req.content + "' WHERE id = ?"
	await utils.makeDbQueries(sql, [postId])
}
