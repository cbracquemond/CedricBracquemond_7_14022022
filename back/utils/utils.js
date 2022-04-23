const pool = require("../config/mysql")

exports.checkIfPostExist = async function (postId) {
	const sql = "SELECT * FROM posts WHERE id = " + postId
	const queryResult = await exports.makeDbQueries(sql)
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("This post doesn't exist")
	}
}

exports.checkIfAccountExist = async function (userId) {
	const sql = "SELECT * FROM users WHERE id = " + userId
	const queryResult = await exports.makeDbQueries(sql)
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("This user doesn't exist")
	}
}

exports.checkIfOwner = async function (postId, userId) {
	const sql = "SELECT user_id FROM posts WHERE id = ?"
	const owner = await exports.makeDbQueries(sql, [postId])
	if (owner[0].user_id != userId) throw Error("Can't touch this")
}

exports.makeDbQueries = async function (sql, params = null) {
	try {
		const [queryResult] = await pool.execute(sql, params)
		return queryResult
	} catch (err) {
		throw Error(err)
	}
}
