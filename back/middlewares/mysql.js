const mysql = require("mysql2/promise")

// .env environment variabl calling
const password = process.env.DB_PASSWORD
const userName = process.env.DB_USERNAME
const database = process.env.DB_NAME

// Create connection
const pool = mysql.createPool({
	host: "localhost",
	user: userName,
	password: password,
	database: database,
	port: 3308,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
})

module.exports = pool
