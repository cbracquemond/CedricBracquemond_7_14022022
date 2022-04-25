const pool = require("../config/mysql")
const bcrypt = require("bcrypt")

exports.comparePassword = async function (userEmail, userPassword) {
	await exports.checkIfExist(userEmail, "users")
	const sql = "SELECT * FROM users WHERE email = ?"
	const queryResult = (await exports.makeDbQueries(sql, [userEmail]))[0]
	const passwordCheck = await bcrypt.compare(userPassword, queryResult.password)
	if (!passwordCheck) throw Error("Wrong password")
	user = {
		email: queryResult.email,
		firstName: queryResult.first_name,
		lastName: queryResult.last_name,
		id: queryResult.id,
		username: queryResult.username
	}
	return user
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

exports.makeDbQueries = async function (sql, params = null) {
	try {
		const [queryResult] = await pool.execute(sql, params)
		return queryResult
	} catch (err) {
		throw Error(err)
	}
}
