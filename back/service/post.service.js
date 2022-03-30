const pool = require("../middlewares/mysql")

async function createSqlParams(post, id = null) {
	const keys = Object.entries(post)
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

async function makeDbQueries(sql, params = null) {
	try {
		const [queryResult] = await pool.execute(sql, params)
		return queryResult
	} catch (err) {
		throw Error(err)
	}
}

exports.getAllPosts = async function () {
	sql = "SELECT * FROM posts"
	return await makeDbQueries(sql)
}

exports.createPost = async function (post) {
	const params = await createSqlParams(post)
	const sql = "INSERT INTO posts SET " + params.sql
	await makeDbQueries(sql, params.arg)
}
