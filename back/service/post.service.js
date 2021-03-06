const utils = require("../utils/utils")
const fs = require("fs")

async function checkIfLiked(postId, userId) {
	const sql = "SELECT * FROM post_liked WHERE post_id = ? and user_id = ?"
	const queryResult = await utils.makeDbQueries(sql, [postId, userId])
	return queryResult.length === 0 ? false : true
}

async function getImageUrl(id, table) {
	const sql = `SELECT image_url FROM ${table} WHERE id = ?`
	const queryResult = await utils.makeDbQueries(sql, [id])
	const imageUrl = queryResult[0].image_url
	if (imageUrl != null) return `images/${imageUrl.split("/images/")[1]}`
}

exports.getAllPosts = async function () {
	const sql =
		"SELECT posts.id, posts.post_time, posts.title, posts.image_url, posts.content, users.username, users.id AS user_id , COUNT(post_liked.post_id) AS likes FROM posts JOIN users ON posts.user_id = users.id LEFT JOIN post_liked ON posts.id = post_liked.post_id GROUP BY post_id ORDER BY posts.post_time DESC;"
	return await utils.makeDbQueries(sql)
}

exports.getOnePost = async function (id) {
	await utils.checkIfExist(id, "posts")
	const sql =
		"SELECT posts.id, posts.post_time, posts.title, posts.image_url, posts.content, users.username, users.id AS user_id, COUNT(post_liked.post_id) AS likes FROM posts JOIN users ON posts.user_id = users.id LEFT JOIN post_liked ON posts.id = post_liked.post_id WHERE posts.id = ?"
	const queryResult = await utils.makeDbQueries(sql, [id])
	return queryResult[0]
}

exports.createPost = async function (post, userId) {
	const sql =
		"INSERT INTO posts SET user_id = ?, title = ?, content = ?, image_url = ?"
	await utils.makeDbQueries(sql, [
		userId,
		post.title,
		post.content,
		post.image_url
	])
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
	const sql = "UPDATE posts SET content = ?, image_url = ? WHERE id = ?"
	await utils.makeDbQueries(sql, [post.content, post.image_url, postId])
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
	return alreadyLiked ? "-1" : "+1"
}
