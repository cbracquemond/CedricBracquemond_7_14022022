const pool = require("../config/mysql")

exports.makeDbQueries = async function (sql, params = null) {
	try {
		const [queryResult] = await pool.execute(sql, params)
		return queryResult
	} catch (err) {
		throw Error(err)
	}
}

exports.checkIfExist = async function (reference, table) {
	const sql = reference.includes("@")
		? "SELECT * FROM " + table + " WHERE email = ?"
		: "SELECT * FROM " + table + " WHERE id = ?"
	const queryResult = await exports.makeDbQueries(sql, [reference])
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("The " + table.slice(0, -1) + " doesn't exist")
	}
}

exports.checkIfOwner = async function (dataToCheckId, userId, table) {
	if (table != "users") {
		const sql = "SELECT user_id FROM " + table + " WHERE id = ?"
		const owner = await exports.makeDbQueries(sql, [dataToCheckId])
		if (owner[0].user_id != userId) throw Error("Can't touch this")
		return
	}
	if (dataToCheckId != userId) throw Error("Can't touch this")
}

exports.checkIfModerator = async function (userId) {
	const sql = "SELECT is_moderator FROM users WHERE id = ?"
	const queryResult = await exports.makeDbQueries(sql, [userId])
	return queryResult[0].is_moderator === 1 ? true : false
}
