const userService = require("../service/user.service")

exports.createUser = async (req, res) => {
	const defaultImage = process.env.DEFAULT_IMAGE
	const user = req.body.user ? JSON.parse(req.body.user) : {}
	user.imageUrl = req.file
		? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
		: `${req.protocol}://${req.get("host")}/images/${defaultImage}`
	try {
		await userService.createUser(user)
		return res.status(201).json({
			message: "User Succesfully Created"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.login = async (req, res) => {
	try {
		const queryResult = await userService.login(req.body)
		if (!queryResult.token) return res.status(401).json({ err })
		return res.status(200).json({
			token: queryResult.token,
			message: "Token Succesfully Delivered"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.getOneUser = async (req, res) => {
	try {
		const user = await userService.getOneUser(res.locals.userId)
		return res.status(200).json({
			user,
			message: "User Succesfully Retrieved"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.updateUser = async (req, res) => {
	const user = req.body.user ? JSON.parse(req.body.user) : {}
	if (req.file)
		`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
	try {
		await userService.updateUser(user, res.locals.userId)
		return res.status(200).json({
			status: 200,
			message: "User Succesfully Updated"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		await userService.deleteUser(res.locals.userId)
		return res.status(200).json({
			status: 200,
			message: "User Succesfully Deleted"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}

exports.checkPassword = async (req, res) => {
	try {
		const passwordChecked = await userService.checkPassword(
			req.body.password,
			res.locals.userId
		)
		return res.status(200).json({
			status: 200,
			check: passwordChecked,
			message: "Password correct"
		})
	} catch (err) {
		return res.status(400).json({ status: 400, message: err.message })
	}
}
