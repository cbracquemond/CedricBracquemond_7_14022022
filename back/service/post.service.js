const utils = require("../utils/utils")
const fs = require("fs")

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

async function checkIfLiked(postId, userId) {
	const sql = "SELECT * FROM post_liked WHERE post_id = ? and user_id = ?"
	const queryResult = await utils.makeDbQueries(sql, [postId, userId])
	return queryResult.length === 0 ? false : true
}

async function updateLikes(postId) {
	const sqlGetLikes = "SELECT * FROM post_liked WHERE post_id = ?"
	const likesQuantity = await utils.makeDbQueries(sqlGetLikes, [postId])
	const sqlUpdatelikes = "UPDATE posts SET likes = ? WHERE id = ?"
	await utils.makeDbQueries(sqlUpdatelikes, [likesQuantity.length, postId])
}

async function getImageUrl(id, table) {
	const sql = "SELECT image_url FROM " + table + " WHERE id = ?"
	const queryResult = await utils.makeDbQueries(sql, [id])
	const imageUrl = queryResult[0].image_url
	if (imageUrl != null) return `images/${imageUrl.split("/images/")[1]}`
}

exports.getAllPosts = async function () {
	const sql =
		"SELECT posts.id, posts.post_time, posts.title, posts.image_url, posts.content, posts.likes, users.username, users.id AS user_id FROM posts LEFT JOIN users ON posts.user_id = users.id ORDER BY posts.post_time DESC"
	return await utils.makeDbQueries(sql)
}

exports.getOnePost = async function (id) {
	await utils.checkIfExist(id, "posts")
	const sql =
		"SELECT posts.id, posts.post_time, posts.title, posts.image_url, posts.content, posts.likes, users.username, users.id AS user_id FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.id = ?"
	const queryResult = await utils.makeDbQueries(sql, [id])
	return queryResult[0]
}

exports.createPost = async function (post, userId) {
	const params = await makeQueryParams(post)
	const sql = "INSERT INTO posts SET user_id = " + userId + "," + params.sql
	await utils.makeDbQueries(sql, params.arg)
}

exports.deletePost = async function (postId, userId) {
	await utils.checkIfExist(postId, "posts")
	const isModerator = await utils.checkIfModerator(userId)
	if (!isModerator) await utils.checkIfOwner(postId, userId, "posts")
	const imageUrl = await getImageUrl(postId, "posts")
	const sql = "DELETE FROM posts WHERE id = ?"
	await utils.makeDbQueries(sql, [postId])
	if (imageUrl != null) {
		fs.unlink(imageUrl, () => {})
	}
}

exports.editPost = async function (post, postId, userId) {
	await utils.checkIfExist(postId, "posts")
	const isModerator = await utils.checkIfModerator(userId)
	if (!isModerator) await utils.checkIfOwner(postId, userId, "posts")
	const sql = "UPDATE posts SET content = '" + post.content + "' WHERE id = ?"
	await utils.makeDbQueries(sql, [postId])
}

exports.likePost = async function (postId, userId) {
	const userIdString = userId.toString()
	await utils.checkIfExist(postId, "posts")
	await utils.checkIfExist(userIdString, "users")
	const alreadyLiked = await checkIfLiked(postId, userId)
	const sql = alreadyLiked
		? "DELETE FROM post_liked WHERE post_id = ? and user_id = ?"
		: "INSERT INTO post_liked SET post_id = ?, user_id = ?"
	await utils.makeDbQueries(sql, [postId, userIdString])
	await updateLikes(postId)
}
