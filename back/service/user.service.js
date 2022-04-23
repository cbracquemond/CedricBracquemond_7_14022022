const pool = require("../config/mysql")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY
const utils = require("../utils/utils")

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
	return await utils.makeDbQueries(sql)
}

exports.getOneUser = async function (id) {
	await utils.checkIfAccountExist(id)
	const sql =
		"SELECT id, username, first_name, last_name, email FROM users WHERE id = ?"
	const queryResult = await utils.makeDbQueries(sql, [id])
	return queryResult
}

exports.deleteUser = async function (id) {
	await utils.checkIfAccountExist(id)
	const sql = "DELETE FROM users WHERE id = ?"
	await utils.makeDbQueries(sql, [id])
}

exports.createUser = async function (user) {
	const params = await makeQueryParams(user)
	const sql = "INSERT INTO users SET " + params.sql
	return await utils.makeDbQueries(sql, params.arg)
}

exports.updateUser = async function (user, id) {
	await utils.checkIfAccountExist(id)
	const params = await makeQueryParams(user, id)
	const sql = "UPDATE users SET " + params.sql + " WHERE id = " + params.id
	await utils.makeDbQueries(sql, params.arg)
}

exports.login = async function (user) {
	await utils.checkIfAccountExist(user.id)
	const sql = "SELECT * FROM users WHERE email = ?"
	const queryResult = (await utils.makeDbQueries(sql, [user.email]))[0]
	const passwordCheck = await bcrypt.compare(
		user.password,
		queryResult.password
	)
	if (!passwordCheck) throw Error("Wrong password")
	return {
		user: {
			email: queryResult.email,
			firstName: queryResult.first_name,
			lastName: queryResult.last_name,
			id: queryResult.id,
			username: queryResult.username
		},
		token: jwt.sign({ userId: queryResult.id }, secretKey, { expiresIn: "24h" })
	}
}
