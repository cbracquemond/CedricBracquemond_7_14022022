const pool = require("../config/mysql")
const bcrypt = require("bcrypt")

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

exports.checkIfLiked = async function (postId, userId) {
	const sql = "SELECT * FROM post_liked WHERE post_id = ? and user_id = ?"
	const queryResult = await exports.makeDbQueries(sql, [postId, userId])
	return queryResult.length === 0 ? false : true
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

exports.getImageUrl = async function (id, table) {
	const sql = "SELECT image_url FROM " + table + " WHERE id = ?"
	const queryResult = await exports.makeDbQueries(sql, [id])
	const imageUrl = queryResult[0].image_url
	if (imageUrl != null) return `images/${imageUrl.split("/images/")[1]}`
}

exports.getAllImagesFromAccount = async function (userId) {
	const imageUrlList = []
	//get the url for the profil picture:
	const sqlUser = "SELECT image_url FROM users WHERE id = ?"
	const queryResult = await exports.makeDbQueries(sqlUser, [userId])
	const userImageUrl = queryResult[0].image_url
	if (userImageUrl != null)
		imageUrlList.push(`images/${userImageUrl.split("/images/")[1]}`)
	//get all the urls from the user's posts:
	const sqlPosts = "SELECT image_url FROM posts WHERE user_id = ?"
	const postsImageUrls = await exports.makeDbQueries(sqlPosts, [userId])
	postsImageUrls.forEach((url) => {
		imageUrlList.push(`images/${url.image_url.split("/images/")[1]}`)
	})
	return imageUrlList
}

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
