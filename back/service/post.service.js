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
		"SELECT posts.id, posts.post_time, posts.title, posts.image_url, posts.content, posts.likes, posts.dislikes, users.username FROM posts posts LEFT JOIN users users ON posts.user_id = users.id "
	return await utils.makeDbQueries(sql)
}

exports.getOnePost = async function (id) {
	await utils.checkIfExist(id, "posts")
	const sql =
		"SELECT posts.id, posts.post_time, posts.title, posts.content, posts.likes, posts.dislikes, users.username FROM posts posts LEFT JOIN users users ON posts.user_id = users.id WHERE posts.id = ?"
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
