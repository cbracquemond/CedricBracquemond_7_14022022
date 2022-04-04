const pool = require("../middlewares/mysql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY

async function makeDbQueries(sql, params = null) {
	try {
		const [queryResult] = await pool.execute(sql, params)
		return queryResult
	} catch (err) {
		throw Error(err)
	}
}

function checkIfAccountExist(queryResult) {
	if (queryResult.length === 0 || queryResult.affectedRows === 0) {
		throw Error("This account doesn't exist")
	}
}

async function makeQueryParams(user, id = null) {
	if (user.password) user.password = await bcrypt.hash(user.password, 10)
	const keys = Object.entries(user)
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

exports.getAllUsers = async function () {
	const sql = "SELECT id, username, first_name, last_name, email FROM users"
	return await makeDbQueries(sql)
}

exports.getOneUser = async function (id) {
	const sql =
		"SELECT id, username, first_name, last_name, email FROM users WHERE id = ?"
	const queryResult = await makeDbQueries(sql, [id])
	checkIfAccountExist(queryResult)
	return queryResult
}

exports.deleteUser = async function (id) {
	const sql = "DELETE FROM users WHERE id = ?"
	const queryResult = await makeDbQueries(sql, [id])
	checkIfAccountExist(queryResult)
}

exports.createUser = async function (user) {
	const params = await makeQueryParams(user)
	const sql = "INSERT INTO users SET " + params.sql
	await makeDbQueries(sql, params.arg)
}

exports.updateUser = async function (user, id) {
	const params = await makeQueryParams(user, id)
	const sql = "UPDATE users SET " + params.sql + " WHERE id = " + params.id
	const queryResult = await makeDbQueries(sql, params.arg)
	checkIfAccountExist(queryResult)
}

exports.login = async function (user) {
	const sql = "SELECT * FROM users WHERE email = ?"
	const queryResult = (await makeDbQueries(sql, [user.email]))[0]
	checkIfAccountExist(queryResult)
	const passwordCheck = await bcrypt.compare(
		user.password,
		queryResult.password
	)
	if (!passwordCheck) return false
	return (token = jwt.sign({ userId: queryResult.id }, secretKey, {
		expiresIn: "24h"
	}))
}
