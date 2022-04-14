const pool = require("../config/mysql")

function checkIfPostExist(queryResult) {
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("This post doesn't exist")
	}
}

async function makeQueryParams(post, id = null) {
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

exports.createPost = async function (post) {
	const params = await makeQueryParams(post)
	const sql = "INSERT INTO posts SET " + params.sql
	await makeDbQueries(sql, params.arg)
}

exports.deletePost = async function (id) {
	const sql = "DELETE FROM posts WHERE id = ?"
	const queryResult = await makeDbQueries(sql, [id])
	checkIfPostExist(queryResult)
}
