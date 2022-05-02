const jwt = require("jsonwebtoken")
const sercretKey = process.env.SECRET_KEY

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, sercretKey)
		const userId = decodedToken.userId
		res.locals.userId = userId
		next()
	} catch {
		res.status(403).json({
			error: new Error("unauthorized request")
		})
	}
}
