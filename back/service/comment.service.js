const pool = require("../config/mysql")

async function makeDbQueries(sql, params = null) {
	try {
		const [queryResult] = await pool.execute(sql, params)
		return queryResult
	} catch (err) {
		throw Error(err)
	}
}

exports.createComment = async function (comment, postId, userId) {
	const sql = "INSERT INTO comments SET content = ?, post_id = ?, user_id = ?"
	await makeDbQueries(sql, [comment, postId, userId])
}

exports.getAllCommmentsFromPost = async function (post_id) {
	const sql = "SELECT * from comments where post_id = ?"
	return await makeDbQueries(sql, [post_id])
}

exports.editPost = async function (req, postId, userId) {
	checkIfPostExist(postId)
	await checkIfOwner(postId, userId)
	const sql = "UPDATE posts SET content = '" + req.content + "' WHERE id = ?"
	const queryResult = await makeDbQueries(sql, [postId])
}
