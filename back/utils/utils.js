const pool = require("../config/mysql")

exports.checkIfPostExist = async function (postId) {
	const sql = "SELECT * FROM posts WHERE id = " + postId
	const queryResult = await exports.makeDbQueries(sql)
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("This post doesn't exist")
	}
}

exports.checkIfExist = async function (id, table) {
	const sql = "SELECT * FROM " + table + " WHERE id = " + id
	const queryResult = await exports.makeDbQueries(sql)
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("This " + table.slice(0, -1) + " doesn't exist")
	}
}

exports.checkIfOwner = async function (ownerId, userId, table) {
	table === "users"
		? (sql = "SELECT id FROM " + table + " WHERE id = ?")
		: (sql = "SELECT user_id FROM " + table + " WHERE id = ?")
	const owner = await exports.makeDbQueries(sql, [ownerId])
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
