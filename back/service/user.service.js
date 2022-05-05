const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretKey = process.env.SECRET_KEY
const utils = require("../utils/utils")
const fs = require("fs")

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

async function comparePassword(userEmail, userPassword) {
	await utils.checkIfExist(userEmail, "users")
	const sql = "SELECT * FROM users WHERE email = ?"
	const queryResult = (await utils.makeDbQueries(sql, [userEmail]))[0]
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

async function getAllImagesFromAccount(userId) {
	const imageUrlList = []

	//get the url for the profil picture:
	const sqlUser = "SELECT image_url FROM users WHERE id = ?"
	const queryResult = await utils.makeDbQueries(sqlUser, [userId])
	const userImageUrl = queryResult[0].image_url
	if (userImageUrl != null)
		imageUrlList.push(`images/${userImageUrl.split("/images/")[1]}`)

	//get all the urls from the user's posts:
	const sqlPosts = "SELECT image_url FROM posts WHERE user_id = ?"
	const postsImageUrls = await utils.makeDbQueries(sqlPosts, [userId])
	postsImageUrls.forEach((url) => {
		imageUrlList.push(`images/${url.image_url.split("/images/")[1]}`)
	})
	return imageUrlList
}

exports.getAllUsers = async function () {
	const sql =
		"SELECT id, username, first_name, last_name, email, image_url FROM users"
	return await utils.makeDbQueries(sql)
}

exports.getOneUser = async function (userId) {
	await utils.checkIfExist(userId.toString(), "users")
	const sql =
		"SELECT id, username, first_name, last_name, email, image_url, is_moderator FROM users WHERE id = ?"
	const queryResult = await utils.makeDbQueries(sql, [userId])
	return queryResult[0]
}

exports.deleteUser = async function (userId) {
	await utils.checkIfExist(userId, "users")
	const imageUrls = await getAllImagesFromAccount(userId)
	const sql = "DELETE FROM users WHERE id = ?"
	await utils.makeDbQueries(sql, [userId])
	imageUrls.forEach((url) => {
		fs.unlink(url, () => {})
	})
}

exports.createUser = async function (user) {
	const params = await makeQueryParams(user)
	const sql = "INSERT INTO users SET " + params.sql
	await utils.makeDbQueries(sql, params.arg)
}

exports.updateUser = async function (newProfile, userId) {
	await utils.checkIfExist(userId.toString(), "users")
	const params = await makeQueryParams(newProfile, userId)
	const sql = "UPDATE users SET " + params.sql + " WHERE id = " + params.id
	await utils.makeDbQueries(sql, params.arg)
}

exports.checkPassword = async function (userData) {
	const isPasswordCorrect =
		(await comparePassword(userData.email, userData.password)) == Error
			? false
			: true
	return isPasswordCorrect
}

exports.login = async function (userData) {
	const user = await comparePassword(userData.email, userData.password)
	return {
		token: jwt.sign({ userId: user.id }, secretKey, { expiresIn: "99999999h" })
	}
}
