const pool = require("../config/mysql")

async function checkIfOwner(postId, userId) {
	const sql = "SELECT user_id FROM posts WHERE id = ?"
	const owner = await makeDbQueries(sql, [postId])
	if (owner[0].user_id != userId) throw Error("Can't touch this")
	// return owner[0].user_id != userId ? false : true
}

function checkIfPostExist(queryResult) {
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("This post doesn't exist")
	}
}

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

async function makeDbQueries(sql, params = null) {
	try {
		const [queryResult] = await pool.execute(sql, params)
		return queryResult
	} catch (err) {
		throw Error(err)
	}
}

exports.getAllPosts = async function () {
	const sql =
		"SELECT p.id, p.post_time, p.title, p.content, p.likes, p.dislikes, u.username FROM posts p LEFT JOIN users u ON p.user_id = u.id "
	return await makeDbQueries(sql)
}

exports.getOnePost = async function (id) {
	const sql =
		"SELECT p.id, p.post_time, p.title, p.content, p.likes, p.dislikes, u.username FROM posts p LEFT JOIN users u ON p.user_id = u.id WHERE p.id = ?"
	const queryResult = await makeDbQueries(sql, [id])
	checkIfPostExist(queryResult)
	return queryResult
}

exports.createPost = async function (post) {
	const params = await makeQueryParams(post)
	const sql = "INSERT INTO posts SET " + params.sql
	await makeDbQueries(sql, params.arg)
}

exports.deletePost = async function (postId, userId) {
	await checkIfOwner(postId, userId)
	const sql = "DELETE FROM posts WHERE id = ?"
	const queryResult = await makeDbQueries(sql, [postId])
	checkIfPostExist(queryResult)
}

exports.editPost = async function (req, postId, userId) {
	await checkIfOwner(postId, userId)
	const sql = "UPDATE posts SET content = '" + req.content + "' WHERE id = ?"
	const queryResult = await makeDbQueries(sql, [postId])
	checkIfPostExist(queryResult)
}
