const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY
const utils = require("../utils/utils")
const fs = require("fs")
const { url } = require("inspector")

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
	const sql =
		"SELECT id, username, first_name, last_name, email, image_url FROM users"
	return await utils.makeDbQueries(sql)
}

exports.getOneUser = async function (id) {
	await utils.checkIfExist(id, "users")
	const sql =
		"SELECT id, username, first_name, last_name, email, image_url FROM users WHERE id = ?"
	const queryResult = await utils.makeDbQueries(sql, [id])
	return queryResult
}

exports.deleteUser = async function (accountId, userId) {
	await utils.checkIfExist(accountId, "users")
	await utils.checkIfOwner(accountId, userId, "users")
	const imageUrls = await utils.getAllImagesFromAccount(userId)
	const sql = "DELETE FROM users WHERE id = ?"
	await utils.makeDbQueries(sql, [accountId])
	imageUrls.forEach((url) => {
		fs.unlink(url, () => {})
	})
}

exports.createUser = async function (user) {
	const params = await makeQueryParams(user)
	const sql = "INSERT INTO users SET " + params.sql
	return await utils.makeDbQueries(sql, params.arg)
}

exports.updateUser = async function (newProfile, accountId, userId) {
	await utils.checkIfExist(accountId, "users")
	await utils.checkIfOwner(accountId, userId, "users")
	const params = await makeQueryParams(newProfile, accountId)
	const sql = "UPDATE users SET " + params.sql + " WHERE id = " + params.id
	await utils.makeDbQueries(sql, params.arg)
}

exports.checkPassword = async function (userData) {
	const isPasswordCorrect =
		(await utils.comparePassword(userData.email, userData.password)) == Error
			? false
			: true
	return isPasswordCorrect
}

exports.login = async function (userData) {
	const user = await utils.comparePassword(userData.email, userData.password)
	return {
		user,
		token: jwt.sign({ userId: user.id }, secretKey, { expiresIn: "24h" })
	}
}
